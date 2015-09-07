var WechatEmitter = require('../../src/framework/WechatEmitter');
var assert = require('assert');

describe('custom messages', function() {
    it('message', function (done) {
        var emitter = new WechatEmitter();
        var context = {
            weixin: {MsgType: 'event', Event: 'subscribe'},
            user: {id: 'test', openid: 'asfsafadsf'}
        };
        emitter.message(function (event, context) {
            assert.equal(event, 'message');
            assert.equal(context.weixin.Event, 'subscribe');
            console.info(event + '1');
            console.info(context);
        });
        emitter.message(function (event, context) {
            assert.equal(event, 'message');
            assert.equal(context.weixin.Event, 'subscribe');
            console.info(event + '2');
            console.info(context);
        });
        emitter.emit(context);
        done();
    })

    it('unknown', function(done){
        var emitter = new WechatEmitter();
        var context = {
            weixin: { MsgType: 'event', Event: 'enter' },
            user: { id: 'test', openid: 'asfsafadsf' }
        };
        emitter.message(function(event, context){
            assert.equal(event, 'message');
            assert.equal(context.weixin.Event, 'enter');
            console.info(event);
            console.info(context);
        });
        emitter.unknown(function(event, context){
            assert.equal(event, 'unknown');
            assert.equal(context.weixin.Event, 'enter');
            console.info(event);
            console.info(context);
        });
        emitter.emit(context);
        done();
    })
})

describe('event messages', function(){
    it('subscribe', function(done){
        var emitter = new WechatEmitter();
        var context = {
            weixin: { MsgType: 'event', Event: 'subscribe' },
            user: { id: 'test', openid: 'asfsafadsf' }
        };
        emitter.message(function(event, context){
            assert.equal(event, 'message');
            assert.equal(context.weixin.Event, 'subscribe');
            console.info(event);
            console.info(context);
        });
        emitter.subscribe(function(event, context){
            assert.equal(event, 'subscribe');
            assert.equal(context.weixin.Event, 'subscribe');
            console.info(event);
            console.info(context);
        });
        emitter.emit(context);
        done();
    })

    it('unsubscribe', function(done){
        var emitter = new WechatEmitter();
        var context = {
            weixin: { MsgType: 'event', Event: 'unsubscribe' },
            user: { id: 'test', openid: 'asfsafadsf' }
        };
        emitter.message(function(event, context){
            assert.equal(event, 'message');
            assert.equal(context.weixin.Event, 'unsubscribe');
            console.info(event);
            console.info(context);
        });
        emitter.unsubscribe(function(event, context){
            assert.equal(event, 'unsubscribe');
            assert.equal(context.weixin.Event, 'unsubscribe');
            console.info(event);
            console.info(context);
        });
        emitter.emit(context);
        done();
    })

    it('LOCATION', function(done){
        var emitter = new WechatEmitter();
        var context = {
            weixin: { MsgType: 'event', Event: 'LOCATION' },
            user: { id: 'test', openid: 'asfsafadsf' }
        };
        emitter.message(function(event, context){
            assert.equal(event, 'message');
            assert.equal(context.weixin.Event, 'LOCATION');
            console.info(event);
            console.info(context);
        });
        emitter.LOCATION(function(event, context){
            assert.equal(event, 'LOCATION');
            assert.equal(context.weixin.Event, 'LOCATION');
            console.info(event);
            console.info(context);
        });
        emitter.emit(context);
        done();
    })

    it('SCAN', function(done){
        var emitter = new WechatEmitter();
        var context = {
            weixin: { MsgType: 'event', Event: 'SCAN' },
            user: { id: 'test', openid: 'asfsafadsf' }
        };
        emitter.message(function(event, context){
            assert.equal(event, 'message');
            assert.equal(context.weixin.Event, 'SCAN');
            console.info(event);
            console.info(context);
        });
        emitter.SCAN(function(event, context){
            assert.equal(event, 'SCAN');
            assert.equal(context.weixin.Event, 'SCAN');
            console.info(event);
            console.info(context);
        });
        emitter.emit(context);
        done();
    })

    it('CLICK', function(done){
        var emitter = new WechatEmitter();
        var context = {
            weixin: { MsgType: 'event', Event: 'CLICK' },
            user: { id: 'test', openid: 'asfsafadsf' }
        };
        emitter.message(function(event, context){
            assert.equal(event, 'message');
            assert.equal(context.weixin.Event, 'CLICK');
            console.info(event);
            console.info(context);
        });
        emitter.CLICK(function(event, context){
            assert.equal(event, 'CLICK');
            assert.equal(context.weixin.Event, 'CLICK');
            console.info(event);
            console.info(context);
        });
        emitter.emit(context);
        done();
    })

    it('VIEW', function(done){
        var emitter = new WechatEmitter();
        var context = {
            weixin: { MsgType: 'event', Event: 'VIEW' },
            user: { id: 'test', openid: 'asfsafadsf' }
        };
        emitter.message(function(event, context){
            assert.equal(event, 'message');
            assert.equal(context.weixin.Event, 'VIEW');
            console.info(event);
            console.info(context);
        });
        emitter.VIEW(function(event, context){
            assert.equal(event, 'VIEW');
            assert.equal(context.weixin.Event, 'VIEW');
            console.info(event);
            console.info(context);
        });
        emitter.emit(context);
        done();
    })

})

describe('messages', function(){
    it('text', function(done){
        var emitter = new WechatEmitter();
        var context = {
            weixin: { MsgType: 'text' },
            user: { id: 'test', openid: 'asfsafadsf' }
        };
        emitter.message(function(event, context){
            assert.equal(event, 'message');
            assert.equal(context.weixin.MsgType, 'text');
            console.info(event);
            console.info(context);
        });
        emitter.text(function(event, context){
            assert.equal(event, 'text');
            assert.equal(context.weixin.MsgType, 'text');
            console.info(event);
            console.info(context);
        });
        emitter.emit(context);
        done();
    })

    it('image', function(done){
        var emitter = new WechatEmitter();
        var context = {
            weixin: { MsgType: 'image' },
            user: { id: 'test', openid: 'asfsafadsf' }
        };
        emitter.message(function(event, context){
            assert.equal(event, 'message');
            assert.equal(context.weixin.MsgType, 'image');
            console.info(event);
            console.info(context);
        });
        emitter.image(function(event, context){
            assert.equal(event, 'image');
            assert.equal(context.weixin.MsgType, 'image');
            console.info(event);
            console.info(context);
        });
        emitter.emit(context);
        done();
    })

    it('voice', function(done){
        var emitter = new WechatEmitter();
        var context = {
            weixin: { MsgType: 'voice' },
            user: { id: 'test', openid: 'asfsafadsf' }
        };
        emitter.message(function(event, context){
            assert.equal(event, 'message');
            assert.equal(context.weixin.MsgType, 'voice');
            console.info(event);
            console.info(context);
        });
        emitter.voice(function(event, context){
            assert.equal(event, 'voice');
            assert.equal(context.weixin.MsgType, 'voice');
            console.info(event);
            console.info(context);
        });
        emitter.emit(context);
        done();
    })

    it('video', function(done){
        var emitter = new WechatEmitter();
        var context = {
            weixin: { MsgType: 'video' },
            user: { id: 'test', openid: 'asfsafadsf' }
        };
        emitter.message(function(event, context){
            assert.equal(event, 'message');
            assert.equal(context.weixin.MsgType, 'video');
            console.info(event);
            console.info(context);
        });
        emitter.video(function(event, context){
            assert.equal(event, 'video');
            assert.equal(context.weixin.MsgType, 'video');
            console.info(event);
            console.info(context);
        });
        emitter.emit(context);
        done();
    })

    it('shortvideo', function(done){
        var emitter = new WechatEmitter();
        var context = {
            weixin: { MsgType: 'shortvideo' },
            user: { id: 'test', openid: 'asfsafadsf' }
        };
        emitter.message(function(event, context){
            assert.equal(event, 'message');
            assert.equal(context.weixin.MsgType, 'shortvideo');
            console.info(event);
            console.info(context);
        });
        emitter.shortvideo(function(event, context){
            assert.equal(event, 'shortvideo');
            assert.equal(context.weixin.MsgType, 'shortvideo');
            console.info(event);
            console.info(context);
        });
        emitter.emit(context);
        done();
    })

    it('location', function(done){
        var emitter = new WechatEmitter();
        var context = {
            weixin: { MsgType: 'location' },
            user: { id: 'test', openid: 'asfsafadsf' }
        };
        emitter.message(function(event, context){
            assert.equal(event, 'message');
            assert.equal(context.weixin.MsgType, 'location');
            console.info(event);
            console.info(context);
        });
        emitter.location(function(event, context){
            assert.equal(event, 'location');
            assert.equal(context.weixin.MsgType, 'location');
            console.info(event);
            console.info(context);
        });
        emitter.emit(context);
        done();
    })

    it('link', function(done){
        var emitter = new WechatEmitter();
        var context = {
            weixin: { MsgType: 'link' },
            user: { id: 'test', openid: 'asfsafadsf' }
        };
        emitter.message(function(event, context){
            assert.equal(event, 'message');
            assert.equal(context.weixin.MsgType, 'link');
            console.info(event);
            console.info(context);
        });
        emitter.link(function(event, context){
            assert.equal(event, 'link');
            assert.equal(context.weixin.MsgType, 'link');
            console.info(event);
            console.info(context);
        });
        emitter.emit(context);
        done();
    })
})