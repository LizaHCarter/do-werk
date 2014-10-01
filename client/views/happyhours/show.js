(function(){
  'use strict';

  angular.module('do-werk')
  .controller('ShowCtrl', ['$scope', 'happyHour', function($scope, happyHour){
    happyHour.findById().then(function(response){
      debugger;
      $scope.happyhour = response.data.happyhour;
    });

  }]);
})();

