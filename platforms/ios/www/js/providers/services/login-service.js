/**
 * Categories service
 */
(function() {

angular.module('invisionApp').config(['$provide', function($provide) {
  $provide.service('loginService', ['$http', 'routesConfig', function ($http, routesConfig) {
			'use strict';
			var loggedIn = $cookies.get('loggedIn');

			function getLoggedIn(){
				return loggedIn;
			}

			return {
				getLoggedIn: getLoggedIn
			};
		}
	]);
}])});
