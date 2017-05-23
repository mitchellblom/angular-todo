app.controller("ItemViewCtrl", function($routeParams, $scope, ItemFactory) {		// $routeParams comes from ng-route
    $scope.selectedItem = {};

    ItemFactory.getSingleItem($routeParams.id).then((results) => {
    	$scope.selectedItem = results.data;
    }).catch((error) => {
    	console.log("getSingleItem error", error);
    });

});