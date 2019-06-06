/**
 * Categories controller
 */
(function() {
angular
	.module('invisionApp')

	.controller('CategoriesController', [
		'categoriesService', '$rootScope', '$scope', '$state', '$http', 'configProvider' ,
		function (categoriesSvc, $rootScope, $scope, $state, $http, configProvider) {
			'use strict';

			var vm = this;

			categoriesSvc.getCategories().then(setCategories);

			function setCategories(categories) {
				vm.categories = categories;
			}
			$scope.GoogleVisionTest = function()
			{
				var config = {
	                headers : {
	                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
						'key' : 'AIzaSyA9Xm0KqUHE1dkEx1BnxSJiam1llwrLg_4'
	                }
	      		};

	    		var data = {
	  					"requests":[
	    						{
	      							"image":
									{
	        							"content":""
									},
	      							"features":[
	        						{
	          							"type":"LABEL_DETECTION",
	          							"maxResults":10
	        						}]
								}
							]};
							console.log(data);
				$http.post("https://vision.googleapis.com/v1/images:annotate", data, config).then(function(response)
				{
					console.log(response);
				});
			}



			$scope.role_id = $rootScope.memberDetails.role_id;

			$scope.addProduct = function(){
				$state.go('app.addproduct', {}, {location: "replace", reload: true});
			}


			$scope.LogOut = function(){
				$state.go('app.login', {}, {location: "replace", reload: true});
			}


			$scope.showProducts = function(){
				$state.go('app.show-products', {}, {location: "replace", reload: true});
			}

			$scope.sales = function(){
				$state.go('app.sales',{},{location:"replace", reload: true});
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
