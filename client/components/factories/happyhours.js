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

    function findById(id){
      return $http.get('/happyhours/'+id);
    }

    return {all:all, findToday:findToday, findById:findById};
  }]);
})();

