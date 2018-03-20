(function() {
    'use strict';

    angular
        .module('website.router')
        .config(['$stateProvider', index_config])
        .config(['$stateProvider', tech_htmlCss])
        .config(['$stateProvider', tech_js])
        .config(['$stateProvider', tech_angular])
        .config(['$stateProvider', tech_other])
        .config(['$stateProvider', error_config])
        .config([
            '$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
                // $urlRouterProvider.otherwise('/404');
                $urlRouterProvider.otherwise(function($injector, $location){
                   return $location.search().url || '/';
                });
            }]);

    function index_config($stateProvider){
        // template: string（模板提示字符串）,
        // templateUrl: string（模板路径URL）,
        // controller: string, function 或 array（在当前模板创建控制器，生成新的 $scope 作用域）,
        // controllerAs: string(控制器别名),
        // redirectTo: string, function（重定向地址）,
        // resolve: object<key, function>（当前路由所依赖的模块）
        $stateProvider.state({
            name: 'website',
            url: '/',
            views: {
                'content': {
                    controller: 'indexCtrl',
                    templateUrl: '/html/index/index.html'
                }
            }
        });
    }

    function tech_htmlCss($stateProvider){
        $stateProvider.state({
            name: 'img',
            url: '/img',
            views: {
                'content': {
                    controller: 'imgCtrl',
                    templateUrl: '/html/htmlcss/img.html'
                }
            }
        }).state({
            name: 'page',
            url: '/page',
            views: {
                'content': {
                    templateUrl: '/html/htmlcss/page.html'
                }
            }
        });
    }

    function tech_js($stateProvider){
        $stateProvider.state({
            name: 'truning',
            url: '/turning',
            views: {
                'content': {
                    controller: 'truningCtrl',
                    templateUrl: '/html/js/truning.html'
                }
            }
        }).state({
            name: 'find-color',
            url: '/color',
            views: {
                'content': {
                    controller: 'findColorCtrl',
                    templateUrl: '/html/js/color.html'
                }
            }
        });
    }

    function tech_angular($stateProvider){
        $stateProvider.state({
            name: 'options',
            url: '/options',
            views: {
                'content': {
                    controller: 'ngOptionsCtrl',
                    templateUrl: '/html/angular/options.html'
                }
            }
        }).state({
            name: 'material',
            url: '/material',
            views: {
                'content': {
                    controller: 'materialCtrl',
                    templateUrl: '/html/angular/material.html'
                }
            }
        });
    }

    function tech_other($stateProvider){
        $stateProvider.state({
            name: 'others',
            url: '/others',
            views: {
                'content': {
                    controller: 'othersCtrl',
                    templateUrl: '/html/other/others.html'
                }
            }
        }).state({
            name: 'map',
            url: '/map',
            views: {
                'content': {
                    controller: 'mapCtrl',
                    controllerAs: 'vm',
                    templateUrl: '/html/other/map.html'
                }
            }
        });
    }

    function error_config($stateProvider){
        $stateProvider.state({
            name: 'error404',
            url: '/404',
            views: {
                'content': {
                    templateUrl: '/html/other/error.html'
                }
            }
        });
    }
})();
