/**
 * Categories controller
 */
(function() {
angular
	.module('invisionApp')

	.controller('SalesController', [
		'categoriesService', '$rootScope', '$scope', '$state', '$http', 'configProvider', '$ionicPopup' ,
		function (categoriesSvc, $rootScope, $scope, $state, $http, configProvider, $ionicPopup) {
			'use strict';

			var vm = this;

			categoriesSvc.getCategories().then(setCategories);

            $scope.SearchText = "";

            $scope.categoriesPage = function(){
				$state.go('app.categories', {}, {location: "replace", reload: true});
			}


			$scope.StartSale = function(serialnumber, quantity){
				$scope.data = {};

				var myPopup = $ionicPopup.show({
				    template: '<input type="number" ng-model="data.qty">',
				    title: 'Enter the quantity of the product',
				    subTitle: 'Please use numeric value',
				    scope: $scope,
				    buttons: [
				      { text: 'Cancel' },
				      {
				        text: '<b>Submit</b>',
				        type: 'button-positive',
				        onTap: function(e) {
				          if (!$scope.data.qty) {
				            e.preventDefault();
				          } else {
				            return $scope.data.qty;
				          }
				        }
				      }
				    ]
				  });

				  myPopup.then(function(res) {
					  if(Number(quantity) >= Number(res)){
						  var res = Number(quantity) - Number(res);
						var data = {
							serial_number: serialnumber,
							qty: res,
							token: 'eAthaV6PzwOardacwr6ScIEHcdbCqkpB'
						};

						$http.post("https://www.tjcoding.co.uk/api/apptest/update_product", data, configProvider.httpConfig).then(function(response) {
							$scope.products = response.data;
						});
					} else {
						var alertPopup = $ionicPopup.alert({
							title: 'Error!',
							template: 'Insufficient Stock'
						});
					}
				  });



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
