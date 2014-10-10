(function(){
  'use strict';

  angular.module('do-werk')
  .controller('ShowCtrl', ['$scope', 'happyHour', '$routeParams', function($scope, happyHour, $routeParams){
    $scope.happyhour = {};

    happyHour.findById($routeParams.id).then(function(response){
      $scope.regulars = response.data.happyhour.attendees;
      debugger;
      $scope.happyhour = response.data.happyhour;
      $scope.$watch('happyhour', function(neew, old){
        $scope.loc = response.data.happyhour.name.split(' ').join('-');
        console.log($scope.loc);
        console.log('setting location');
      });
    });

  }]);
})();

