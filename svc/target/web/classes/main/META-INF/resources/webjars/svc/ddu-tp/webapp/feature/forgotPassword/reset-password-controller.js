"use strict";

/**
 * Global controller
 */
angular.module("app").controller("resetPasswordController", ["$scope", "$state", "$log", "$stateParams", "dal", function ($scope, $state, $log, $stateParams, dal) {

    dal.resetPassword($stateParams.key).then(
        function (success) {
            $scope.message = "Your password has been reset and a temporary password will be sent to your email.\nPlease remember to change your password when you login.";
        }, function (error) {
            $scope.message = "An error has occurred - reset key is not valid.";
            $scope.hasError = true;
        }
    );

    $scope.goToLogin = function() {
        $state.go("login");
    };
}]);
