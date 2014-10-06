(function(){
  'use strict';

  angular.module('do-werk')
  .controller('HappyHoursCtrl', ['$scope', 'happyHour', '$interval', function($scope, happyHour, $interval){
    var title = 'all happy hours';
    $scope.happyhours = [];
    $scope.business = '12 south taproom';

    $scope.type = '';
    var i     = 0,
      timer = $interval(function(){
        if(i<title.length){
          $scope.type += title[i];}
        else{
          $interval.cancel(timer);}
        i++;
        $scope.$apply();
      }, 100);

    happyHour.all().then(function(response){
      $scope.happyhours = response.data.happyhours;
    });

  }]);
})();

