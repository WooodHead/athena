var Promise = require('bluebird');
var cbUtil = require('../../../../framework/callback');

var idToObjKey = function(id){
    return 'plf:usr:o:id:' + id;
};

var Kv = function(context){
    this.context = context;
};

Kv.prototype.loadById = function(id, callback){
    var logger = this.context.logger;
    var redis = this.context.redis.main;
    var key = idToObjKey(id);
    redis.hgetall(key, function(err, result){
        cbUtil.logCallback(
            err,
            'Fail to get platform user by id ' + id + ': ' + err,
            'Succeed to get platform user by id ' + id);

        if(result){
            if(json.posts && typeof json.posts == 'string'){
                var posts = json.posts;
                try{
                    json.posts = JSON.parse(json.posts);
                }
                catch(e){
                    logger.error('Fail to parse posts: ' + posts);
                    json.posts = [];
                }
            }
            result.crtOn = result.crtOn && result.crtOn !== 'null' ? new Date(result.crtOn) : null;
        }
        cbUtil.handleSingleValue(callback, err, result);
    });
};

Kv.prototype.saveById = function(json, callback){
    var redis = this.context.redis.main;
    var id = json.id;
    var key = idToObjKey(id);

    if(json.posts && Array.isArray(json.posts)){
        json.posts = JSON.stringify(json.posts);
    }

    redis.hmset(key, json, function(err, result){
        cbUtil.logCallback(
            err,
            'Fail to save platform user by id ' + id + ': ' + err,
            'Succeed to save platform user by id ' + id);
        cbUtil.handleOk(callback, err, result, json);
    });
};

Kv = Promise.promisifyAll(Kv);

module.exports = Kv;