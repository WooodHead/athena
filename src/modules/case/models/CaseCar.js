var mongoose = require('../../../app/mongoose');
var DomainBuilder = require('../../../framework/model/DomainBuilder');

var schema = DomainBuilder
    .i('CaseCar')
    .withBasis()
    .withLifeFlag()
    .withCreatedOn()
    .withProperties({
        case: {type: String, ref: 'Case', require: true},            //关联caseId
        origin: {type: String, require: true},         //出发地
        destination: {type: String, require: true},    //目的地
        driverName: {type: String, require: true},     //司机姓名
        driverPhone: {type: String, require: true},    //司机手机
        carLicensePlate: {type: String, require: true},//车牌照
        carModel: {type: String, require: true},       //车型
        carType: {type: String},                        //用车类型
        mileage: {type: Number},                        //里程数
        estimatedCost: {type: Number, require: true},   //预估费用
        time: {type: String, require: true}               //用车时间
    })
    .build();

module.exports.schema = schema;
module.exports.model = schema.model(true);