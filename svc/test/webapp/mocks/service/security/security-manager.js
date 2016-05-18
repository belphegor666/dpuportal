"use strict";

angular.module("securityManager", []).service("securityManager", ["$q", "securityStore",
    function ($q, securityStore) {

        this.login = function (username, password) {
            var userDetails = {role: "USER"};
            var deferred = $q.defer();
            deferred.resolve(userDetails);
            return deferred.promise;
        };

        this.logout = function () {
            //Doesn't need to do anything
        };
    }
]);
