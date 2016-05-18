"use strict";

angular.module("securityManager", []).service("securityManager", ["$q", "$rootScope", "$location", "$log", "$http", "securityStore", "repository",
    function ($q, $rootScope, $location, $log, $http, securityStore, repository) {

        this.login = function (username, password) {

            var userCredentials = {
                username: username,
                password: password
            };

            var deferred = $q.defer();

            try {
                //Send user details to backend for login
                $http.post('/api/account/login', userCredentials).then(function(successResponse) {
                    //Store the user email, authentication token and role that is in the response
                    securityStore.setSubject(successResponse.data.subject);
                    securityStore.setToken(successResponse.data.authToken);
                    securityStore.setRole(successResponse.data.role);
                    repository.setUser(successResponse.data);
                    deferred.resolve(successResponse.data);
                }, function(errorResponse) {
                    deferred.reject(errorResponse.data);
                });
            } catch (e) {
                deferred.reject(e);
            }
            return deferred.promise;
        };

        this.logout = function() {
            securityStore.clear();
            repository.clearProjects();
            repository.clearUser();
        };

    }
]).run(['$rootScope', 'securityStore', '$log', '$state', function($rootScope, securityStore, $log, $state){
    // When the state is changed. Note that this is in the .run since all it does it setup a listener so it only needs to be run once, and needed for initial state so it can't be in the service
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

        //Prevents changing to same page (May not work when default action is refresh on same url)
        if (toState.name == fromState.name) {
            event.preventDefault();
            return;
        }

        var hasAuthenticated = securityStore.getToken() ? true : false;

        // loginState is basically the pre-authentication pages
        var loginState = (toState.name === "login") || (toState.name === "register") || (toState.name === "forgot-password") || (toState.name === "reset-password") || (toState.name === "register-terms-and-conditions") || (toState.name === "activate");

        // Not authenticated, but not on a pre-authentication page, else authenticated but on a pre-authentication page
        if (!hasAuthenticated && !loginState) {
            $log.debug("Unauthenticated - Prevented navigation");
            // Prevent state change attempt
            event.preventDefault();
            $state.go("login");
        } else if (hasAuthenticated && loginState) {
            $log.debug("User has been authenticated - Prevented navigation to login");
            //Prevent state change attempt
            event.preventDefault();
        }
    });
}]);





