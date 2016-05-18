"use strict";

/**
 * Set up the mock states for project
 */
angular.module("app").config(function ($stateProvider) {
    $stateProvider.state("mockProject", {
        url: "/mock-project",
        views: {
            "content@": {
                templateUrl: "../mock/mockFeature/project/project-index.html"
            }
        }
    });
});

