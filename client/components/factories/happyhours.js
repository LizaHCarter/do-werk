(function(){
  'use strict';

  angular.module('do-werk')
  .factory('Place', ['$http', function($http){

    function all(){
      return $http.get('/happyhours');
    }


    return {all:all};
  }]);
})();

