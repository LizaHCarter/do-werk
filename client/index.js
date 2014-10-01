(function(){
  'use strict';

  angular.module('do-werk', ['ngRoute', 'LocalForageModule', 'lcRestaurantModule'])
  .config(['$routeProvider', '$httpProvider', '$localForageProvider', function($routeProvider, $httpProvider, $localForageProvider){
    $routeProvider
    .when('/', {templateUrl:'/views/home/home.html', controller:'HomeCtrl'})
    .when('/register', {templateUrl:'/views/register/register.html', controller:'RegisterCtrl'})
    .when('/login',    {templateUrl:'/views/login/login.html',       controller:'LoginCtrl'})
    .when('/logout',   {templateUrl:'/views/logout/logout.html',     controller:'LogoutCtrl'})
    .when('/happyhours',   {templateUrl:'/views/happyhours/happyhours.html',     controller:'HappyHoursCtrl'})
    .when('/happyhours/:id',   {templateUrl:'/views/happyhours/show.html',     controller:'ShowCtrl'})
    .otherwise({redirectTo:'/'});

    $httpProvider.interceptors.push('HttpInterceptor');
    $localForageProvider.config({name:'do-werk', storeName:'cache', version:1.0});
  }]);
})();

