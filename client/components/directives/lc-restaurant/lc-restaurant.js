/* jshint camelcase:false*/

(function(){
  'use strict';

  angular.module('lcRestaurantModule', [])
  .factory('FoursquareApi', ['$http', function($http){
    function restaurant(business){
      debugger;
      return $http.jsonp('https://api.foursquare.com/v2/venues/search?client_id=TD1NU3JZTB05IW00UXGKQYIZJO23GAQHBIMSBGOPRFAG11L0&client_secret=NYD3E23NNVJVDET3FM23IGQUKFHYJY0MQADPPVNZSHGWIYGP&v=20130815&near=Nashville,TN&query='+business+'&callback=JSON_CALLBACK');
    }
    return{restaurant:restaurant};
  }])
  .directive('lcRestaurant', [function(){
    var o = {};
    o.restrict = 'A';
    o.templateUrl = '/components/directives/lc-restaurant/lc-restaurant.html';
    o.scope = {business:'@'};
    o.link = function(scope, element, attrs){
      debugger;
    };

    o.controller = ['$scope', 'FoursquareApi', function($scope, FoursquareApi){

      $scope.$watch('business', function(neew, old){
        FoursquareApi.restaurant($scope.business).then(function(response){
          debugger;
          console.log(response);
          $scope.place = response.data.response.venues[0];
        });
      });

    }];
    return o;
  }]);
})();
