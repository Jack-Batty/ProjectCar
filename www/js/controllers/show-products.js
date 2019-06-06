
(function() {
angular
	.module('invisionApp')

	.controller('showProductsController', [
		'categoriesService', '$rootScope', '$scope', '$state', '$http', 'configProvider' ,
		function (categoriesSvc, $rootScope, $scope, $state, $http, configProvider) {
			'use strict';

			var vm = this;

			categoriesSvc.getCategories().then(setCategories);

            $scope.SearchText = "";

            $scope.categoriesPage = function(){
				$state.go('app.categories', {}, {location: "replace", reload: true});
			}

            $scope.BarcodeScan = function()
			{

				window.plugins.GMVBarcodeScanner.scan({}, function(err, result) {

    			if(err) return;

                $scope.SearchText = result;
                $scope.$apply();

				});

			}

			function setCategories(categories) {
				vm.categories = categories;
			}

			$scope.getProducts = function()
            {

	    		var data = {
                    token: 'eAthaV6PzwOardacwr6ScIEHcdbCqkpB'
                };
                // alert("Function Executed");
                $http.post("https://www.tjcoding.co.uk/api/apptest/get_product", data, configProvider.httpConfig).then(function(response) {
			        //if (response.data.success == true) {
                        //alert(JSON.stringify(response.data));
                        $scope.products = response.data;
                        // alert(JSON.stringify($scope.products[0]));
                    //}
                    //else {
                    //    alert();
                    //}
					// alert("6969");
                });
            }

		}
	]);

})();
