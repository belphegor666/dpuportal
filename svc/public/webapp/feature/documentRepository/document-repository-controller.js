"use strict";

angular.module("app").controller("documentRepositoryController", ["$scope", "$state", "$stateParams", "$log", "repository", "$sce", "$window", function ($scope, $state, $stateParams, $log, repository, $sce, $window) {

    if($stateParams.projectId == null) {
        $state.go("welcome");
    }

    $scope.hasValidationError = false;

    $scope.user = repository.getUser();
    $scope.project = {};
    $scope.documentLink = null;
    $scope.documentRepositoryLink = null;

    $scope.project = repository.getSelectedProject();
    $scope.documentLink = $scope.project.documentUrl;
    $scope.documentRepositoryLink = $sce.trustAsResourceUrl($scope.project.documentUrl);

    $scope.saveDocumentLink = function(form) {
        if(form.$valid) {
            $scope.project.documentUrl = $scope.documentLink;
            repository.saveProject($scope.project).then(function(response) {
                $scope.documentRepositoryLink = $sce.trustAsResourceUrl($scope.documentLink);
            }, function(error) {
                alert("Error has occurred. Unable to set up document repository");
            });
        } else {
            $scope.hasValidationError = true;
        }
    };

    $scope.permittedUser = function() {
        if($scope.user.systemRole == "ADMIN" || $scope.user.email == $scope.project.productOwner) {
            return true;
        } else {
            return false;
        }
    };

    $scope.openInNewTab = function () {
        $window.open($scope.documentLink, "_blank");
    }

    $scope.back = function () {
        //$state.go("requirement-dashboard");
        window.history.back();
    };

}]);
