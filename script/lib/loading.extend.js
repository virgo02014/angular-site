var $loading = $('#init_loading');
var $progress = $('#init_progress');
var prg = 0; // 初始化进度
var timer = 0;
var now = new Date(); // 记录当前时间
var timeout = 5000; // 超时时间
var next = prg;

add([30, 50], [1, 3], 100);  // 第一阶段

window.setTimeout(function () {  // 模拟图a加载完
  add(20, [1, 3], 200);
}, 1000);

window.setTimeout(function () {  // 模拟图c加载完
  add(30, [1, 3], 200);
}, 2000);

window.setTimeout(function () {  // 模拟图b加载完
  add(25, [1, 3], 200);
}, 2500);

// progress([80, 90], [1, 3], 100); // 使用数组来表示随机数的区间

window.onload = function () {
  complete();
};
if (now - loadingStartTime > timeout) {  // 超时
  complete();
} else {
  window.setTimeout(function () {  // 未超时，则等待剩余时间
    complete();
  }, timeout - (now - loadingStartTime));
}

function complete () {  // 封装完成进度功能
  add(100, [1, 5], 10, function () {
    window.setTimeout(function () {
      $loading.hide();
    }, 1000);
  });
}

function add (dist, speed, delay, callback) {
  var _dist = random(dist);
  if (next + _dist > 100) {  // 对超出部分裁剪对齐
    next = 100;
  } else {
    next += _dist;
  }

  progress(next, speed, delay, callback);
}

function progress(dist, speed, delay, callback) {
    var _delay = random(delay);
    var _speed = random(speed);
    window.clearTimeout(timer);
    timer = window.setTimeout(function() {
        if (prg + _speed >= dist) {
            window.clearTimeout(timer);
            prg = dist;
            callback && callback();
        } else {
            prg += _speed;
            progress(dist, speed, delay, callback);
        }

        $progress.html(parseInt(prg) + '%'); // 留意，由于已经不是自增1，所以这里要取整
    }, _delay);
}

function random(n) {
    if (typeof n === 'object') {
        var times = n[1] - n[0];
        var offset = n[0];
        return Math.random() * times + offset;
    } else {
        return n;
    }
}
