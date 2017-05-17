app.controller("ItemListCtrl", function($scope, ItemFactory) {		// own code goes after $scope
	
	$scope.items = [];

	let getItems = () => {
		ItemFactory.getItemList().then((itemz) => {		// now inside controller, will execute when controller loads
			$scope.items = itemz;
		}).catch((error) => {
			console.log("get Error", error);
		});
	};

	getItems();

	$scope.deleteItem = (id) => {
		console.log("here i am");
		ItemFactory.deletz(id).then(() => {
			getItems();
		}).catch((error) => {
			console.log("deleteItem error", error);
		});
	};
});
