var mongoose = require('../../../app/mongoose');
var DomainBuilder = require('../../../framework/model/DomainBuilder');
var WechatMediumUserType = require('../../../common/models/TypeRegistry').item('WechatMediumUserType');

var schema = DomainBuilder
    .i('WechatMediumUser')
    .withBasis()
    .withLifeFlag()
    .withCreatedOn()
    .withProperties({
        host:           {type: String, ref: 'WechatMedium', required: true}
        , type:         {type: String, enum: WechatMediumUserType.valueList(), default: WechatMediumUserType.WechatSiteUser.value(), required: true}

        , openid:       {type: String} //服务号粉丝openid 或者 助手号联系人buid (bot's contact id)
        , nickname:     {type: String, required: true}
        , headimgurl:   {type: String}
        , sex:          {type: Number, default: 0} //0: unknown, 1: male, 2: female

        , country: {type: String}
        , province: {type: String}
        , city: {type: String}
        , district: {type: String}

        //微信公众号与助手号差异部分
        , language:     {type: String, default: 'zh_CN'} //公众号
        , remark: {type: String} //公众号
    })
    .build();

/**
 服务号粉丝
 id
 openid
 nickname
 headimgurl
 sex

 *language

 country
 province
 city

 *remark


 助手号联系人
 id
 openid / bcid
 nickname
 headimgurl
 sex

 country
 province
 city
 district

 */
module.exports.schema = schema;
module.exports.model = schema.model(true);