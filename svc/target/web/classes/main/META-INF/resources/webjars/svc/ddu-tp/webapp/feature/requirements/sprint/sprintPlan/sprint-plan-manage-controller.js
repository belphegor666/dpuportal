"use strict";

/**
 * Sprint Plan Management Controller - this manages the Sprint Plans page that shows all the stories for the sprint
 */
angular.module('app').controller("sprintPlanManageController", ["$scope", "$state", "$stateParams", "$log", "repository", "codeBook", "$location", function ($scope, $state, $stateParams, $log, repository, codeBook, $location) {

    $scope.controllerName = "sprintPlanManageController";

    var user = repository.getUser();

    $scope.project = repository.getSelectedProject();

    $scope.sprintId = $stateParams.sprintId;

    codeBook.getStoryStatuses().then(function(response) {
        $scope.statusList = response;

        // get the stories
        repository.getStoriesForSprint($scope.sprintId).then(function (result) {
            $log.debug("sprintPlanManageController: Loading stories");
            $scope.stories = result;
            for(var i = 0; i < $scope.stories.length; i++) {
                $scope.stories[i].status = findStatusDescription($scope.stories[i].status);
            }
        }, function (error) {
            $scope.errorMessage = error;
        });
    });

    $scope.addStory = function () {
        $state.go("home.sprint-stories-edit", {projectId: $scope.project.id, sprintId: $scope.sprintId});
    };

    $scope.amendStory = function (story) {
        $state.go("home.sprint-stories-edit", {projectId: $scope.project.id, sprintId: $scope.sprintId, storyId: story.storyId, story: story});
    };

    $scope.completeStory = function (story) {
        story.status = "complete";
        repository.saveStory($scope.sprintId, story).then(function(response){
            story.status = findStatusDescription("complete");
        });
    };

    $scope.deleteStory = function (storyToDelete) {
        var showErrorDialog = function() {
            BootstrapDialog.alert({
                title: $$refdata.TEXT.STORY.ERROR.TITLE,
                message: $$refdata.TEXT.STORY.ERROR.MESSAGE,
                type: BootstrapDialog.TYPE_DANGER
            });
        };

        BootstrapDialog.show({
            title: $$refdata.TEXT.STORY.DELETE.TITLE,
            message: $$refdata.TEXT.STORY.DELETE.MESSAGE,
            type: BootstrapDialog.TYPE_WARNING,
            buttons : [{
                 label: $$refdata.BUTTON.DELETE,
                 cssClass: 'btn-warning',
                 action: function (dialogRef) {
                     dialogRef.close();
                     repository.deleteStory(storyToDelete).then(function(response) {
                         _.remove($scope.stories, function(story) {
                             return story.storyId == storyToDelete.storyId;
                         });
                     }, function(error) {
                         showErrorDialog();
                     });
                 }
             }, {
                 label: $$refdata.BUTTON.CANCEL,
                 cssClass: 'btn-default',
                 action: function (dialogRef) {
                     dialogRef.close();
                 }
             }]
        });
    };

    var findStatusDescription = function(lookupCode) {
        var statusDescription = _.find($scope.statusList, function(status) {
            if(status.lookupCode == lookupCode) {
                return true;
            }
        });
        if(statusDescription != undefined) {
            return statusDescription.description;
        } else {
            return $scope.statusList[0].description;
        }
    };

    $scope.isComplete = function(storyStatus) {
        if (storyStatus == findStatusDescription("complete")) {
            return true;
        } else {
            return false;
        }
    };

    $scope.back = function() {
        $state.go("requirement-sprints", {requirementId : $stateParams.projectId});
    };

}]);
