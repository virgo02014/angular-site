/*
 * http://www.tuicool.com/articles/zqMNvq
 * https://github.com/kissygalleryteam/uploader 异步文件上传组件 uploader
 */

// 入口核心模块（一般是index.js）继承RichBase
KISSY.add(function (S,RichBase) {
    var Uploader = RichBase.extend([],{
        constructor:function (target, config) {

        }
    }, {ATTRS:{
        target:{
            value:EMPTY,
            getter:function (v) {
                return $(v);
            }
        }
    }}, 'Uploader');
    return Uploader;
}, {requires:['rich-base']});

// 定义类的构造函数
var Uploader = RichBase.extend({
        /**
         *构造函数
        */
        constructor:function (target, config) {
            var self = this;
            //调用父类的构造函数，必须存在！
            Uploader.superclass.constructor.apply(self, config);

            self.set('target', target);
            self._init();
        },
        _init:function(){

        }
    }, {ATTRS:{ }}, 'Uploader');

// 用户调用组件
var uploader = new Uploader('#J_UploaderBtn',{
    action:"upload.php"
});
S.log(uploader.get('target'));

// 定义类的属性和配置参数
var Uploader = RichBase.extend({
        constructor:function () {

        }
    }, {ATTRS:{
        target:{
            value:EMPTY,
            getter:function (v) {
                return $(v);
            }
        },
        multiple:{
            value:false,
            setter:function (v) {
                var self = this, button = self.get('button');
                if (!S.isEmptyObject(button) && S.isBoolean(v)) {
                    button.set('multiple', v);
                }
                return v;
            }
        },
        autoUpload:{value:true}
    }}, 'Uploader');

// 定义组件插件
KISSY.add('gallery/uploader/1.4/plugins/imageZoom/imageZoom',function(S, Node, Base) {
    var EMPTY = '';
    var $ = Node.all;

    function ImageZoom(config) {
        var self = this;
        //调用父类构造函数
        ImageZoom.superclass.constructor.call(self, config);
    }
    S.extend(ImageZoom, Base, /** @lends ImageZoom.prototype*/{
        /**
         * 插件初始化
         */
        pluginInitializer : function(uploader) {
            if(!uploader) return false;

        },
        /**
         * 析构方法，可以不存在
         */
        pluginDestructor:function(){

        }
    }, {ATTRS : /** @lends ImageZoom*/{
        /**
         * 插件名称
         * @type String
         * @default urlsInput
         */
        pluginId:{
            value:'imageZoom'
        }
    }});
    return ImageZoom;
}, {requires : ['node','base']});

// 插件注入到宿主类
S.use('gallery/uploader/1.4/index', function (S, Uploader) {
        S.use('gallery/uploader/1.4/plugins/imageZoom/imageZoom',function(S,ImageZoom){
            var uploader = new Uploader('#J_UploaderBtn');
            //初始化插件
            uploader.plug(new ImageZoom()) ;
        });
    })

S.use('gallery/uploader/1.4/index', function (S, Uploader) {
        S.use('gallery/uploader/1.4/plugins/imageZoom/imageZoom',function(S,ImageZoom){
            var uploader = new Uploader('#J_UploaderBtn',{
                plugins:[new ImageZoom()]
            });
        });
    })


// 获取/销毁插件
var uploader = new Uploader('#J_UploaderBtn',{
        plugins:[new ImageZoom()]
    });

    var imageZoom = uploader.getPlugin('imageZoom');
