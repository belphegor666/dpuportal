"use strict";

/**
 * Global controller
 */
angular.module("app").controller("forgotPasswordController", ["$scope", "$state", "$log", "dal", function ($scope, $state, $log, dal) {

    $scope.hasValidationError = false;

    $scope.forgotPassword = function(form) {
        if(form.$valid) {
            dal.forgotPassword($scope.credentials.email).then(
                function(success) {
                    BootstrapDialog.show({
                        message: 'If the email you entered is registered, it will be sent a temporary password.\nPlease change your password once you have logged in.',
                        type: BootstrapDialog.TYPE_SUCCESS,
                        buttons: [{
                            label: 'OK',
                            cssClass: 'btn-success',
                            action: function (dialogRef) {
                                dialogRef.close();
                                $state.go("login");
                            }
                        }]
                    });
                }, function(error) {
                    $log.error("Forgot password: " + error);
                    BootstrapDialog.show({
                        title: "Unable to reset your password",
                        message: error,
                        type: BootstrapDialog.TYPE_DANGER,
                        buttons: [{
                            label: 'OK',
                            cssClass: 'btn-default',
                            action: function (dialogRef) {
                                dialogRef.close();
                                $state.go("login");
                            }
                        }]
                    });
                });
        } else {
            $scope.hasValidationError = true;
        }

    };

    $scope.back = function() {
        $state.go("login");
    };

}]);

