"use strict";

/**
 * Global controller
 */
angular.module("app").controller("loginController", ["$scope", "$state", "$log", "repository", "securityManager", function ($scope, $state, $log, repository, securityManager) {
    $scope.hasValidationError = false;
    $scope.hasAuthenticationError = false;

    /**
     *  Goes to the register page
     */
    $scope.register = function () {
        $state.go("register");
    };

    /**
     * Perform login
     * @param form The login form
     */
    $scope.login = function (form) {

        $scope.hasValidationError = false;
        $scope.hasAuthenticationError = false;

        if (form.$valid) {
            // Pass login process to the securityManager then go to dashboard on success, or show error message on error
            securityManager.login($scope.credentials.username, $scope.credentials.password).then(
                function (response) {
                    $log.debug("Login successful");
                    //If password reset key exists, go to change password page. Otherwise get users preferences and go to that page. Otherwise go to requirements dashboard
                    if(response.resetPasswordKey != null) {
                        $state.go("login-change-password", {homepage: response.homePagePreference});
                    } else if(response.homePagePreference == "REQUIREMENT") {
                        $state.go("requirement-dashboard");
                    } else if(response.homePagePreference == "DEVELOPER") {
                        $state.go("home.developer.assigned-projects");
                    } else if(response.homePagePreference == "PROJECT") {
                        $state.go("home.join-project");
                    } else if(response.homePagePreference == "EXECUTIVE") {
                        $state.go("home.executive-dashboard");
                    } else {
                        $state.go("welcome.home");
                    }
                }, function (response) {
                    $log.debug("Login failed - Unrecognised User");
                    $scope.hasAuthenticationError = true;
                }
            );
        } else {
            // Show error message when username and/or password is undefined
            $scope.hasValidationError = true;
        }
    };

    $scope.forgotPassword = function() {

        $state.go("forgot-password");

    };
}]);

