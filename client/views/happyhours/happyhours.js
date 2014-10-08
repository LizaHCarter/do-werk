/* jshint newcap:false */
(function(){
  'use strict';

  angular.module('do-werk')
  .controller('HappyHoursCtrl', ['$scope', 'happyHour', '$interval', 'ngTableParams', '$filter', function($scope, happyHour, $interval, ngTableParams, $filter){
    var title = 'all happy hours';
    $scope.happyhours = [];

    $scope.type = '';
    var i     = 0,
      timer = $interval(function(){
        if(i<title.length){
          $scope.type += title[i];}
        else{
          $interval.cancel(timer);}
        i++;
        $scope.$apply();
      }, 100),
      data = [];
    happyHour.all().then(function(response){
      $scope.happyhours = response.data.happyhours;
      data = $scope.happyhours;
      $scope.tableParams = new ngTableParams({
              page: 1,            // show first page
              count: 100,          // count per page
              sorting: {neighborhood:'asc', name:'asc'}
          }, {
              groupBy: 'neighborhood',
              total: data.length,
              getData: function($defer, params){
                  var orderedData = params.sorting() ?
                          $filter('orderBy')(data, $scope.tableParams.orderBy()) :
                          data;

                  $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));


          }
      });
    });
  }]);
})();

