/*
 * controller都在同一个app中
 * $emit 冒泡事件 子作用域 --> 父作用域
 * $broadcast 向下传递事件 父作用域 --> 子作用域
 */
var app = angular.module('app', []);
app.controller('ParentCtrl', function($scope) {
  $scope.message = '';

  $scope.broadcastMsg = function() {
    $scope.$broadcast('msg_triggered','parent');
  };

  $scope.emitMsg = function() {
    $scope.$emit('msg_triggered','parent');
  };

  $scope.$on('msg_triggered', function(event, from){
    $scope.message = from;
  });
});

app.controller('ChildCtrl', function($scope) {
  $scope.message = '';
  $scope.broadcastMsg = function() {
    $scope.$broadcast('msg_triggered','child');
  };

  $scope.emitMsg = function() {
    $scope.$emit('msg_triggered','child');
  };

  $scope.$on('msg_triggered', function(event, from){
    $scope.message = from;
  });
});

app.controller('GrandChildCtrl', function($scope) {
  $scope.message = '';

  $scope.$on('msg_triggered', function(event, from){
    $scope.message = from;
  });
});

app.controller('SiblingCtrl', function($scope) {
  $scope.message = '';
  $scope.broadcastMsg = function() {
    $scope.$broadcast('msg_triggered','sibling');
  };

  $scope.emitMsg = function() {
    $scope.$emit('msg_triggered','sibling');
  };

  $scope.$on('msg_triggered', function(event, from){
    $scope.message = from;
  });
});
