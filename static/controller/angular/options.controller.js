angular
    .module('website.ctrl')
    .controller('ngOptionsCtrl', ['$scope', function($scope){
        $scope.seleted = '';
        $scope.animals = [
          {
            id: '00001',
            name: '猫',
            sex: '雌',
            food: '鱼',
            favor: '玩球'
          },
          {
            id: '00002',
            name: '狗',
            sex: '雄',
            food: '骨头',
            favor: '接盘子'
          },
          {
            id: '00003',
            name: '兔',
            sex: '雌',
            food: '胡萝卜',
            favor: '刨洞'
          },
          {
            id: '00004',
            name: '狮',
            sex: '雄',
            food: '肉',
            favor: '猎物'
          }
        ];

        $scope.num = [
            { id: 1, name: 'a' },
            { id: 2, name: 'b' },
            { id: 3, name: 'c' },
            { id: 4, name: 'd' },
            { id: 5, name: 'e' }
        ];

        $scope.str = [
            { id: '1', name: 'a' },
            { id: '2', name: 'b' },
            { id: '3', name: 'c' },
            { id: '4', name: 'd' },
            { id: '5', name: 'e' }
        ];

        $scope.repeat = {
            strId: '1',
            numId: 2 // "error"
        };

        $scope.option = {
            strId: '3',
            numId: 4
        };

        // 生成二维码 http://code.ciaoca.com/javascript/qrcode/
        // 简单方式
        // new QRCode(document.getElementById('qr-code'), 'your content');

        // 设置参数方式
        $scope.qrCodeDom = document.getElementById('qr-code');
        $scope.qrUrl = location.href;
        $scope.qrcode = new QRCode($scope.qrCodeDom, {
            text: $scope.qrUrl,
            width: 140,
            height: 140,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
        setTimeout(function(){
            $('.qr-download').attr('href', $('#qr-code img').attr('src'));
        });

        $scope.copyTest = function(){
            var inputText = document.getElementById('inputText');
            var currentFocus = document.activeElement;
            inputText.focus();
            inputText.setSelectionRange(0, inputText.value.length);
            document.execCommand('copy', true);
            currentFocus.focus();
        };

        $scope.animalsObject = {
            1: {
                id: '00001',
                name: '猫',
                sex: '雌',
                food: '鱼',
                favor: '玩球'
            },
            2: {
                id: '00002',
                name: '狗',
                sex: '雄',
                food: '骨头',
                favor: '接盘子'
            },
            3: {
                id: '00003',
                name: '兔',
                sex: '雌',
                food: '胡萝卜',
                favor: '刨洞'
            },
            4: {
                id: '00004',
                name: '狮',
                sex: '雄',
                food: '肉',
                favor: '猎物'
            }
        };

        $.cookie('i', 32);
        console.log($.cookie('i'));

        $scope.$on('$destroy', function(){
            $scope.qrcode.clear(); //仅在不支持 Canvas 的浏览器下有效
            $scope.qrcode.makeCode('new content'); //设置二维码内容
              // $interval.cancel();
        });
}]);
