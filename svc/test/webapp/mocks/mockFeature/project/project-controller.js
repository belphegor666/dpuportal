"use strict";

/**
 * Main sprint view
 */
angular.module('app').controller("mockProjectController", ["$scope", "$state", function ($scope, $state) {

    $scope.goToSprints = function(projectId) {
        var chosenProject = {projectId : projectId};
        if(projectId == 1) {
            chosenProject.title = "Make Some Tea";
        } else {
            chosenProject.title = "Make a new car";
        }
        $state.go("sprint", {project: chosenProject});
    };

}]);
