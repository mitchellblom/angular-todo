app.run(function(FIREBASE_CONFIG) {
	firebase.initializeApp(FIREBASE_CONFIG); 
});																							// config runs once, run runs when any controller changes

app.config(function($routeProvider){
    $routeProvider
        .when('/items/list', {
            templateUrl: 'partials/item-list.html',
            controller: 'ItemListCtrl' // not a route
        })
        .when('/items/new', {
            templateUrl: 'partials/item-new.html',
            controller: 'ItemNewCtrl'
        })
        .when('item/view/:id', {
            templateUrl: 'partials/item-view.html',
            controller: 'ItemViewCtrl'
        })
        .when('item/edit/:id', {
            templateUrl: 'partials/item-new.html',
            controller: 'ItemEditCtrl'
        })
        .otherwise('items/list');
});

app.controller("NavCtrl", ($scope) => {
    $scope.cat = "Meow";
    $scope.navItems= [{name: "Logout"}, {name: "All Items"}, {name: "New Item"}];
});

app.controller("ItemListCtrl", function(){
    console.log("inside ItemListCtrl");
});

app.controller("ItemNewCtrl", function(){
    console.log("inside ItemNewCtrl");
});

app.controller("ItemViewCtrl", function(){
    console.log("inside ItemViewCtrl");
});

app.controller("ItemEditCtrl", function(){
    console.log("inside ItemEditCtrl");
});

app.controller("ItemCtrl", function($http, $q, $scope, FIREBASE_CONFIG) {	// not mine first, then mine, both alphabetized
	$scope.dog = "Woof!";
	$scope.showListView = true;
	$scope.items = [];

	$scope.newItem = () => {
		$scope.showListView = false;
	};

	$scope.allItems = () => {
		$scope.showListView = true;
	};

	let getItemList = () => {
		let itemz = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/items.json`)
				.then((fbItems) => {
					var itemCollection = fbItems.data;
         			Object.keys(itemCollection).forEach((key) => {
            		itemCollection[key].id=key;
           			itemz.push(itemCollection[key]);
          	});
          	resolve(itemz);
				})
				.catch((error) => {
					reject(error);
				});
		});
	};

	let getItems = () => {
		getItemList().then((itemz) => {
			$scope.items = itemz;
		}).catch((error) => {
			console.log("get Error", error);
		});
	};

	getItems();

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
			$scope.showListView = true;
			getItems();
		}).catch((error) => {
			console.log(error);
		});
	};




});