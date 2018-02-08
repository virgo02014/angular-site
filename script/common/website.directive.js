/*
 * document: https://github.com/nixzhu/dev-blog/blob/master/2014-05-03-creating-custom-angularjs-directives-part-1-the-fundamentals.md
 * video: http://weblogs.asp.net/dwahlin/angularjs-in-60-ish-minutes-the-ebook
 * directive:
 *     restrict: 决定一个指令可如何被使用(例如元素，属性，CSS class，注释)
 *     scope: 用于创建一个子scope或孤立的scope
 *     template: 定义指令输出的内容(可以包含HTML，数据绑定表达式，甚至是其他指令)
 *     templateUrl: 提供指令所用模版的路径。如果模板被定义在<script>内，那它可以包含一个DOM元素的id
 *     controller: 用于定义 和指令模板关联的 控制器
 *     link: 用于DOM操作任务的函数 scope、与指令关联的元素、以及目标元素的属性（attribute）
 *
 * compile link区别
 * compile 对指令的模板进行转换
 * link 在模型和视图之间建立关联，包括在元素上注册事件监听
 * scope在链接阶段才会被绑定到元素上，因此compile阶段操作scope会报错
 * 对于同一个指令的多个实例，compile只会执行一次，而link对于指令的每个实例都会执行一次
 * 一般情况 只编写link函数就够了
 * 如果编写自定义的compil函数，自定义的link函数无效，因为compile函数应该返回一个link函数供后续处理
 */
angular.module('website.directive', [])
    // .directive('myDirective', function(){
    //     return {
    //         restrict: 'A',
    //         template: '<a href="#"> Click me </a>'
    //     };
    // })
    .directive('myDirective', function() {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                myUrl: '=someAttr',
                myLinkText: '@'
            },
            template: '\
                  <div>\
                    <label>My Url Field:</label>\
                    <input type="text" ng-model="myUrl" />\
                    <a href="{{myUrl}}">{{myLinkText}}</a>\
                  </div>\
                '
        };
    })
    .directive('compiled', function(){
        return {
            restrict: 'E',
            template: '<p>Hello {{number}}!</p>',
            controller: function($scope, $element) {
                $scope.number = $scope.number + "22222 ";
            },
            link: function(scope, el, attr) {
                scope.number = scope.number + "33333 ";
            },
            // controller先运行，compile后运行，link不运行(link就是compile中的postLink)
            compile: function(element, attributes) {
                return {
                    pre: function preLink(scope, element, attributes) {
                        scope.number = scope.number + "44444 ";
                    },
                    post: function postLink(scope, element, attributes) {
                        scope.number = scope.number + "55555 ";
                    }
                };
            }
        };
    })
    .directive('fbInitDropdown', ['$parse', '$timeout', function ($parse, $timeout) {
        return function (scope, element, attrs) {
            var cssId = attrs.fbInitDropdown;
            if (scope.$last) {
                $timeout(function () {
                        $('#' + cssId).dropdown();
                }, 0);
            }
        };
    }])
    .directive('fbCopy', function(){
        return {
          restrict: 'A',
          link: function(scope, element, attrs){
              var text = attrs.fbCopy || '复制内容有误，请尝试选中需要复制的内容并右键选择复制';
              element.on('click', function(){
                  var element = document.createElement('input');
                  element.type = 'text';
                  element.value = text;
                  document.body.appendChild(element);
                  element.select();
                  document.execCommand('copy');
                  document.body.removeChild(element);
                  console.log('复制成功！');
              });
          }
        };
    })
    /**
     * [fbCountdownBtn  倒计时]
     * reset:         清空                (必填)
     * dispatch:      循环                (自动触发点击事件 则必填)
     * initConfig: {                     (自动触发点击事件 此对象则必填)
     *     dispatch:  绑定事件的Id值,      (必填)
     *     val:       'time',            (如果是数字 则必填)
     *     callback:  function(){}       (可选) 倒计时结束时的回调
     * }
     */
    .directive('fbCountdownBtn', ['$interval', '$timeout', function($interval, $timeout){
        return {
            restrict: 'A',
            scope: {
                reset: '=',
                dispatch: '=',
                initConfig: '='
            },
            link: function(scope, element, attrs){
                var seconds = window.parseInt(attrs.fbCountdownBtn) || 60;
                var text = element.html() || element.val() || scope.initConfig.val;
                var timer;
                var time_slot;
                element.on('click', function(){
                    element.attr('disabled', true);
                    timer = $interval(function(){
                        element.html() && element.html(seconds--);
                        element.val() && element.val(seconds--);
                        if(seconds < 0){
                            scope.reset();
                            if (scope.initConfig.dispatch && parseInt(text, 10)) {
                                if (typeof scope.initConfig.callback === 'function') {
                                    scope.initConfig.callback(scope.initConfig.callbackArgs);
                                }
                                seconds = time_slot || parseInt(text, 10);
                                scope.dispatch();
                            }
                        }
                    }, 1000);
                });

                scope.dispatch = function(slot){
                    $timeout(function() {
                        if (slot && parseInt(slot, 10)) {
                            seconds = time_slot = parseInt(slot, 10);
                        }
                        if(document.all) {
                            document.getElementById(scope.initConfig.dispatch).click();
                        } else {
                            var e = document.createEvent('MouseEvents');
                            e.initEvent('click', true, true);
                            document.getElementById(scope.initConfig.dispatch).dispatchEvent(e);
                        }
                    });
                };

                scope.reset = function(resetVal){
                    element.attr('disabled', false);
                    element.html() && element.html(resetVal || time_slot || text);
                    element.val() && element.val(resetVal || time_slot || text);
                    $interval.cancel(timer);
                };

                if (scope.initConfig.dispatch) {
                    scope.dispatch();
                }
            }
        };
    }])
    .directive('linkd', function(){
        return {
            restrict: 'E',
            template: '<p>Hello {{num}}!</p>',
            controller: function($scope, $element) {
                $scope.num = $scope.num + "22222 ";
            },
            // controller先运行，link后运行，link和compile不兼容。compile改变dom,link事件的触发和绑定
            link: function(scope, el, attr) {
                scope.num = scope.num + "33333 ";
            }
        };
    })
    .directive('showModal', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, ele) {
                ele.bind('click', function () {
                    var _this = $(this);
                    var modal = _this.attr('data-modal');
                    _this.css('cursor','pointer');
                    $timeout(function () {
                        $('#' + modal).modal({
                                closable: false,
                                // blurring: true,
                                selector: {
                                    close: '.closeBtn,.cancel',
                                    deny: '.cancel'
                                },
                                onHidden: function(){
                                    let _this = $(this);
                                    let field = _this.find('.field');
                                    let errorMsg = _this.find('.ui.error.message');
                                    field.removeClass('error');
                                    field.children('.prompt').remove();
                                    if (errorMsg[0]) {
                                        errorMsg[0].innerHTML = '';
                                    }
                                }
                            })
                            .transition('fade down')
                            .modal('show');
                    }, 0);
                });
            }
        };
    }])
    .directive('diHref', ['$location', '$route', function($location, $route) {
        return function(scope, element, attrs) {
            scope.$watch('diHref', function() {
                if(attrs.diHref) {
                    element.attr('href', attrs.diHref);
                    element.bind('click', function() {
                        scope.$apply(function(){
                            if($location.path() == attrs.diHref) $route.reload();
                        });
                    });
                }
            });
        };
    }])
    .directive("wsOnerror", function(){
        return function(scope, element, attr){
            element.bind("error", accept);

            function accept(e){
                e.preventDefault();
                try{
                    scope.$apply(attr.wsOnerror);
                }catch(e){
                    alert(e);
                }
            }
        };
    })
    .directive('wsEnter', function () {
        return function (scope, element, attrs) {
            element.bind('keydown keypress', function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.wsEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    })
    .directive('wsTrueValue', [function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function(v) {
                    return v ? scope.$eval(attrs.wsTrueValue) : scope.$eval(attrs.wsFalseValue);
                });
            }
        };
    }])
    .directive('wsImgLoadError', ['kvMap', function(kvMap) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                var directiveName = 'wsImgLoadError';
                var attrVal = attrs[directiveName];
                if(!attrVal){
                    attrVal = 'default';
                }
                var imgUrl = kvMap.errorImgConfig[attrVal];
                element.bind('error', function(){
                    element.attr('src', imgUrl);
                });

                if(!attrs.ngSrc){
                    element.attr('src', imgUrl);
                }
            }
        };
    }])
    .directive('ensureUnique', function(){
        return {
            require: 'ngModel',
            link: function(scope, ele, attrs, c){
                scope.$watch(attrs.ngModel, function(newVal, oldVal){
                    if (newVal && newVal == 'error') {
                        console.log('%c%s', 'background: #efcccc; color: red;', '---->>>> ~ Error, plearse input other val. ~ <<<< ----');
                    }
                });
            }
        };
    })
    .directive('fbInstantSearch', ['CommonService', '$timeout', function(CommonService, $timeout){
        /***
         * instant search
         */
        return {
            restrict: 'E',
            replace: true,
            scope: {
                initConfig: '='
            },
            link: function(scope, element, attrs){
                scope.searchId = (+ new Date() + Math.floor(Math.random() * 90 + 10)).toString();
                scope.placeholder = attrs.placeholder;
                scope.icon = attrs.icon || 'search';

                scope.findCssClass = function(){
                    if(scope.initConfig.showCloseIcon){
                        return 'close';
                    }else {
                        return scope.icon;
                    }
                };

                scope.clearInput = function(){
                    if(scope.initConfig.showCloseIcon){
                        scope.initConfig.showCloseIcon = false;
                        $('#' + scope.searchId + '-input').val('');
                        scope.initConfig.container[scope.initConfig.propName] = undefined;
                    }
                };

                $timeout(function(){
                    CommonService.semanticInstantSearch({
                        url: scope.initConfig.url,
                        cssId: scope.searchId,
                        container: scope.initConfig.container,
                        propName: scope.initConfig.propName,
                        propChain: scope.initConfig.propChain,
                        resultsPropsConfig: scope.initConfig.resultsPropsConfig,
                        callback: function() {
                            var cb = scope.initConfig.callback;
                            var cbArgs = scope.initConfig.callbackArgs;
                            if(cb && typeof cb === 'function'){
                                if(cbArgs){
                                    cb(cbArgs);
                                }else {
                                    cb();
                                }
                            }
                            scope.$apply(function(){
                                scope.initConfig.showCloseIcon = true;
                            });
                        }
                    });
                }, 0);

                scope.$watch('initConfig', function (newVal) {
                    if (!newVal || !newVal.container || !newVal.propName) {
                        return false;
                    }
                    // 打开页面，还原icon
                    if (!newVal.container[newVal.propName]) {
                        newVal.showCloseIcon = false;
                        $('#' + scope.searchId + '-input').val('');
                        newVal.container[newVal.propName] = undefined;
                    } else {
                        newVal.showCloseIcon = true;
                        scope.findCssClass();
                    }
                    return true;
                }, true);
            },
            template: '<div class="ui search icon input" id="{{searchId}}">' +
                            '<input type="text"' +
                                   'class="prompt"' +
                                   'id="{{searchId}}-input"' +
                                   'placeholder="{{placeholder}}"' +
                                   'ng-disabled="initConfig.showCloseIcon"' +
                                   '>' +
                            '<i class="icon link" ng-class="findCssClass()" ng-click="clearInput()"></i>' +
                        '</div>'
        };
    }]);
