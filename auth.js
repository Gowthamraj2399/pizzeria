(function (root, factory) {
  root["auth"] = factory(root["users"]);
})(window, function (users) {
  var usersData = users.getUsers();
  var currentUser = null;
  var signup = function (username, password) {
    if (currentUser === null) {
      for (var i = 0; i < usersData.length; i++) {
        if (usersData[i].name === username) {
          return "username already exists";
        }
      }
      var newUser = {
        id: usersData.length + 1,
        name: username,
        password: password,
        userType: 0,
      };
      users.setUser(newUser);
      return "Your profile has been created successfully";
    } else {
      return "Please signout to continue";
    }
  };
  var login = function (username, password) {
    if (currentUser === null) {
      for (var i = 0; i < usersData.length; i++) {
        if (
          usersData[i].name === username &&
          usersData[i].password === password
        ) {
          currentUser = usersData[i];
        }
      }
      if (currentUser) {
        return "You are logged in";
      } else {
        return "Please check your username and password";
      }
    } else {
      return "Please signout to continue";
    }
  };

  var getCurrentUser = function () {
    return currentUser;
  };

  var logout = function () {
    if (currentUser) {
      currentUser = null;
      return "You are logged out successfully";
    } else {
      return "You are not logged in";
    }
  };
  return {
    login: login,
    signup: signup,
    getCurrentUser: getCurrentUser,
    logout: logout,
  };
});
