"use strict";

angular.module("app").controller("assignedProjectsController", ["$scope", "$state", "$stateParams", "$log","repository",
    function ($scope, $state, $stateParams, $log, repository) {

        $scope.currentUser = false;
        if ($stateParams.member == null) {
            $scope.currentUser = true;
            repository.getProjectsAssignedToUser().then(function (results) {
                $log.debug("assignedProjectsController: Retrieving projects");
                $scope.assignedProjects = flatten(results);

            }, function (error) {
                $scope.error = true;
                $log.error("assignedProjectsController: problem loading assigned projects " + error);
            });
            repository.getStoriesAssignedToUser().then(function (results) {
                $log.debug("myTasksController: Retrieving stories");
                $scope.assignedStories = results;

            }, function (error) {
                $scope.error = true;
                $log.error("myTasksController: problem loading assigned stories " + error);
            });
        } else {
            $scope.member = $stateParams.member;
            repository.getProjectsAssignedToOtherUser($stateParams.member.id).then(function (results) {
                $log.debug("assignedProjectsController: Retrieving projects");
                $scope.assignedProjects = flatten(results);

            }, function (error) {
                $scope.error = true;
                $log.error("assignedProjectsController: problem loading assigned projects " + error);
            });
            repository.getStoriesAssignedToOtherUser($stateParams.member.id).then(function (results) {
                $log.debug("myTasksController: Retrieving stories");
                $scope.assignedStories = results;

            }, function (error) {
                $scope.error = true;
                $log.error("myTasksController: problem loading assigned stories " + error);
            });
        }

        var flatten = function(assignedProjects){
            var flattenedProjects = [];

            angular.forEach(assignedProjects, function(assignedProject){
                var sprints = assignedProject.sprints;
                if(sprints){
                    angular.forEach(sprints, function(sprint){
                        var role = sprint.members[0].role;
                        var flattenedProject = {projectCode:assignedProject.projectCode, title:assignedProject.title, sprintNo:sprint.sprintNo, startDate:sprint.startDate,
                            endDate:sprint.endDate, role:role};

                        flattenedProjects.push( flattenedProject);

                    });
                }
            });
            return flattenedProjects;
        }

        $scope.back = function() {
            $state.go("teams.home");
        };


    }]);


