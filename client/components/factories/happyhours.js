(function(){
  'use strict';

  angular.module('do-werk')
  .factory('happyHour', ['$http', function($http){

    function all(){
      return $http.get('/happyhours');
    }

    function findToday(){
      return $http.get('/happyhours/today');
    }

    return {all:all, findToday:findToday};
  }]);
})();

