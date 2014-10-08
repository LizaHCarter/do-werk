/* jshint newcap:false */
(function(){
  'use strict';

  angular.module('do-werk')
  .controller('HomeCtrl', ['$scope', '$interval', 'happyHour', 'ngTableParams', '$filter', function($scope, $interval, happyHour, ngTableParams, $filter){

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
      }, 100),
      data = [];
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
      debugger;
      data = $scope.happyhours;
      $scope.tableParams = new ngTableParams({
          page: 1,            // show first page
          count: 10,          // count per page
          filter: {
              name: ''       // initial filter
          },
          sorting: {
              name: 'asc'     // initial sorting
          }
      }, {
          total: data.length, // length of data
          getData: function($defer, params){
              // use build-in angular filter
              var filteredData = params.filter() ?
                    $filter('filter')(data, params.filter()) :
                    data,
                  orderedData = params.sorting() ?
                    $filter('orderBy')(filteredData, params.orderBy()) :
                    data;
            debugger;
            params.total(orderedData.length); // set total for recalc pagination
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
      });
    });
  }]);
})();

