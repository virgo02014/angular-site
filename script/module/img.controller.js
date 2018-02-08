angular
    .module('website.ctrl')
    .controller('imgCtrl', ['$scope', '$http', 'CommonService', function($scope, $http, CommonService){

            $scope.imgsList = [
                { name: '1.png' },
                { name: '2.png' },
                { name: '3.png' },
                { name: '4.png' },
                { name: '5.png' },
                { name: '6.png' },
                { name: '7.png' },
                { name: '8.png' }
            ];

            $scope.subreddits = ['cats', 'pics', 'funny', 'gaming', 'AdviceAnimals', 'aww'];

            $scope.isSupportDownload = 'download' in document.createElement('a');
            console.log('isSupportDownload-->', $scope.isSupportDownload);

            console.warn($scope.imgsList);

            var getRandomSubreddit = function() {
                var sub = $scope.subreddits[Math.floor(Math.random() * $scope.subreddits.length)];

                // ensure we get a new subreddit each time.
                if (sub == $scope.subreddit) {
                  return getRandomSubreddit();
                }

                return sub;
            };

            $scope.submit = function(){
                $scope.subreddit = getRandomSubreddit();
                $http.jsonp('http://www.reddit.com/r/' + $scope.subreddit + '.json?limit=50&jsonp=JSON_CALLBACK').success(function(data) {
                    $scope.posts = data.data.children;
                });
            };

            $scope.ajaxSubmit = function(){
                // $.getJSON('http://127.0.0.1:8090/api/v2/students?page=1&page_size=15', function(data){
                //     console.log(data);
                // });
                $.ajax({
                    async: false,
                    url: 'http://127.0.0.1:8090/api/v2/students?page=1&page_size=15',
                    type: 'GET',
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('X-CSRFToken', 'CumA3fwSZW2TNK0THWx0gmCb1MGeC4no');
                    },
                    data: {
                        pk: $('#valipk').val()
                    },
                    dataType: 'json',
                    success: function(data) {
                        console.log(data);
                    }
                });
            };

            $(document).keyup(function(event){
                console.warn(event.key);
                // var key = String.fromCharCode(event.which);
                // console.warn(key);
            });

            $scope.valid = function(input, type){
                CommonService.validation(input, type);
            };

            $scope.selectValue = function(){
                // console.warn($scope.val);
                // console.warn(typeof $scope.val);

                // jQuery .prop()方法取得和设置DOM属性
                var currentlyChecked = $('#check').prop('checked');
                // $('#check').prop('checked', !currentlyChecked);
                console.warn(currentlyChecked);
                console.warn(typeof currentlyChecked);
            };

            $scope.nofind = function(){
                var imgObj = document.querySelector("#validImg");
                if(!imgObj) return;
                imgObj.src = '../../img/bg/1.png';
                console.error('img src error', imgObj.src);
                return;
                // imgObj.onerror = undefined;
                // $rootScope.pictures.push("./img/GoodsImage_NoFile.jpg");
            };

            $scope.foo = {
                hasOwnProperty: function() {
                    return false;
                },
                bar: 'Here be dragons'
            };

            console.warn($scope.foo.hasOwnProperty('bar')); // 始终返回 false
            // 如果担心这种情况，可以直接使用原型链上真正的 hasOwnProperty 方法
            console.warn(({}).hasOwnProperty.call($scope.foo, 'bar')); // true
            console.warn(Object.prototype.hasOwnProperty.call($scope.foo, 'bar')); // true
}]);
