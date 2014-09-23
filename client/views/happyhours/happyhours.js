(function(){
  'use strict';

  angular.module('do-werk')
  .controller('HappyHoursCtrl', ['$scope', 'happyHour', function($scope, happyHour){
    $scope.title = 'all happy hours';
    $scope.happyhours = [];

    happyHour.all().then(function(response){
      $scope.happyhours = response.data.happyhours;
    });

  }]);
})();

