app.controller("AuthCtrl", function($routeParams, $scope, AuthFactory, UserFactory) {
	$scope.auth = {};

	$scope.registerUser = () => {
		//new auth
		//add username
		//login
		AuthFactory.registerWithEmail($scope.auth).then((didRegister) => {
			console.log("didRegister", didRegister);
			$scope.auth.uid = didRegister.uid;		//just added .uid to $scope.auth before passing it into UserFactory.addUser
			return UserFactory.addUser($scope.auth);					// putting a return here allows a .then later on
		}, (error) => {						// alternate catch syntax
			console.log("registerWithEmail error", error);
		}).then((registerComplete) => {
			console.log("registerComplete", registerComplete);
		}).catch(() => {
			console.log("addUser error", error);
		});
	};

	$scope.loginUser = () => {

	};

});