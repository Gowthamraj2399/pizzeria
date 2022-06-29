(function (root, factory){
    root['users'] = factory()
}(window, function(){
    var USERS = [
        {
            id: 1,
            name: 'gowtham',
            password: 'hello',
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