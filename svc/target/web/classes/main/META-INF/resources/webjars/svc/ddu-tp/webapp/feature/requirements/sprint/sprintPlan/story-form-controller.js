"use strict";

angular.module('app').controller("storyFormController", ["$scope", "$log", "$state", "$stateParams", "repository", "codeBook", function ($scope, $log, $state, $stateParams, repository, codeBook) {

    $scope.hasValidationError = false;
    $scope.role = {};

    $scope.sprintId = $stateParams.sprintId;

    $scope.project = repository.getSelectedProject();

    //Get the passed in sprint
    $scope.sprint = _.find($scope.project.sprints, function(sprint) {
        return sprint.sprintId == $scope.sprintId;
    });

    //Populate the selected members in the dropdown with members who have joined the sprint
    $scope.members = angular.copy($scope.sprint.members);
    $scope.members.splice(0, 0, {email: "Not Applicable"});

    //Populate the status drop down
    codeBook.getStoryStatuses().then(function(response) {
        $scope.statusList = response;

        //If amending story
        if($stateParams.story) {
            $scope.headingText = "Amend Story";
            $scope.isAmend = true;
            $scope.story = $stateParams.story;
            for(var i = 0; i < $scope.story.storyMembers.length; i++) {
                switch($scope.story.storyMembers[i].role) {
                    case $$refdata.JOB_ROLE.BUSINESS_ANALYST : $scope.role.businessAnalyst = $scope.story.storyMembers[i]; break;
                    case $$refdata.JOB_ROLE.DEVELOPER : $scope.role.developer = $scope.story.storyMembers[i]; break;
                    case $$refdata.JOB_ROLE.TESTER : $scope.role.tester = $scope.story.storyMembers[i]; break;
                }
            }
            $scope.storyStatus = _.find($scope.statusList, function(status) {
                return ($scope.story.status == status.description);
            });
        } else {
            //Initialise new story
            $scope.headingText = "Add New Story";
            $scope.isAmend = false;
            $scope.story = {};
            $scope.storyStatus = $scope.statusList[0];
        }

        var user = repository.getUser();
        $scope.story.createdBy = user.email;
    });

    /**
     * Save the current sprint
     */
    $scope.saveStory = function (storyForm) {
        $log.debug("sprintFormController: saveStory");

        if(storyForm.$valid) {

            var storyMembers = [];
            if($scope.role.businessAnalyst && $scope.role.businessAnalyst.email != "Not Applicable") {
                storyMembers.push({email: $scope.role.businessAnalyst.email, role: $$refdata.JOB_ROLE.BUSINESS_ANALYST});
            }
            if($scope.role.developer && $scope.role.developer.email != "Not Applicable") {
                storyMembers.push({email: $scope.role.developer.email, role: $$refdata.JOB_ROLE.DEVELOPER});
            }
            if($scope.role.tester && $scope.role.tester.email != "Not Applicable") {
                storyMembers.push({email: $scope.role.tester.email, role: $$refdata.JOB_ROLE.TESTER});
            }

            if($scope.story.storyMembers != undefined) {
                for (var i = 0; i < $scope.story.storyMembers.length; i++) {
                    _.find(storyMembers, function(storyMember) {
                        if($scope.story.storyMembers[i].role == storyMember.role) {
                            storyMember.storyMemberId = $scope.story.storyMembers[i].storyMemberId;
                            return true;
                        }
                    });
                }
            }

            $scope.story.storyMembers = storyMembers;

            $scope.story.status = $scope.storyStatus.lookupCode;

            repository.saveStory($scope.sprintId, $scope.story).then(function (response) {
                BootstrapDialog.show({
                    message: 'Story saved successfully',
                    type: BootstrapDialog.TYPE_SUCCESS,
                    buttons: [{
                        label: 'OK',
                        cssClass: 'btn-success',
                        action: function (dialogRef) {
                            dialogRef.close();
                            $state.go("home.sprint-stories", {projectId: $scope.project.id, sprintId: $scope.sprintId});
                        }
                    }]
                });
            }, function (error) {
                BootstrapDialog.alert({
                    title: "Error",
                    message: error,
                    type: BootstrapDialog.TYPE_DANGER
                });
                $state.go("home.sprint-stories", {projectId: $scope.project.id, sprintId: $scope.sprintId});
            });
        } else {
            $scope.hasValidationError = true;
        }
    };

    /**
     * Cancel and return to manage sprint
     */
    $scope.cancel = function () {
        $state.go("home.sprint-stories", {projectId: $scope.project.id, sprintId: $scope.sprintId});
    };

}]);
