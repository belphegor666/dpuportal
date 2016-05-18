"use strict";

/**
 * Manages individual sprints within a ng-repeat set
 */
angular.module('app').controller("sprintItemController", ["$scope", "$log", "$state", "repository", function ($scope, $log, $state, repository) {

    // name constant - for trace and debugging
    $scope.controllerName = "sprintItemController";

    /**
     * Amend the selected sprint/
     */
    $scope.amend = function () {
        $state.go("requirements.project.sprint", {sprintId: $scope.sprint.id});

    };
}]);

