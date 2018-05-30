(function(){
  'use strict';
  angular.module('myApp', [])
  .controller('myController', myController);

  myController.$inject = ['$scope','$filter'];

  function myController($scope,$filter) {
    $scope.name = "Lesiv";
    $scope.array = [1,2,3,4,5,6,7];
  }

})();
