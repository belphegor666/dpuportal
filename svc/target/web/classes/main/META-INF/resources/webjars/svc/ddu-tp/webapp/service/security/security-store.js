//Stores the security data in memory
angular.module("securityManager").service("securityStore", function() {

    var securityToken;
    var userCredentials;
    var subject;
    var role;

    this.getToken = function () {
        return securityToken;
    };

    this.setToken = function (token) {
        securityToken = token;
    };

    this.getUserCredentials = function () {
        return userCredentials;
    };

    this.setUserCredentials = function (credentials) {
        userCredentials = credentials;
    };

    this.getSubject = function () {
        return subject;
    };

    this.setSubject = function (username) {
        subject = username;
    };

    this.getRole = function () {
        return role;
    };

    this.setRole = function (userRole) {
        role = userRole;
    };

    this.clear = function () {
        securityToken = null;
        userCredentials = null;
        subject = null;
        role = null;
    };
});