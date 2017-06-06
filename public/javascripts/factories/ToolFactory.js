app.factory("ToolFactory", function($http, $q, FIREBASE_CONFIG) {

	let getToolList = (itemId) => {
		let tools = [];
		console.log("here");
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/tools.json?orderBy="itemId"&equalTo="${itemId}"`)
        .then((fbTools) => {
            var toolCollection = fbTools.data;
            if(toolCollection.length !== null) {
            Object.keys(toolCollection).forEach((key) => {
                toolCollection[key].id = key;
                tools.push(toolCollection[key]);
            });
          }
            resolve(tools);
        })
        .catch((error) => {
            reject(error);
        });
		});
	};

	return {
      getToolList:getToolList
  };

});