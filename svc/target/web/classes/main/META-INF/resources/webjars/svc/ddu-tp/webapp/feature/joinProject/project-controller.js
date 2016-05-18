"use strict";

angular.module("app").controller("projectController", ["$scope", "$state", "$log", "repository", "$uibModal", function ($scope, $state, $log, repository, $uibModal) {

    $scope.joinedProjects = {};

    $scope.hasValidationError = false;
    $scope.noProjectsFound = false;

    // Constant - for trace and debug
    $scope.controllerName = "projectController";

    // init get all user projects
    repository.getProjectsWithCurrentSprint().then(function (results) {
        //Only take projects with a current sprint
        $scope.projects = results;

        // Where there's a project add the priority value
        if($scope.projects.length == 0) {
            $scope.noProjectsFound = true;
        }
        else {
            $scope.noProjectsFound = false;
            for (var k = 0; k < $scope.projects.length; k++) {
                $scope.projects[k].priorityValue = ((($scope.projects[k].revenue + $scope.projects[k].margin + $scope.projects[k].costSavings)*1000000) + ($scope.projects[k].efficiency * 500))/1000000;
            }
        }

        var userId = repository.getUserId();

        for (var i = 0; i < $scope.projects.length; i++) {
            _.find($scope.projects[i].sprints[0].members, function(member) {
                if(member.id == userId) {
                    $scope.joinedProjects[$scope.projects[i].id] = true;
                    return true;
                }
            });
        }

    }, function (error) {
        $scope.error = true;
        $scope.errorMessage = error;
    });

    $scope.joinProject = function(project) {
        $uibModal.open({
            templateUrl: 'feature/joinProject/join-sprint-dialog.html',
            controller: 'joinSprintDialogController'
        }).result.then(function(result) {
            var role = result;

            var sprint = project.sprints[0];

            repository.addMemberToSprint(project, sprint, role).then(function() {

                $scope.joinedProjects[project.id] = true;

                BootstrapDialog.show({
                    message: "You successfully joined the project",
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

    $scope.leaveProject = function(project) {

        var sprint = project.sprints[0];

        repository.removeMemberFromSprint(project.id, sprint).then(function() {

            $scope.joinedProjects[project.id] = false;

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

    $scope.hasJoinedProject = function(projectId) {
        if($scope.joinedProjects[projectId] != true) {
            return true;
        }
        else {
            return false;
        }
    };

}]);
