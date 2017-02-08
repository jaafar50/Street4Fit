'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'firebase',
  'myApp.street4fit',

]).
config(['$routeProvider', function($routeProvider) {

  $routeProvider.otherwise({redirectTo: '/home'});
}]);
