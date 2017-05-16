app.controller("ItemCtrl", function($http, $q, $scope, FIREBASE_CONFIG) {	// not mine first, then mine, both alphabetized
	$scope.items = [];

	let postNewItem = (newItem) => {
		return $q((resolve, reject) => {
			$http.post(`${FIREBASE_CONFIG.databaseURL}/items.json`, JSON.stringify(newItem))	// where, what to post
				.then((resultz) => {
					resolve(resultz);
				}).catch((error) => {
					reject(error);
				});
		});
	};

	$scope.addNewItem = () => {
		$scope.newTask.isCompleted = false;
		console.log("clicked add");
		postNewItem($scope.newTask).then(() => {
			$scope.newTask = {};
			getItems();
		}).catch((error) => {
			console.log(error);
		});
	};




});