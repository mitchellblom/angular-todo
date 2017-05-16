app.controller("ItemListCtrl", function($scope, ItemFactory) {		// own code goes after $scope
	
	$scope.items = [];

		ItemFactory.getItemList().then((itemz) => {		// now inside controller, will execute when controller loads
			$scope.items = itemz;
		}).catch((error) => {
			console.log("get Error", error);
		});
});
