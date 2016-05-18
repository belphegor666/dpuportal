"use strict";

/**
 *
 */
angular.module('app').controller("registerController", ["$scope", "$state", "$stateParams", "$log", "dal", function ($scope, $state, $stateParams, $log, dal) {

    //Init
    $scope.hasValidationError = false;
    $scope.error = false;
    $scope.registerError = false;

    //Prepare the scope to store user inputs
    if($stateParams.credentials == null) {
        $scope.credentials = {};
    } else {
        $scope.credentials = $stateParams.credentials;
        $scope.confirmEmail = $stateParams.confirmEmail;
        $scope.confirmPassword = $stateParams.confirmPassword;
    }

    //Set up the dataType patterns for use
    $scope.$$dataType = {
        telephone : $$dataType.TELEPHONE,
        email : $$dataType.EMAIL,
        password : $$dataType.PASSWORD
    };

    // Get the titles from the refdata to populate the "Title" drop-down selector
    $scope.titles = {
        mr : $$refdata.TITLE.MR,
        mrs : $$refdata.TITLE.MRS,
        miss : $$refdata.TITLE.MISS,
        ms : $$refdata.TITLE.MS
    }

    // Set the initial value of the "Title" drop-down (note: access the property using its name as a string)
    $scope.credentials.title = $scope.titles["mr"];

    $scope.formatTelephone = function () {
        //Format telephone to match digits only
        if($scope.credentials.telephone != undefined) {
            $scope.credentials.telephone = $scope.credentials.telephone.replace(/[^0-9]/g, "").trim();
        }
    };

    $scope.cancel = function () {
        $state.go("login");
    };

    /**
     *
     * @param form The registration form
     */
    $scope.register = function (form) {
        if (form.$valid) {
            dal.register($scope.credentials).then(function(success) {
                BootstrapDialog.show({
                    message: 'Registration is successful. A validation link has been sent to your email',
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
                $log.error("Register: " + error);

                BootstrapDialog.show({
                    title: 'Registration is unsuccessful.',
                    message: error,
                    type: BootstrapDialog.TYPE_DANGER,
                    buttons: dialogButtons(error)
                });
            });
        } else {
            $scope.hasValidationError = true;
        }
    }

    var dialogButtons = function(error) {
        if(error == "User already exists and cannot be registered again. Please login.") {
            return [{
                label: 'Go to login',
                cssClass: 'btn-default',
                action: function (dialogRef) {
                    dialogRef.close();
                    $state.go("login");
                }
            }];
        } else {
             return [{
                label: 'OK',
                cssClass: 'btn-default',
                action: function (dialogRef) {
                    dialogRef.close();
                }
            }];
        }
    };

    $scope.showTermsAndConditions = function () {
        $state.go('register-terms-and-conditions', {credentials: $scope.credentials, confirmEmail: $scope.confirmEmail, confirmPassword: $scope.confirmPassword});
    };

}]);

