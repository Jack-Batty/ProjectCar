/**
 * Categories controller
 */
(function() {
angular.module('invisionApp')
	.controller('ProductsController', [
		'$rootScope', '$scope', '$state', "$http", '$ionicPopup',
		function ($rootScope, $scope, $state, $http, $ionicPopup) {

            $scope.product = {};

			$scope.categoriesPage = function(){
				$state.go('app.categories', {}, {location: "replace", reload: true});
			}

			$scope.BarcodeScan = function()
			{

				window.plugins.GMVBarcodeScanner.scan({}, function(err, result) {

    			//Handle Errors
    			if(err) return;

    			//Do something with the data.
    			//alert(result);
                $scope.product.serialnumber = result;
                $scope.$apply();

				});

			}

            $scope.submitProduct = function(){
                console.log($scope.product);

                var config = {
	                headers : {
	                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
	                }
	      		};

	    		var data = {
                    name: $scope.product.name,
                    serial_number: $scope.product.serialnumber,
                    brand: $scope.product.brand,
                    price: $scope.product.price,
                    quantity: $scope.product.quantity,
                    size: $scope.product.size,
                    strength: $scope.product.strength,
                    token: 'eAthaV6PzwOardacwr6ScIEHcdbCqkpB'
                };
                $http.post("https://www.tjcoding.co.uk/api/apptest/add_product", data, config).then(function(response) {
			        if (response.data.success == true) {
                        var alertPopup = $ionicPopup.alert({
                           title: 'Record Added!',
                           cssClass: 'successIonic',
                           template: "Your record has been added to the database.",
                           buttons: [
                          { text: 'Ok' }]
                        });
                        $state.go('app.categories', {}, {location: "replace", reload: true});
                    }
                    else {
                    }
                });
            }


		}
	]);

})();
