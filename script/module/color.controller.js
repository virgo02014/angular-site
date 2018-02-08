angular
    .module('website.ctrl')
    .controller('findColorCtrl', function() {
        //1.获取game元素
        var game = document.getElementById('game');

        //2.获取画布宽高
        var gameWidth = game.width;

        var gameHeight = game.height;

        //3.定义一个变量保存要显示多少格
        var frames = 4;

        //4.使用createjs修建一个舞台
        var stage = new createjs.Stage('game');

        //获取level元素
        // var level = document.getElementById('level');

        //定义随机变化范围  逐步变小  加大难度
        var randomNum = 60;

        //5.自定义函数，该函数根据frames格数来创建矩形方块
        function createRect() {

            //每次随机数减少，随机数越小难度越大
            randomNum -= random(5);

            //每次重新绘制前要清除舞台中所有的元素
            stage.removeAllChildren();

            //6.计算每格的宽高，每格的宽高 =  画布的宽高/显示的格数
            var width = gameWidth / frames;

            var height = gameHeight / frames;

            //6.1创建一个变量保存随机的索引值，数组中第一个为i第二个为j
            var randomIndex = [random(frames), random(frames)];

            //6.2创建一个变量保存颜色值
            var colors = randomColor();

            var color = colors[0];

            //8.循环创建矩形，要生成成的格数是frames*frames 比如4*4 5*5  因此要循环两次
            for (var i = 0; i < frames; i++) {

                //9.这一层循环 会为了获取X坐标
                for (var j = 0; j < frames; j++) {

                    //10.这一层循环为了获取Y坐标      i*j循环的次数就是要得生成的格数
                    //11.创建一个矩形
                    var rect = new createjs.Shape();

                    //11.1判断当前的i与j是否与随机的索引匹配，如果是那么这个格子就是被选中的
                    if (randomIndex[0] == i && randomIndex[1] == j) {

                        //11.2设置颜色为pink 否则颜色为blue
                        color = colors[1];

                        //11.3为当前选中的矩形添加单击事件
                        rect.addEventListener('click', function() {

                            //11.4点击后要重新生成 格子，并且frames+1
                            createRect(frames++);
                        });
                    } else {
                        color = colors[0];
                    }

                    //12.对矩形进行颜色填充并绘制成矩形
                    rect.graphics.beginFill(color).drawRect(i * width, j * height, width - 1, height - 1);

                    //13.将画好的矩形添加到舞台中
                    stage.addChild(rect);

                    document.title = '您的好色等级为：' + frames + '级';

                }
            }
        }

        //自定义函数用于获取指定的随机数
        function random(num) {
            return Math.floor(Math.random() * num);
        }

        //自定义函数用于获取随机颜色 并且相近
        function randomColor() {
            var r = random(255);
            var g = random(255);
            var b = random(255);

            return ['rgb(' + r + ',' + g + ',' + b + ')', 'rgb(' + (r + random(randomNum)) + ',' + (g + random(randomNum)) + ',' + (b + random(randomNum)) + ')'];
        }

        createRect();

        //添加自动刷新舞台事件
        createjs.Ticker.addEventListener('tick', stage);
    });
