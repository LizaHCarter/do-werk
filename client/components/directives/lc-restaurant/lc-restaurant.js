/* jshint camelcase:false*/

(function(){
  'use strict';

  angular.module('lcRestaurantModule', [])
  .factory('FoursquareApi', ['$http', function($http){
    function restaurant(business){
      return $http.jsonp('https://api.foursquare.com/v2/venues/search?client_id=TD1NU3JZTB05IW00UXGKQYIZJO23GAQHBIMSBGOPRFAG11L0&client_secret=NYD3E23NNVJVDET3FM23IGQUKFHYJY0MQADPPVNZSHGWIYGP&v=20130815&near=Nashville,TN&query='+ business+'&callback=JSON_CALLBACK');
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

    o.controller = ['$scope', 'FoursquareApi', function($scope, FoursquareApi){
      function getInfo(){
        FoursquareApi.restaurant($scope.business).then(function(response){
          $scope.business = response.data.response.venues;
        });
      }
      getInfo();
    }];
    return o;
  }]);
})();
