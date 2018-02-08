angular.module('website.service', [])
    .service('CommonService', function() {
        return {
            // 计算两个时间段天数
            getDays: function(start, end, type) {
                var nowStart = new Date(start);
                var nowEnd = new Date(end);
                var days;

                if (type == 'getMonth') {
                    start = start.split('-');
                    start = parseInt(start[0]) * 12 + parseInt(start[1]);
                    end = end.split('-');
                    end = parseInt(end[0]) * 12 + parseInt(end[1]);
                    days = Math.abs(end - start);
                } else if (type == 'getDay') {
                    days = (nowEnd - nowStart) / (24 * 60 * 60 * 1000);
                }
                return days;
            },
            semanticInstantSearch: function (queryConfig) {
                var url = queryConfig.url;
                var cssId = queryConfig.cssId;
                var container = queryConfig.container;
                var propName = queryConfig.propName;
                var propChain = queryConfig.propChain || ['data'];
                var resultsPropsConfig = queryConfig.resultsPropsConfig;
                var separator = ' | ' || resultsPropsConfig.separator;
                // resultsPropsConfig example:
                // {
                //    title: ['id', 'nickname'],
                //    value: ['id'],
                //    separator: '|'
                // }
                var onSelectCallback = queryConfig.callback;
                var callbackArgs = queryConfig.callbackArgs;
                var onResponse = queryConfig.onResponse;
                var ret;
                if (!onResponse) {
                    onResponse = function (response) {
                        ret = response;
                        var arr = [];
                        var result = {
                            results: arr
                        };
                        for (var i = 0, length = propChain.length; i < length; i++) {
                            ret = ret[propChain[i]];
                        }
                        ret.forEach(
                            function (element) {
                                arr.push({
                                    title: resultsPropsConfig.title.map(
                                        function (ele) {
                                            return element[ele];
                                        }
                                    ).join(separator),
                                    value: resultsPropsConfig.value.map(
                                        function (ele) {
                                            return element[ele];
                                        }
                                    ).join(separator),
                                    data: element
                                });
                            }
                        );

                        return result;
                    };
                }
                var searchConfig = {
                    apiSettings: {
                        url: url,
                        beforeXHR: function (xhr) {
                            //xhr.setRequestHeader('Authorization', 'Token fe4ae2aec7cf35e7e1f8f31e728c2c7b0cd50d98');
                        },
                        onResponse: onResponse
                    },
                    onSelect: function (result) {
                        container[propName] = result.value;
                        container.originalData = result.data;
                        if (onSelectCallback) {
                            if (callbackArgs) {
                                onSelectCallback(callbackArgs);
                            } else {
                                onSelectCallback();
                            }
                        }
                    },
                    error: {
                        noResults: '暂无搜索结果'
                    }
                };

                $('#' + cssId).search(searchConfig);
            },
            // 格式化日期：yyyy-MM-dd
            formatDate: function(date, type) {
                var myyear = date.getFullYear();
                var mymonth = date.getMonth() + 1;
                var myweekday = date.getDate();
                var formatValue;

                if(mymonth < 10){
                    mymonth = '0' + mymonth;
                }
                if(myweekday < 10){
                    myweekday = '0' + myweekday;
                }

                if (type == 'getMonth') {
                    formatValue = myyear + '-' + mymonth;
                } else if (type == 'getDay') {
                    formatValue = myyear + '-' + mymonth + '-' + myweekday;
                }
                return formatValue;
            },
            validation: function(input, type){
                var filter  = WEBSITE_FORM_VALIDATION_RULES.common[type];
                if (filter.test(input)){
                    console.warn('email ok');
                }else {
                    console.warn('email error');
                }
                return false;
            },
            progressIndicator: function(className){
                // 进度条 跟页面滚动条长度 保持一致
                // var ditto = {
                //     save_progress: true, // 保存阅读进度
                // };

                var $w = $(window);
                var $prog2 = $('.' + className);
                var wh = $w.height();
                var h = $('body').height();
                var sHeight = h - wh;
                $w.on('scroll', function() {
                  window.requestAnimationFrame(function(){
                    var perc = Math.max(0, Math.min(1, $w.scrollTop() / sHeight));
                    console.log('perc', perc);
                    console.log('$w.scrollTop()', $w.scrollTop());
                    console.log('sHeight', sHeight);
                    updateProgress(perc);
                  });
                });

                function updateProgress(perc) {
                  $prog2.css({width: perc * 100 + '%'});
                  // ditto.save_progress && store.set('page-progress', perc);
                }
            },

            /**
             * [progressBar description] 原生全屏轮播图
             * name             id                 description
             *  progress list:   list    (固定)      滚动的图片列表
             *  radio button:    btn     (固定)      当前图片的索引
             *  arrow            arrow_r (固定)      左箭头
             *  arrow            arrow_l (固定)      右箭头
             *
             * @time =        (必选)    滚动时间
             */
            progressBar: function(time){
                //1.获取图片列表容器
                var list = document.getElementById('list');

                //2.获取图片列表li
                // var listLi = list.getElementsByTagName('li');

                //3.获取按钮列表容器
                var btn = document.getElementById('btn') && document.getElementById('btn').getElementsByTagName('li') || [];

                //4.获取按钮数量
                var length = btn.length;

                //4.1获取上一个被选中的元素的索引值
                var prevIndex = 0;

                //4.遍历按钮添加单击事件
                for(var i = 0 ; i < length; i++){

                    //5.闭包添加事件
                    (function(index){
                        btn[index].onmouseover = function(){

                            //6.执行move函数并传入索引
                            move(index);
                        };
                    })(i);
                }

                //7.自定义函数move，该函数是核心，根据索引值去查找对应的元素并设置样式
                function move(num){

                    //8.如果上一张图索引值非-1 让上一张图取消样式
                    if(prevIndex > -1){

                        btn[prevIndex].className = '';

                    }
                    //9.当前按钮添加类名
                    btn[num].className = 'active';

                    //10.根据索引值计算图片列表UL要移动的位置
                    list.style.marginLeft = -100 * num + '%';

                    //10.将当前索引值存入上一个索引值
                    prevIndex = num;

                    //11.点击时同步更新索引值，下次自动播放时可以继续跟着当前被点的往下播放
                    index = num;
                }

                //11.保存当前元素索引值
                var index = 0;

                //12.自定义函数用于计算索引值，第一个参数布尔值，如果参数为真则表示进行--否则++
                function count(subtract){

                    //如果参数为真则+1 否则-1
                    index += subtract ? -1 : 1;

                    //如果索引值大于元素长度则重置 为0，如果索引小于0则重置 到最后一张图索引值
                    index = index > length - 1 ? 0 : index < 0 ? length - 1 : index;

                    //计算索引之后执行move函数
                    move(index);

                }
                if (length > 0) {
                    //13.给左右按钮添加单击事件，点左箭头--  右箭头++
                    document.getElementById('arrow_r').onclick = function(){
                        count();
                    };

                    document.getElementById('arrow_l').onclick = function(){
                        count(1);
                    };

                    //14.开启定时器保存至sid变量中
                    var sid = setInterval(count, time);

                    //15.给banner容器添加鼠标移入移出事件，移入时要终止定时器，离开时要重新开启定时器
                    list.parentNode.onmouseover = function(){
                        clearInterval(sid);
                    };

                    list.parentNode.onmouseout = function(){
                        sid = setInterval(count, time);
                    };
                }
            },
            CombustionParticles: function(){
                'use strict';
                function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); }
                }

                //console.clear();
                var cv = document.querySelector("canvas"),
                    ctx = cv.getContext("2d"),
                    TAU = 2 * Math.PI,
                    ps = [],
                    PR = devicePixelRatio,
                    N = 1000 / PR,
                    M = 4,
                    R = 20 * PR,
                    Q = 16;

                var lt = 0,
                    mx = undefined,
                    my = undefined,
                    md = true;

                var P = function () {
                    function P(x, y, c) {
                        _classCallCheck(this, P);
                        this.x = 0;
                        this.y = 0;
                        this.init(x, y, c, 0);
                    }

                    P.prototype.init = function init(x, y, c, t) {
                      this.sx = x;
                      this.sy = y;
                      this.c = ctx.createRadialGradient(0, 0, R, 0, 0, 0);
                      this.c.addColorStop(0, "black");
                      this.c.addColorStop(1, c);
                      this.t = t;
                      this.dx = 2 * PR * (Math.random() - 0.5);
                      this.dy = 3 * PR * (Math.random() - 0.25);
                      this.ddx = 0; // * PR * (Math.random() - 0.5);
                      this.ddy = 0.5 * PR * (Math.random() - 1.04);

                      this.c1 = R * (Math.random() - 0.5);
                      this.c2 = 1 * PR * (Math.random() - 0.5);
                      this.c3 = R * (Math.random() - 0.5);
                      this.c4 = 1.25 * PR * (Math.random() - 0.5);
                    };

                    P.prototype.paint = function paint(t) {
                      var dt = t - this.t;
                      this.x = this.sx + dt * this.dx + dt * dt * this.ddx + this.c1 * Math.cos(dt * this.c2);
                      this.y = this.sy + dt * this.dy + dt * dt * this.ddy + this.c3 * Math.sin(dt * this.c4);
                      ctx.save();
                      ctx.translate(this.x, this.y);
                      ctx.beginPath();
                      ctx.fillStyle = this.c;
                      ctx.arc(0, 0, R, 0, TAU);
                      ctx.fill();
                      ctx.restore();
                    };

                    return P;
                }();

                function paint(t) {
                    requestAnimationFrame(paint);

                    var dt = t * 0.01,
                        a = Q * 4,
                        b = Q * 2,
                        c = Q * 1;
                    /*    a = Math.round(Q * 4 * Math.random()),
                        b = Math.round(Q * 2 * Math.random()),
                        c = Math.round(Q * 1 * Math.random());*/

                    if (ps.length < N && md) {
                      ps.push(new P(mx, my, "rgb(" + a + "," + b + "," + c + ")"));
                    }

                    ctx.clearRect(0, 0, cv.width, cv.height);
                    ctx.globalCompositeOperation = "screen";
                    ps.forEach(function (p, i) {
                      p.paint(dt);
                      if (md && (p.x < 0 || p.x >= cv.width || p.y < 0 || p.y >= cv.height)) {
                        p.init(mx, my, "rgb(" + a + "," + b + "," + c + ")", dt);
                      }
                    });
                }

                function resize() {
                    var b = cv.getBoundingClientRect();
                    cv.width = b.width * PR;
                    cv.height = b.height * PR;
                }

                window.addEventListener("resize", resize, false);
                window.addEventListener("mousemove", function (e) {
                    var b = cv.getBoundingClientRect();
                    mx = (e.clientX - b.left) * cv.width / b.width;
                    my = (e.clientY - b.top) * cv.height / b.height;
                }, false);
                window.addEventListener("mousedown", function (e) {
                    return md = true;
                }, false);
                window.addEventListener("mouseup", function (e) {
                    return md = false;
                }, false);
                resize();
                mx = 0.5 * cv.width;
                my = 0.95 * cv.height;
                requestAnimationFrame(paint);
            }
        };
    });
