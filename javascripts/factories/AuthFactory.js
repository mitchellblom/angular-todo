app.factory("AuthFactory", function($q, $http, $rootScope, FIREBASE_CONFIG) {  
// q for promises, http for requests, rootScope for ____, then constant for all http things
  let currentUserData = null; // tied to authenticateGoogle

  //Firebase: Determine if user is authenticated.
  let isAuthenticated = () => {
    return firebase.auth().currentUser ? true : false; // ? means ternary aka an if else in one line
    // if this is true than do what's before : otherwise do what's after :
  };

  //Firebase: Return email, UID for user that is currently logged in.
  let getUser = () => {
    return firebase.auth().currentUser;
  };

  // Kills browser cookie with firebase credentials
  let logout = () => {
    firebase.auth().signOut();
  };

  //Firebase: Use input credentials to authenticate user.
  let authenticate = (credentials) => {
    return $q((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((resultz) => {
        resolve(resultz);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  //Firebase: Register a new user with email and password
  let registerWithEmail = (user) => {
    return $q((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then((resultz) => {
        resolve(resultz);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  //Firebase: GOOGLE - Use input credentials to authenticate user.
  let authenticateGoogle = () => {
    return $q((resolve, reject) => {
      var provider = new firebase.auth.GoogleAuthProvider(); // GoogleAuthProvider changes depending on what login used
      firebase.auth().signInWithPopup(provider)
        .then((authData) => {
          currentUserData = authData.user;
          resolve(currentUserData);
        }).catch((error) => {
          reject(error);
        });
    });
  };

  return { 
    isAuthenticated:isAuthenticated, 
    getUser:getUser, 
    logout:logout,
    registerWithEmail:registerWithEmail,
    authenticate:authenticate, 
    authenticateGoogle:authenticateGoogle 
  };

});