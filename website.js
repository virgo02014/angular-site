(function(){
    'use strict';

    angular
        .module('website', [
            'website.config',
            'website.router',
            'website.service',
            'website.directive',
            'website.filter',
            'angular-loading-bar',
            'website.ctrl'
    ]);

    angular.module('website.config', []);
    angular.module('website.router', ['ui.router']);
    angular.module('website.service', []);
    angular.module('website.directive', []);
    angular.module('website.filter', []);
    angular
        .module('website.ctrl', [
            'website.directive',
            'website.filter',
            'website.semantic.directive',
            'ngMaterial'
        ])
        .config(config);

        config.$inject = ['$mdIconProvider', '$mdThemingProvider'];

        function config($mdIconProvider, $mdThemingProvider){
            $mdIconProvider
              .defaultIconSet("./style/svg/avatars.svg", 128)
              .icon("menu", "./style/svg/menu.svg", 24)
              .icon("share", "./style/svg/share.svg", 24)
              .icon("google_plus", "./style/svg/google_plus.svg", 24)
              .icon("hangouts", "./style/svg/hangouts.svg", 24)
              .icon("twitter", "./style/svg/twitter.svg", 24)
              .icon("phone", "./style/svg/phone.svg", 24);

            $mdThemingProvider.theme('default')
              .primaryPalette('brown')
              .accentPalette('red');
        }

    angular.module('website').run(run);
    run.$inject = ['$http', '$rootScope'];

    /**
     * @name run
     * @desc Update xsrf $http headers to align with Django's defaults
     * [, '$window', , '$log'
     */
    function run($http, $rootScope) {
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';

        $rootScope.error = function(arg){
            console.error('$rootScope-->', arg);
        };

        // 事件监听
        $rootScope.$on('$stateChangeStart', function(evt, next, current){
            // 一个新的路由被触发
            console.warn(evt);
            console.warn(next);
            console.warn(current);
        });
    }

//  $.datetimepicker.setLocale('zh'); // set datatime picker to use chinese interface

})();
