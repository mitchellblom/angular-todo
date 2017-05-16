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