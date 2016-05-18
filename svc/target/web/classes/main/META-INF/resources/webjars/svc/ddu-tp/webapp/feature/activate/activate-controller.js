"use strict";

/**
 * Global controller
 */
angular.module("app").controller("activateController", ["$scope", "$state", "$log", "$stateParams", "dal", function ($scope, $state, $log, $stateParams, dal) {

    // Sends the key in the e-mail activation link to the DAL activate function.
    dal.activate($stateParams.key).then(
        function (success) {
            $scope.message = "Your email has been verified and your account activated. Please log in.";
        }, function (error) {
            $scope.message = "An error has occurred - activation key is not valid.";
            $scope.hasError = true;
        }
    );

    $scope.goToLogin = function() {
        $state.go("login");
    };
}]);
