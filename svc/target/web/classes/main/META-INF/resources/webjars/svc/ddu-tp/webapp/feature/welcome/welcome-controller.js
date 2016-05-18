"use strict";

/**
 * Controller for the welcome page
 */
angular.module("app").controller("welcomeController", ["$scope", "$state", "$log", "repository", "$window", function ($scope, $state, $log, repository, $window) {



    $scope.changeHomepage = function(homepage) {
        var homepagePreference = {homePagePreference : homepage};
        repository.saveUserPreferences(homepagePreference).then(function(response) {
            switch(homepage) {
                case 'REQUIREMENT' : $state.go("requirement-dashboard"); break;
                case 'DEVELOPER' : $state.go("home.developer.assigned-projects"); break;
                case 'EXECUTIVE' : $state.go("home.executive-dashboard"); break;
            }
            repository.setUserHomePagePreference(homepage);
        }, function(error) {
            BootstrapDialog.alert({
                title: "Error",
                message: "Unable to change home page"
            });
        });
    };

    $scope.contacts = [
        {name : "Kin Ling", email : "kin.ling@atos.net"},
        {name : "Chandni Dhanraj", email : "chandni.dhanraj@atos.net"}
    ];

    $scope.email = function(recipients) {
        var link = "mailto:";
        for(var i = 0; i < recipients.length; i++) {
            link = link.concat(recipients[i] + ";");
        }
        //Remove last comma
        link = link.substring(0, link.length - 1);

        $window.location.href = link;
    };

}]);