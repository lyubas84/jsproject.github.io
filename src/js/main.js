(function(){
  'use strict';
  angular.module('myApp', [])
  .controller('myController', myController);

  myController.$inject = ['$scope','$filter'];

  function myController($scope,$filter) {
    $scope.name = "Lesiv";
    $scope.sayMessage = "Hello";
    $scope.show = false;

    $scope.showMessage = function(){
      $scope.show = !$scope.show;
    }
  }

})();
