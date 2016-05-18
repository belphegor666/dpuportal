"use strict";

/**
 * Sprint Management Controller - this manages the default Sprint page that shows all the sprints for the project
 */
angular.module('app').controller("sprintManageController", ["$scope", "$state", "$stateParams", "$log", "repository", "$uibModal", function ($scope, $state, $stateParams, $log, repository, $uibModal) {
    // Constant - for trace and debug
    $scope.controllerName = "sprintManageController";

    repository.getUser();

    $scope.joined = false;

    $scope.projectId = $stateParams.requirementId;

    $scope.project = repository.getSelectedProject();

    // get the sprints
    repository.getSprintsForProject($scope.projectId).then(function (result) {
        $log.debug("sprintManageController: Loading sprints");
        $scope.sprints = result;

        var userId = repository.getUserId();

        var today = new Date();
        today.setHours(0,0,0,0);

        $scope.currentSprint = _.find($scope.sprints, function(sprint) {
            return (sprint.startDate.getTime() <= today.getTime() && sprint.endDate.getTime() >= today.getTime());
        });

        if($scope.currentSprint) {
            _.find($scope.currentSprint.members, function(member) {
                $scope.joined = (member.id == userId);
            });
        }

        //Add sprints to project
        $scope.project.sprints = $scope.sprints;

    }, function (error) {
        $scope.errorMessage = error;
    });


    $scope.addSprint = function () {
        $state.go("requirement-sprints-edit", {projectId: $scope.projectId, sprintNo: ($scope.sprints.length + 1)});
    };

    $scope.amendSprint = function(sprint){
        $state.go("requirement-sprints-edit", {projectId: $scope.projectId, sprintId: sprint.sprintId, sprint: sprint});
    };

    $scope.manageSprintPlans = function(sprint) {
        $state.go("home.sprint-stories" , {projectId: $scope.projectId, sprintId: sprint.sprintId});
    };

    $scope.$on('$stateChangeSuccess', function(){
        $scope.loaded = true;
    });

    $scope.joinProject = function(sprint) {
        $uibModal.open({
            templateUrl: 'feature/joinProject/join-sprint-dialog.html',
            controller: 'joinSprintDialogController'
        }).result.then(function(result) {

            repository.addMemberToSprint($scope.project, sprint, result).then(function() {

                $scope.joined = true;

                BootstrapDialog.show({
                    message: 'You have successfully joined the project',
                    type: BootstrapDialog.TYPE_SUCCESS,
                    buttons: [{
                        label: 'OK',
                        cssClass: 'btn-success',
                        action: function (dialogRef) {
                            dialogRef.close();
                        }
                    }]
                });
            }, function (error) {
                $log.error("Join Sprint: " + error);
                BootstrapDialog.show({
                    title: error,
                    message: 'Unable to join project. ' + error,
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
        });
    };

    $scope.leaveProject = function(sprint) {

        repository.removeMemberFromSprint($scope.project.id, sprint).then(function() {
            $scope.joined = false;

            BootstrapDialog.show({
                message: 'You have successfully left the project',
                type: BootstrapDialog.TYPE_SUCCESS,
                buttons: [{
                    label: 'OK',
                    cssClass: 'btn-success',
                    action: function (dialogRef) {
                        dialogRef.close();
                    }
                }]
            });
        }, function (error) {
            $log.error("Leave Sprint: " + error);
            BootstrapDialog.show({
                title: error,
                message: 'Unable to leave project. ' + error,
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
    };

    $scope.isCurrentSprint = function(sprintId) {
        if ($scope.currentSprint){
            return sprintId == $scope.currentSprint.sprintId;
        } else {
            return false;
        }
    };

    $scope.back = function() {
        var previousBaseState = repository.getPreviousBaseState();
        if(previousBaseState == "requirement-dashboard") {
            $state.go("requirement-dashboard");
        } else if(previousBaseState == "home.executive-dashboard") {
            $state.go("home.executive-dashboard");
        } else if(previousBaseState == "teams.home") {
            $state.go("teams.home");
        }
    };

}]);
