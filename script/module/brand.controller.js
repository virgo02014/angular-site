angular
	.module('website.ctrl')
	.controller('brandCtrl', ['$scope', function($scope){

		// 获取UL元素
		var roles = document.getElementById('brands');

		// 获取LI元素
		var li = document.getElementsByTagName('li');

		// 定义变量用于保存上一个被选中的元素
		var prevLi;

		// 给ul添加单击事件
		roles.onclick = function(e){

			// 兼容方式获取event事件对象    e第一个参数是event事件对象
			e = e || window.event;

			//兼容获取被点击的事件源对象     根据event事件对象获取被点击的元素
			var target = e.target || e.srcElement;

			// 判断当前被点的目标标签名若不为li直接return 终止执行
			if(!/li/i.test(target.tagName)) return;

			// 如果上一个被点的元素存在就清除它的类名
			if (prevLi) {
				prevLi.className = '';
			}

			// 为当前被点击的目标元素添加类名
			target.className = 'active';

			// 将当前被点的元素保存为上一个被点的元素
			prevLi = target;

			// 每次点击都要随机更新图片
			randomImage();
		};

		// 自定义函数用于加载张图片,并将加载好的图片存入指定的变量中
		function loadImage(src,arr) {
			// src为要加载的图片地址   arr为要把加载的图片所存入的变量

			// 实例化一个图片对象
			var img = new Image();

			//根据传递进来的src地址设置图片的路径
			img.src = src;// '../../image/bg/' + i + '.png';

			//为图片添加加载事件
			img.onload = function(){

				// 图片加载后执行此函数，并将当前图片存入指定的arr变量中
				arr.push(this);
			};
		}

		// 定义两个数组用于保存背景图与人像
		var bg = [];
		var girls = [];

		// 循环13次然后进行图片加载
		for(var i = 1; i <= 13; i++){

			// 加载背景图
			loadImage('../../img/bg/' + i + '.png',bg);

			// 加载人头像
			loadImage('../../img/girls/' + i + '.png',girls);

		}

		// 向数组原型中添加数据随机排序函数，方便对于数组中的图片打乱顺序
		Array.prototype.random = function() {
			this.sort(function(){
				return Math.floor(Math.random() * 100) % Math.floor(Math.random() * 100);
			});
		};

		// 自定义函数用于随机更新背景图片
		function randomImage() {

			// 将背景与人头像数组进行随机排序
			bg.random();
			girls.random();

			// 遍历li为li中的DIV设置背景图
			for(var i = 0; i < li.length; i++) {

				// 获取li中的DIV元素
				var div = li[i].getElementsByTagName('div');

				//获取div是数组形式
//				console.log('div',div);

				// 为第一个DIV设置人头像背景
				div[0].style.backgroundImage = 'url(' + girls[i].src + ')';

				// 为第二个DIV设置背景图片
				div[1].style.backgroundImage = 'url(' + bg[i].src + ')';
			}
		}

		// 定时检测图片是否加载完成，若加载完成就更新图片
		var sid = setInterval(function(){

			// 如果bg与girls两个数组的长度都是13则表示图片全部加载完成
			if (bg.length == 13 && girls.length == 13) {

				// 图片全部加载完成 终止定时器
				clearInterval(sid);
//				console.log('加载完成');

				// 自动更新图片
				randomImage();
			}
		}, 0);

	}]);

