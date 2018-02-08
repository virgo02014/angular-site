(function() {
    'use strict';

    angular
        .module('website.router')
        .config(['$stateProvider', index_config])
        .config(['$stateProvider', websitetpl])
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
                    templateUrl: '/html/index.html'
                }
            }
        });
    }

    function websitetpl($stateProvider){
        $stateProvider.state({
            name: 'img',
            url: '/img',
            views: {
                'content': {
                    controller: 'imgCtrl',
                    templateUrl: '/html/img.html'
                }
            }
        }).state({
            name: 'truning-brand',
            url: '/turning',
            views: {
                'content': {
                    controller: 'brandCtrl',
                    templateUrl: '/html/brand.html'
                }
            }
        }).state({
            name: 'find-color',
            url: '/color',
            views: {
                'content': {
                    controller: 'findColorCtrl',
                    templateUrl: '/html/color.html'
                }
            }
        }).state({
            name: 'others',
            url: '/others',
            views: {
                'content': {
                    controller: 'othersCtrl',
                    templateUrl: '/html/others.html'
                }
            }
        }).state({
            name: 'options',
            url: '/options',
            views: {
                'content': {
                    controller: 'ngOptionsCtrl',
                    templateUrl: '/html/options.html'
                }
            }
        }).state({
            name: 'map',
            url: '/map',
            views: {
                'content': {
                    controller: 'mapCtrl',
                    controllerAs: 'vm',
                    templateUrl: '/html/map.html'
                }
            }
        }).state({
            name: 'material',
            url: '/material',
            views: {
                'content': {
                    controller: 'materialCtrl',
                    templateUrl: '/html/material.html'
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
                    templateUrl: '/html/error.html'
                }
            }
        });
    }
})();
