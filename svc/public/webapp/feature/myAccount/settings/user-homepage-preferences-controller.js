"use strict";

angular.module("app").controller("userHomepagePreferencesController", ["$scope", "$state", "$log", "repository", function ($scope, $state, $log, repository) {

    $scope.preferenceSaved = false;
    $scope.userPreferences = {};

    $scope.homepages = [
        {
            id: "WELCOME",
            name : "Welcome Page"
        },
        {
            id : "REQUIREMENT",
            name : "Requirements Page"
        },
        {
            id : "DEVELOPER",
            name : "Developer Page"
        },
        {
            id : "PROJECT",
            name : "Join Projects Page"
        },
        {
            id : "EXECUTIVE",
            name : "Executive dashboard"
        }
    ];

    $scope.userPreferences.homePagePreference = repository.getUserHomePagePreference();

    $scope.saveUserPreferences = function(form) {
        if($scope.preferenceSaved == false) {
            repository.saveUserPreferences($scope.userPreferences).then(function(success) {
                $scope.preferenceSaved = true;
                repository.setUserHomePagePreference($scope.userPreferences.homePagePreference);
            });
        }
    };

    $scope.preferenceChange = function() {
        $scope.preferenceSaved = false;
    };


}]);
