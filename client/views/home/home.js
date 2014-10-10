/* jshint newcap:false */
(function(){
  'use strict';

  angular.module('do-werk')
  .controller('HomeCtrl', ['$scope', '$interval', 'happyHour', 'ngTableParams', '$filter', function($scope, $interval, happyHour, ngTableParams, $filter){
    var greeting= 'hello world, welcome to do werk! ever wanted to code with other ninjas while enjoying a cold brew? here you can find happy hours around nashville with free wifi. if you register and login to your account, you can see other coders who regularly werk at certain locations. now grab your laptop, make a new friend, order an adult beverage, and do werk!';
    $scope.type1 = '';
    var i     = 0,
      timer = $interval(function(){
        if(i<greeting.length){
          $scope.type1 += greeting[i];}
        else{
          $interval.cancel(timer);}
        i++;
      $scope.$apply();
      }, 80);

    $scope.happyhours = [];
    $scope.showPanel = function(){
      $scope.hidePanel = !!!$scope.hidePanel;
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
        }, 200);
    };

    var data = [];
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
      data = $scope.happyhours;
      $scope.tableParams = new ngTableParams({
          page: 1,            // show first page
          count: 25,          // count per page
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
            params.total(orderedData.length); // set total for recalc pagination
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
      });
    });
  }]);
})();

