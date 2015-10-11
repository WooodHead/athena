var Promise = require('bluebird');
var co = require('co');
var logger = require('../../../app/logging').logger;
var WechatAuthenticator = require('../../user/services/WechatAuthenticator');
var authenticator = new WechatAuthenticator({});
var RoleEmitter = require('../common/RoleEmitter');
var roleEmitter = new RoleEmitter();
require('../../cs/handlers/CsHandler')(roleEmitter);
require('../../admin/handlers/AdminHandler')(roleEmitter);
require('../../customer/handlers/CustomerHandler')(roleEmitter);

var CommandRegistry = require('../../../framework/wechat/command-registry');
var registry = new CommandRegistry();
registry.addCommand('删除当前用户', require('./commands/deleteUserCommand'));
registry.addCommand('成为客户', require('./commands/setRoleToCustomerCommand'));
registry.addCommand('成为客服', require('./commands/setRoleToCsCommand'));
registry.addCommand('成为管理员', require('./commands/setRoleToAdminCommand'));

module.exports = function(emitter){
    emitter.message(function(event, context){
        var msg = context.weixin;
        authenticator.ensureSignin(context.weixin, context, function(err, user){
            if(err){
                logger.error('Fail to sigin with user: ' + err);
            }
            else{
                context.user = user;
            }

            var handler = registry.extractCommandFromMessage(msg, user);
            if(handler){
                handler();
            }
            else{
                roleEmitter.emit(context);
            }
        });
    });
};