(function() {
    angular
        .module("FormMakerApp")
        .factory("FormService", FormService);

    function UserService($rootScope) {
        var model = {
            forms: [
                {"_id": "000", "title": "Contacts", "userId": 123},
                {"_id": "010", "title": "ToDo",     "userId": 123},
                {"_id": "020", "title": "CDs",      "userId": 234},
            ]
            ,

            createFormForUser:createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            findFormById:findFormById,
            updateFormById: updateFormById,


        };
        return model;


        function createFormForUser (user) {
            var user = {
                userId: user.userId,
                _id: user._id,
                title:user.title
            };
            model.users.push(user);
            return user;
        }


        function deleteFormById(userId)
        {
            for(var a=0 ; a< $rootScope.forms.length; a++){
                if($rootScope.forms[a]._id==userId){
                    $rootScope.forms[a].slice();
                }
            }

        }




        function findAllFormsForUser(user_id)
        {
            var x=[];
            for (var a=0; a<model.forms.length(); a++)
            {
                if(a.userId=user_id){
                    x.push(model.forms[a]);
                }
            }
            return x;
        }




        function findUserByCredentials(username,password) {
            for (var u in model.users) {
                if (model.users[u].username === username &&
                    model.users[u].password === password) {
                    return model.users[u];
                }
            }
            return null;
        }

        function findFormById (username) {
            for (var u in model.forms) {
                if (model.users[u]._id === username) {
                    return model.users[u];
                }
            }
            return null;
        }

        function updateFormById (form_id,currentUser) {
            var user = findFormById (currentUser._id);
            if (user != null) {
                user._id = currentUser._id;
                user.userId = currentUser.userId;
                user.title = currentUser.title;
                return user;
            } else {
                return null;
            }
        }
    }
})();