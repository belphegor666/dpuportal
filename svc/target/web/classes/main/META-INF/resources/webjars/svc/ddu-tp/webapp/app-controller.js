"use strict";

/**
 * Global controller at index page
 */
angular.module('app').controller("appController", ["$scope", "$state", "$log", function ($scope, $state, $log) {
    $scope.isAtLogin = function() {
        return $state.is("login") || $state.is("forgot-password");
    }

    $scope.isAtRegister = function() {
        return $state.is("register") || $state.is("register-terms-and-conditions");
    }
}]);
