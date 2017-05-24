app.controller("AuthCtrl", function($location, $rootScope, $scope, AuthFactory, UserFactory) {
	$scope.alerts = [];
	$scope.auth = {
		email: "a@a.com",
		password: "123456",
	};

// location.path returns current route
	if ($location.path() === '/logout') {
		AuthFactory.logout();
		$rootScope.user = {};	// clear this so it doesn't stay there
		$location.url('/auth');
	}

	let logMeIn = () => {
		AuthFactory.authenticate($scope.auth).then((userCreds) => {
			return UserFactory.getUser(userCreds.uid);
		}, (error) => {
			$scope.alerts.push({msg: error.message});
			console.log("authenticate error", error);
		}).then((user) => {
			$rootScope.user = user;
			$location.url('/items/list');
		}).catch((error) => {
			console.log("getUser error", error);
		});
	};

	$scope.registerUser = () => {
		AuthFactory.registerWithEmail($scope.auth).then((didRegister) => {
			console.log("didRegister", didRegister);
			$scope.auth.uid = didRegister.uid;		//just added .uid to $scope.auth before passing it into UserFactory.addUser
			return UserFactory.addUser($scope.auth);					// putting a return here allows a .then later on
		}, (error) => {						// alternate catch syntax
			console.log("registerWithEmail error", error);
		}).then((registerComplete) => {
			logMeIn();
		}).catch(() => {
			console.log("addUser error", error);
		});
	};

	$scope.loginUser = () => {
		logMeIn();
	};

});