(function(){
  'use strict';

  angular.module('do-werk')
  .controller('HomeCtrl', ['$scope', '$interval', 'happyHour', function($scope, $interval, happyHour){

    $scope.happyhours = [];

    happyHour.findToday().then(function(response){
      $scope.date = new Date().getDay();
      switch($scope.date){
        case 0:
          $scope.date = 'su';
          break;
        case 1:
          $scope.date = 'm';
          break;
        case 2:
          $scope.date = 't';
          break;
        case 3:
          $scope.date = 'w';
          break;
        case 4:
          $scope.date = 'th';
          break;
        case 5:
          $scope.date = 'f';
          break;
        case 6:
          $scope.date = 's';
      }
      $scope.happyhours = response.data.happyhours;
    });
  }]);
})();

