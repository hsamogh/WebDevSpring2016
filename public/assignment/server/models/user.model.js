/**
 * Created by Amogh on 3/18/2016.
 */

var f = require("./user.mock.json");

module.exports=function(){


    var api ={
        createNewUser:createNewUser,
        updateUser:updateUser,
        deleteUser:deleteUser,
        findUserByUsername:findUserByUsername,
        findUserByCredentials:findUserByCredentials,
        findById:findById,
        findAll:findAll
    }

    return api;

    function createNewUser(user){
        var user1={
            "_id": f[f.length-1]._id+10,
            "firstName":user.firstName,
            "lastName":user.lastName,
            "password":user.password,
            "email":user.email,
            "roles":user.roles

        }
        f.push(user1);
        return user1;
    }

    function findById(userId){
        for(var i in f){
            if(f[i]._id==userId){
                return f[i];
            }
        }
        return null;
    }

    function updateUser(userId,editedUser){
        var isPresent= findById(userId);
        if(isPresent){
            isPresent.firstName=editedUser.firstName;
            isPresent.lastName=editedUser.lastName;
            isPresent.password=editedUser.password;
            isPresent.email=editedUser.email;
            isPresent.roles=editedUser.roles;
            return isPresent;
        }
        else{
            return null;
        }
    }

    function findUserByCredentials(username,password){
        for(var i in f){
            if(f[i].username==username && f[i].password==password){
                return f[i];
            }
        }
        return null;
    }
    function deleteUser(userId){
        var userInfo=findById(userId);
        if(userInfo){
            f.splice(f.indexOf(userInfo),1);
        }
        return null;
    }
    function findUserByUsername(userName){
        for (var i in f){
            if (f[i].username==userName){
                return f[i];
            }
        }
        return null;
    }

    function findAll(){
        return f;
    }
}