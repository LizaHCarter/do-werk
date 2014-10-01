/* jshint camelcase:false*/

(function(){
  'use strict';

  angular.module('lcRestaurantModule', [])
  .factory('YelpApi', ['$http', function($http){
    function restaurant(business){
      return $http.jsonp('http://api.yelp.com/v2/search?term='+business+'&location=Nashville.json?callback=JSON_CALLBACK');
    }
    return{restaurant:restaurant};
  }])
  .directive('lcRestaurant', [function(){
    var o = {};
    o.restrict = 'A';
    o.templateUrl = '/components/directives/lc-restaurant/lc-restaurant.html';
    o.scope = {business:'@'};
    o.link = function(scope, element, attrs){
    };

    o.controller = ['$scope', 'YelpApi', function($scope, YelpApi){
      function getInfo(){
        YelpApi.info($scope.business).then(function(response){
          debugger;
        });
      }
      getInfo();
    }];
    return o;
  }]);
})();
