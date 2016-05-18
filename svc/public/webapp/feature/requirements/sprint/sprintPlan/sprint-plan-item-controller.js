"use strict";

/**
 * Manages individual sprints within a ng-repeat set
 */
angular.module('app').controller("sprintPlanItemController", ["$scope", "$log", "$state", "repository", function ($scope, $log, $state, repository) {

    // name constant - for trace and debugging
    $scope.controllerName = "sprintItemController";

    /**
     * Amend the selected sprint/
     */
    $scope.amend = function () {
        $state.go("requirements.project.sprint", {sprintId: $scope.sprint.id});

    };

    $scope.complete = function () {
        $state.go("requirements.project.sprint", {sprintId: $scope.sprint.id});

    };

    $scope.manageSprintPlans = function() {
        $state.go("sprint-stories" , {sprintId: $scope.sprint.id});
    }

    $scope.delete = function () {
            var waitingDialog;
            BootstrapDialog.confirm({
                message: 'Are you sure that you want to delete this story?',
                type: BootstrapDialog.TYPE_WARNING,
                btnOKLabel: 'Delete Story!',
                btnOKClass: 'btn-warning',
                callback: function (confirmed) {
                    if (confirmed) {
                        repository.deleteProject($scope.sprint.id).then(function () {
                            waitingDialog.close();
                        }, function (error) {
                            BootstrapDialog.alert("Error: 'An error has occurred ' + error");
                        });
                    }
                }
            })
        };
}]);

