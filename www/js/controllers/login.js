/**
 * Login controller
 */
var module = angular.module('invisionApp');

	module.filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace !== -1) {
                  //Also remove . and , so its gives a cleaner result.
                  if (value.charAt(lastspace-1) === '.' || value.charAt(lastspace-1) === ',') {
                    lastspace = lastspace - 1;
                  }
                  value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    });

	module.controller('LoginController', ['$ionicSideMenuDelegate','$state','$ionicHistory','$scope','$rootScope','$http','$ionicModal','moment','$window','$ionicPopup', '$cookies', 'AuthenticationService',
		function ($ionicSideMenuDelegate,$state,$ionicHistory,$scope,$rootScope,$http,$ionicModal,moment,$window,$ionicPopup, $cookies, AuthenticationService) {
			$ionicSideMenuDelegate.canDragContent(false);

			$ionicModal.fromTemplateUrl('modules/notifications/notifications.html', {
			    scope: $scope,
			    animation: 'slide-in-up'
			}).then(function(modal) {
				$scope.notifModal = modal;
			});

			$scope.notificationsLoad = function(){
				var config = {
	                headers : {
	                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
	                }
	      		}

	    		var data = {token: 'eAthaV6PzwOardacwr6ScIEHcdbCqkpB'};

	    		/*$http.post("https://www.tjcoding.co.uk/api/getnotifications", data, config).then(function(response) {
			        if (response.data.success == true) {
						$scope.notifications = response.data.notifications;

			        	angular.forEach($scope.notifications, function(value, key) {
			        		value.notif_time = (value.wait_until != null) ? moment(value.wait_until).fromNow() : moment(value.created_at).fromNow();
			        		value.charLimit = 95;
			        	});
			        } else {
			        	var alertPopup = $ionicPopup.alert({
					        title: 'Error!',
					        cssClass: 'errorIonic',
					        template: response.data.errors,
					        buttons: [{ text: 'Ok' }]
					    });
			        }
			    });
					*/
			}

			$scope.notifiModal = function() {
				$scope.notifModal.show();
			};

			$scope.notifCloseModal = function() {
				$scope.notifModal.hide();
			};

			$scope.$on('$destroy', function() {
				$scope.notifModal.remove();
			});

			$scope.expandElement = function(object) {
				object.charLimit = (object.charLimit == 95) ? object.message.length : 95;
			}

			$scope.init = function(){
				$scope.userDetails = {email: 'tom@tjcoding.co.uk', password: 'Password2134'};
				// var email = localStorage.getItem('email');
				// $scope.new_user = {email: "", password: "", password2: "", name: ""};
				// $scope.userDetails = {email: email, password: ''};
			}

			$scope.initiateLogin = function(){
				$state.go('app.categories', {}, {location: "replace", reload: true});
				// $scope.dataLoading = true;
				//
	      //      AuthenticationService.Login($scope.userDetails.email, $scope.userDetails.password, function(response) {
	      //           if(response.data.success) {
	      //      AuthenticationService.SetCredentials($scope.userDetails.email, $scope.userDetails.password, response);
				// 		$ionicHistory.nextViewOptions({disableBack: true});
				// 		} else {
				// 			$state.go('app.categories', {}, {location: "replace", reload: true});
				// 			var alertPopup = $ionicPopup.alert({
				// 					 title: 'Account Not Found!',
				// 					 cssClass: 'errorIonic',
				// 					 template: 'Please Try Again',
				// 					 buttons: [
				// 					 { text: 'Continue' }]})
				// 		}
	      //           } else {
	      //               $scope.error = response.message;
	      //               $scope.dataLoading = false;
				//
				//
	      //           }
	      //       });
			}


			$scope.createUser = function(){
				var config = {
	                headers : {
	                    'Content-Type': 'application/json;'
	                }
	      		}

	      		if($scope.new_user.password == $scope.new_user.password2){
	      			var data  = {username: $scope.new_user.forename, surname: $scope.new_user.surname, email : $scope.new_user.email, company: $scope.new_user.company, company_location: $scope.new_user.company_location, dob: $scope.new_user.dob, password : $scope.new_user.password, token: 'eAthaV6PzwOardacwr6ScIEHcdbCqkpB'};
					$http.post("https://www.tjcoding.co.uk/api/createuser", data, config).then(function(response){
						if(response.data.success == true){
							localStorage.setItem('email', response.data.email);
							$ionicHistory.nextViewOptions({disableBack: true});
							$rootScope.currentUserSignedIn = false;
							$state.go('app.login', {}, {location: "replace", reload: true});
						} else {
							var alertPopup = $ionicPopup.alert({
						       title: 'Unable To Create Account!',
						       cssClass: 'errorIonic',
						       template: response.data.errors,
						       buttons: [
						      { text: 'Ok' }]
						    });
						}
					});
	      		} else {
	      			var alertPopup = $ionicPopup.alert({
				       title: 'Unable To Create Account!',
				       cssClass: 'errorIonic',
				       template: "Passwords don't match, Please try again.",
				       buttons: [
				      { text: 'Ok' }]
				    });
	      		}
			}

	    	$scope.initiateLogOut = function(){
				AuthenticationService.ClearCredentials();

				$ionicHistory.nextViewOptions({disableBack: true});
				$state.go('app.login', {}, {location: "replace", reload: true});
			}

			$scope.backToLogin = function(){
				//$ionicHistory.backView();
				$state.go('app.login', {}, {location: "replace", reload: true});
			}
		}
	]);
