angular
    .module('website.ctrl')
    .controller('indexCtrl', ['$scope', 'CommonService', function($scope, CommonService) {

        // 全屏轮播图带左右按钮与自动播放原生JS+CSS3
        CommonService.progressBar(10000);

        // 燃烧的果粒
        // CommonService.CombustionParticles();

        // 音频监控
        $scope.audio = document.getElementById('audio');
            $scope.audio.addEventListener('error', function(){
                var error = $scope.audio.error;
                switch (error && error.code) {
                    case 1:
                        alert('视频的下载过程被中止。');
                        break;
                    case 2:
                        alert('网络发生故障，视频的下载过程被中止。');
                        break;
                    case 3:
                        alert('解码失败。');
                        break;
                    case 4:
                        alert('不支持播放的视频格式。');
                        break;
                    default:
                        break;
                }
            }, true);

    }]);
