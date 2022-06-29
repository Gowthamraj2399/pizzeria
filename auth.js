
(function (root, factory){
    root['auth'] = factory(root['users'])
}(window, function(users) {
    var usersData = users.getUsers();
    var currentUser = null;
    var signup = function(username, password) {
        for(var i = 0; i<usersData.length; i++) {
            if(usersData[i].name === username)  {
                return 'username already exists'
            }
        }
        var newUser =  {
            id: usersData.length + 1,
            name: username,
            password: password,
        }
        users.setUser(newUser);
        return 'Your profile has been created successfully';
    }
    var login = function(username, password) {
        for(var i = 0; i<usersData.length; i++) {
            if(usersData[i].name === username && usersData[i].password === password)  {
                currentUser = usersData[i]
            }
        }
        if(currentUser){
            return 'You are logged in';
        } else {
            return 'Please check your username and password';
        }
    }

    var getCurrentUser = function() {
        return currentUser;
    }

    var logout = function() {
        if(currentUser) {
            currentUser = null;
            return 'You are logged out successfully';
        } else {
            return 'You are not logged in';
        }
    }
    return {
        login: login,
        signup: signup,
        getCurrentUser: getCurrentUser,
        logout: logout
    }
    
}))