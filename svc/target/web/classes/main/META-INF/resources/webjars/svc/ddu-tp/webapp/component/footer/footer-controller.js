"use strict";

angular.module("app").controller("footerController", ["$scope", "$log", function ($scope, $log) {

    $scope.recentPosts = [{
        summary: "Organisations transform using Atos Digital Prototyping Unit",
        date: "Oct 20, 2015",
        link: "#"
    }];

    $scope.tagCloud = [{
            link: "http://uk.atos.net/en-uk/home/we-do/digital/business-operations.html",
            name: "Business Operations"
        },
        {
            link: "http://uk.atos.net/en-uk/home/we-do/digital/customer-experience.html",
            name: "Customer Experience"
        },
        {
            link: "http://uk.atos.net/en-uk/home/we-do/digital/workplace.html",
            name: "Workplace"
        },
        {
            link: "http://uk.atos.net/en-uk/home/we-do/digital/infrastructure.html",
            name: "Infrastructure"
    }];

}]);