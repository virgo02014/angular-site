(function() {
    'use strict';

    angular
        .module('website.config', ['angular-loading-bar'])
        .config(config);

    config.$inject = ['$locationProvider', 'cfpLoadingBarProvider'];

    function config($locationProvider) {
//      angular URL 路由 # 问题
//      http://blog.fens.me/angularjs-url/

        // $locationProvider.html5Mode(true);
        // http://localhost:9999/website/index.html#/website/home/login
        // http://localhost:9999/website/home/login

        // $locationProvider.hashPrefix('!');
        // http://localhost:9999/website/index.html#/!/website/home/login

        //https://github.com/chieffancypants/angular-loading-bar
        // cfpLoadingBarProvider.includeSpinner = false; // 去掉顶部 loading 左侧 旋转
        // cfpLoadingBarProvider.includeBar = false; //去掉
        // cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Loading...</div>'; // inline HTML

        // 自定义 进度条位置
        // cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
        // cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Custom Loading Message...</div>';

        // cfpLoadingBarProvider.latencyThreshold = 500;
    }
})();
