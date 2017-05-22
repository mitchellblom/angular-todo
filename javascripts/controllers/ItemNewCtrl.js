app.controller("ItemNewCtrl", function($http, $location, $q, $scope, FIREBASE_CONFIG, ItemFactory){

	$scope.addNewItem = () => {
		$scope.newTask.isCompleted = false;
		ItemFactory.postNewItem($scope.newTask).then(() => {
			$scope.newTask = {};
			$location.url("/items/list"); // only need #!/ beforehand if it's an anchor tag
		}).catch((error) => {
			console.log(error);
		});
	};

});