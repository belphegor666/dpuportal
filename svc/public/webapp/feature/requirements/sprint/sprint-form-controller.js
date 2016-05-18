"use strict";

angular.module('app').controller("sprintFormController", ["$scope", "$log", "$state", "$stateParams", "repository", function ($scope, $log, $state, $stateParams, repository) {
    $scope.hasValidationError = false;
    $scope.projectId = $stateParams.projectId;
    $scope.sprint = {};

    // get the project that the sprints belong to
    $scope.project = repository.getSelectedProject();

    if ($stateParams.sprint != null) {
        $scope.headingText = "Amend sprint";
        $scope.sprint = $stateParams.sprint;
    } else {
        $scope.headingText = "Add New Sprint";
        $scope.sprint.sprintNo = $stateParams.sprintNo;
    }

    /**
     * Save the current sprint
     */
    $scope.saveSprint = function (sprintForm) {
        $log.debug("sprintFormController: saveSprint");

        if (sprintForm.$valid && ($scope.sprint.endDate > $scope.sprint.startDate)) {
            $scope.sprint.projectId = $scope.projectId;
            $scope.hasValidationError = false;

            var waitingDialog = BootstrapDialog.show({
                message: 'Please wait - Saving Sprint'
            });

            var isOverlap = false;

            var sprintStartDate = $scope.sprint.startDate.getTime();
            var sprintEndDate = $scope.sprint.endDate.getTime();

            for(var i = 0; i < $scope.project.sprints.length; i++) {
                var startDate = $scope.project.sprints[i].startDate.getTime();
                var endDate = $scope.project.sprints[i].endDate.getTime();
                if((startDate <= sprintEndDate) && (endDate >= sprintStartDate)) {
                    isOverlap = true;
                }
            }

            //Implement in backend
            if(isOverlap == true) {
                waitingDialog.close();
                BootstrapDialog.alert({
                    title: "Error",
                    message: "This sprint will overlap with an existing sprint. Please change the dates and try again.",
                    type: BootstrapDialog.TYPE_DANGER
                });
            } else {
                repository.saveSprint($scope.sprint, $scope.projectId).then(function () {
                    waitingDialog.close();
                    BootstrapDialog.show({
                        message: 'Sprint Saved successfully',
                        type: BootstrapDialog.TYPE_SUCCESS,
                        buttons: [{
                            label: 'New Sprint',
                            cssClass: 'btn-default',
                            autospin: false,
                            action: function (dialogRef) {
                                $scope.headingText = "Add New Sprint";
                                $scope.sprint = {
                                    sprintNo : $scope.sprint.sprintNo + 1
                                };
                                $scope.$apply();
                                dialogRef.close();
                            }
                        }, {
                            label: 'OK',
                            cssClass: 'btn-success',
                            action: function (dialogRef) {
                                dialogRef.close();
                                $state.go("requirement-sprints", {requirementId: $scope.projectId});
                            }
                        }]
                    });
                }, function (error) {
                    waitingDialog.close();
                    BootstrapDialog.alert({
                        title: "Error",
                        message: error,
                        type: BootstrapDialog.TYPE_DANGER
                    });
                    $state.go("requirement-sprints", {requirementId: $scope.projectId});
                });
            }

        } else {
            $scope.hasValidationError = true;
        }
    };


    /**
     * Cancel and return to manage sprint
     */
    $scope.cancel = function () {
        $state.go("requirement-sprints", {requirementId: $scope.projectId});
    };

    // Data options for start and end date
    $scope.dateOptions = {
        formatYear: 'yyyy',
        startingDay: 1
    };

    // the display format for the dates
    $scope.dateFormat = "dd-MM-yyyy";

    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.maxDate = new Date(2020, 5, 22);

    $scope.openEndDate = function () {
        $scope.endDateOpened = true;
    };

    $scope.openStartDate = function () {
        $scope.startDateOpened = true;
    };
}]);

