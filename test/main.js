function FSM(instance) {
    this.instanceMap = {};
}
FSM.prototype.registry= function(instance){
    this.instanceMap[instance.name] = instance;
}
/**
 * workflow factory
 * @param instance data
 * @returns new workflow instance
 */
FSM.prototype.create = function(data){
    var workflow = new Workflow(data);
    workflow.compose(data);
    return workflow;
}
function Workflow(data) {
    this.name = data.name;
    this.actionsMap = {};
    this.statMap = {};
    this.curr = null;
    this.previous = null;
}
Workflow.prototype.compose = function(data){
    var me = this;
    me.data = data;
    me.curr = data.initial;
    var actions = data.actions;
    for(var i=0, len=actions.length; i<len; i++){
        var currAction = actions[i];
        var action = me.actionsMap[currAction.name];
        //build action
        if(!me.actionsMap[currAction.name]){
            action = me.actionsMap[currAction.name] = {actionList: [], froms: {}, tos:{}};
        }
        action.actionList.push(currAction);
        if(Array.isArray(currAction.from)){
            currAction.from.forEach(function(from){
                if(action.froms.hasOwnProperty(from)){
                    throw new Error('workflow action property [from] has already exist');
                }else{
                    action.froms[from] = from
                }
            })
        }else{
            action.froms[currAction.from] = currAction.from
        }
        action.tos[currAction.to] = currAction.to;

        //build state
        var fromStat = me.statMap[currAction.from];
        if(!fromStat){
            fromStat = me.statMap[currAction.from] = {actions: {}}
        }
        fromStat.actions[currAction.name] = currAction;

        var toStat = me.statMap[currAction.to];
        if(!toStat){
            toStat = me.statMap[currAction.to] = {actions: {}}
        }
        toStat.actions[currAction.name] = currAction;
    }
    return this;
}
Workflow.prototype.is = function (s){
    this.current() === s;
}
Workflow.prototype.current = function (){
    return this.curr;
}
Workflow.prototype.can = function(e){
    if(this.actionsMap[e].froms[this.current()]){
        return true;
    }
    return false;
}
Workflow.prototype.cannot = function(e){
    return !this.can(e);
}
Workflow.prototype.init = function (){
    var me = this;
    this.actions.forEach(function(action){
        me[action.name] = function(){
            if(me.can(action.name)){
                this.status = action.to;
            }else{
                throw new Error('the current Status can,t execute the action');
            }
        }
    })
}
module.exports.FSM = FSM;
module.exports.Workflow = Workflow;