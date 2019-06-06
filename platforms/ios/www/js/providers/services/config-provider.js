
angular.module('invisionApp')
.factory('configProvider',
    ['Base64', '$http', '$cookieStore', '$rootScope', '$timeout', '$ionicPopup', '$state',
    function (Base64, $http, $cookieStore, $rootScope, $timeout, $ionicPopup, $state) {
        var service = {};

        service.httpConfig = function (){
            return {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };
        }


        return service;
    }]);
