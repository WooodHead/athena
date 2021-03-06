var mongoose = require('../../../app/mongoose');
var DomainBuilder = require('../../../framework/model/DomainBuilder');
var CaseEnum = require('../../common/models/TypeRegistry').item('Case');
var CaseStatusEnum = require('../../common/models/TypeRegistry').item('CaseStatus');

var schema = DomainBuilder
    .i('Case')
    .withBasis()
    .withLifeFlag()
    .withCreatedOn()
    .withProperties({
        type: {type: String, enum: CaseEnum.valueList(), default: CaseEnum.Car.value(), require: true},
        desc: {type: String},
        status: {type: String, enum: CaseStatusEnum.valueList(), default: CaseStatusEnum.Draft.value()},
        //commissionerId: {type: String, ref: 'Party', require: true},
        //responsibleId: {type: String, ref: 'Party', require: true},
        commissionerId: {type: String, ref: 'UserBiz', require: true},
        commissionerPhone: {type: String, require: true},
        responsibleId: {type: String, ref: 'Organization', require: true},
        conversationId: {type: String, ref: 'Conversation', require: true},
        paymentMethod: {type: String},
        payTime: {type: Date},
        cost: {type: String},
        caseNo: {type: String},
        //useTime: {type: Date, default: new Date(), require: true},
        //place: {type: String, require: true},
        //evaluation: {type: String},
        //subcase: {type: String, require: true}
    })
    .build();
module.exports.schema = schema;
module.exports.model = schema.model(true);