(function (root, factory){
    root['users'] = factory()
}(window, function(){
    var USERS = [
        {
            id: 1,
            name: 'gowtham',
            password: 'hello',
            userType: 0
        }, {
            id: 1,
            name: 'admin',
            password: 'admin',
            userType: 1
        }
    ]
    var getUsers = function() {
        return USERS
    }

    var setUser = function(user) {
        if(user) {
            USERS.push(user);
        }
    }

    return {
        getUsers: getUsers,
        setUser: setUser,
    }
}))