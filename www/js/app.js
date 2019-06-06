/**
 * SurfIT invisionApp
 * New comment line
 */
var TBAApp = TBAApp || {};

TBAApp.helpers = {
	dataCheck: function(data){
		return data.length > 0 ? true : false;
	},

	imgPrefix: function(src){
		return "https://www.tjcoding.co.uk/assets/" + src;
	}
};


angular.module('invisionApp', ['ionic', 'ngCordova', 'angularMoment', 'ngCookies', 'luegg.directives', 'monospaced.elastic', 'ngMaterial', 'ngAria'])

.run([
	'$ionicPlatform',
	'$window',
	'$cookies',
	'$rootScope',
	'$location',
	'$cookieStore',
	'$http',
	function($ionicPlatform, $window, $cookies, $rootScope, $location, $cookieStore, $http) {
		$rootScope.memberDetails = $cookieStore.get('memberDetails') || {};
		if ($rootScope.memberDetails) {
			// console.log('Executed 1');
			$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.memberDetails.authdata; // jshint ignore:line
		}

		$rootScope.$on('$locationChangeStart', function (event, next, current) {
			// redirect to login page if not logged in
			// console.log('Executed 2');
			if ($location.path() !== '/login' && !$rootScope.memberDetails) {
				console.log('Executed 3');
				$location.path('/login');
			}
		});

		$ionicPlatform.ready(function() {

			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			// if (window.cordova && window.cordova.plugins.Keyboard) {
			// 	cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			// 	cordova.plugins.Keyboard.disableScroll(true);
			// }

			$window.localStorage.setItem('showIntro', true);

			if($window.localStorage.getItem('basket') == null){
				$window.localStorage.setItem('basket', JSON.stringify([]));
			}

			var notificationOpenedCallback = function() {};
			// Update with your OneSignal AppId and googleProjectNumber before running.
			// if ($window.plugins && $window.plugins.OneSignal) {
			// 	$window.plugins.OneSignal.init('23ec5308-c134-4b2b-a85d-c467945876b4', {googleProjectNumber: '1079295223727'}, notificationOpenedCallback);
			// }
		});

		// Add to index.js or the first page that loads with your app.
		// For Intel XDK and please add this to your app.js.

		document.addEventListener('deviceready', function () {
		  // Enable to debug issues.
		  // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

			var notificationOpenedCallback = function(jsonData) {
				console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
			};

			//window.plugins.OneSignal
			//	.startInit("23ec5308-c134-4b2b-a85d-c467945876b4")
			//	.handleNotificationOpened(notificationOpenedCallback)
			//	.inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
			//	.endInit();

			//window.plugins.OneSignal.getIds(function(ids) {
			//	localStorage.setItem('pushID', ids.userId);
			//});

		  // Call syncHashedEmail anywhere in your app if you have the user's email.
		  // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
		  // window.plugins.OneSignal.syncHashedEmail(userEmail);
		}, false);
	}
])
.config([
	'$stateProvider',
	'$urlRouterProvider',
	'$ionicConfigProvider',
	function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
		$ionicConfigProvider.tabs.position('top');
		$ionicConfigProvider.tabs.style('standard');

		$stateProvider
			.state('app', {
				url: '/app',
				abstract: true,
				templateUrl: 'templates/menu.html',
				controller: 'ApplicationController as appCtrl'
			})
			.state('app.categories', {
				url: '/categories',
				views: {
					'menuContent': {
						templateUrl: 'templates/categories.html',
						controller: 'CategoriesController as categoriesCtrl'
					}
				}
			})
			.state('app.show-products', {
				url: '/show-products',
				views: {
					'menuContent': {
						templateUrl: 'templates/show-products.html',
						controller: 'showProductsController as showProductsCtrl'
					}
				}
			})
			.state('app.login', {
				url: '/login',
				views: {
					'menuContent': {
						controller: 'LoginController as loginCtrl',
						templateUrl: 'templates/login.html'
					}
				}
			})
			.state('app.register', {
				url: '/register',
				views: {
					'menuContent': {
						controller: 'LoginController as loginCtrl',
						templateUrl: 'templates/register.html'
					}
				}
			})
			.state('app.change-password', {
				url: '/change-password',
				views: {
					'menuContent': {
						templateUrl: 'templates/change-password.html'
					}
				}
			})
			.state('app.notifications', {
				url: '/notifications',
				cache: false,
				views: {
					'menuContent': {
						templateUrl: 'modules/notifications/notifications.html',
						controller: 'NotificationsController as notificationsCtrl'
					}
				}
			})
            .state('app.sales', {
				url: '/sales',
				cache: false,
				views: {
					'menuContent': {
						templateUrl: 'templates/sales.html',
						controller: 'SalesController as salesCtrl'
					}
				}
			})
			.state('app.addproduct', {
				url: '/addproduct',
				cache: false,
				views: {
					'menuContent': {
						templateUrl: 'templates/add-product.html',
						controller: 'ProductsController as productsCtrl'
					}
				}
			});

		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise(function($injector, $location) {
			var state = $injector.get('$state');
			// state.go('app.company-selector', {'forceShow': false});
			state.go('app.login', {'forceShow': false});
			return $location.path();
		});
	}
]);
