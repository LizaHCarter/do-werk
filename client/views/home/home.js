(function(){
  'use strict';

  angular.module('do-werk')
  .controller('HomeCtrl', ['$scope', '$interval', 'happyHour', function($scope, $interval, happyHour){

    $scope.happyhours = [];

    var content = 'happy hours today';

    $scope.type = '';
    var i     = 0,
      timer = $interval(function(){
        if(i<content.length){
          $scope.type += content[i];}
        else{
          $interval.cancel(timer);}
        i++;
        $scope.$apply();
      }, 100);

    happyHour.findToday().then(function(response){
      $scope.date = new Date().getDay();
      switch($scope.date){
        case 0:
          $scope.date = 'sunday';
          break;
        case 1:
          $scope.date = 'monday';
          break;
        case 2:
          $scope.date = 'tuesday';
          break;
        case 3:
          $scope.date = 'wednesday';
          break;
        case 4:
          $scope.date = 'thursday';
          break;
        case 5:
          $scope.date = 'friday';
          break;
        case 6:
          $scope.date = 'saturday';
      }
      $scope.happyhours = response.data.happyhours;
    });
  }]);
})();

