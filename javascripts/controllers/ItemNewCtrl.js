app.controller("ItemNewCtrl", function($http, $q, $scope, FIREBASE_CONFIG){

	$scope.addNewItem = () => {
		$scope.newTask.isCompleted = false;
		console.log("clicked add");
		postNewItem($scope.newTask).then(() => {
			$scope.newTask = {};
			// switch views
		}).catch((error) => {
			console.log(error);
		});
	};

});