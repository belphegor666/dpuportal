"use strict";

/**
 * Manages individual requirements within a ng-repeat set
 */
angular.module('app').controller("requirementItemController", ["$scope", "$log", "$state", "repository", function ($scope, $log, $state, repository) {

    // name constant - for trace and debugging
    $scope.controllerName = "requirementItemController";

    $scope.delete = function () {
        var waitingDialog;
        BootstrapDialog.confirm({
            message: 'Are you sure that you want to cancel this requirement?',
            type: BootstrapDialog.TYPE_WARNING,
            btnOKLabel: 'Cancel Requirement!',
            btnOKClass: 'btn-warning',
            callback: function (confirmed) {
                if (confirmed) {
                    waitingDialog = BootstrapDialog.show({
                        message: 'Please wait - Cancelling Requirement'
                    });
                    repository.deleteProject($scope.requirement).then(function () {
                        waitingDialog.close();
                    }, function (error) {
                        BootstrapDialog.alert("Error: 'An error has occurred ' + error");
                    });
                }
            }
        })
    };

    /**
     * Amend the selected requirement/
     */
    $scope.amend = function () {
        goToState("requirement-edit");
    };

    $scope.manageSprints = function() {
        goToState("requirement-sprints");
    }

    $scope.manageDocumentRepository = function() {
        goToState("requirement-documentRepository")
    }

    var goToState = function(stateName) {
        if($scope.requirement != undefined){
            repository.setSelectedProject($scope.requirement);
        } else {repository.setSelectedProject($scope.project)}
        if($state.current.name == "requirement-dashboard") {
            repository.setPreviousBaseState("requirement-dashboard");
            $state.go(stateName, {requirementId: $scope.requirement.id, projectId: $scope.requirement.id});
        } else if($state.current.name == "home.executive-dashboard") {
            repository.setPreviousBaseState("home.executive-dashboard");
            $state.go(stateName, {requirementId: $scope.requirement.id, projectId: $scope.requirement.id});
        } else if($state.current.name == "teams.home") {
            repository.setPreviousBaseState("teams.home");
            $state.go(stateName, {requirementId: $scope.project.id, projectId: $scope.project.id});
        }
    }

}]);

