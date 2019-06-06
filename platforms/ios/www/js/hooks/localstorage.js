angular.module('invisionApp').factory("localstorage", function($localStorage,
    $sessionStorage) {
    $scope.$storage = $localStorage;
});