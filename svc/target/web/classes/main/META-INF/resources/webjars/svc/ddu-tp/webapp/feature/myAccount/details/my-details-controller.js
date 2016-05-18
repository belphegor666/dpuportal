"use strict";

angular.module("app").controller("myDetailsController", ["$scope", "$state", "$stateParams", "$log", "repository", function ($scope, $state, $stateParams, $log, repository) {

    $scope.hasValidationError = false;
    $scope.credentials = repository.getUser();

    $scope.saveUserDetails = function(form) {

        if(form.$valid) {
            if($scope.credentials.twitterUrl == "") {
                $scope.credentials.twitterUrl = null;
            }
            if($scope.credentials.linkedInUrl == "") {
                $scope.credentials.linkedInUrl = null;
            }
            repository.editAccountDetails($scope.credentials).then(function(success) {
                BootstrapDialog.show({
                    message: 'Your Account Details have been successfully changed',
                    type: BootstrapDialog.TYPE_SUCCESS,
                    buttons: [{
                        label: 'OK',
                        cssClass: 'btn-success',
                        action: function (dialogRef) {
                            dialogRef.close();
                        }
                    }]
                });
            }, function(error) {
                BootstrapDialog.show({
                    message: 'Unable to change account details. Please try again later.',
                    type: BootstrapDialog.TYPE_DANGER,
                    buttons: [{
                        label: 'OK',
                        cssClass: 'btn-default',
                        action: function (dialogRef) {
                            dialogRef.close();
                        }
                    }]
                });
            });
        } else {
            $scope.hasValidationError = true;
        }
    }

}]);
