angular
    .module('website.ctrl')
    .controller('othersCtrl', ['$scope', 'CommonService', function($scope, CommonService) {

        $('#image').cropper({
            aspectRatio: 16 / 9,
            crop: function(e) {
                // Output the result data for cropping image.
                // x y width height rotate scaleX scaleY
                console.log(e);
            }
        });

        // 百分比进度条
        $('#progress_percent').websiteProgress({speed: 1000, percent: 38, height: '25px'});

        // 页面顶部滚动条
        CommonService.progressIndicator('top_progress_bar_Animation');

    }]);
