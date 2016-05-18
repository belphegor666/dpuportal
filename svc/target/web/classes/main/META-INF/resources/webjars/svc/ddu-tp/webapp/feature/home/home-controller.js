"use strict";

angular.module("app").controller("homeController", ["$scope", "$state", "$log", "securityManager", function ($scope, $state, $log, securityManager) {

    $scope.isAtRequirementDashboard = function() {
        return $state.includes("requirement-dashboard") || $state.includes("requirement-edit") || $state.includes("requirement-sprints")
            || $state.includes("requirement-sprints-edit");
    };

    $scope.navigateToRequirementDashboard = function() {
        $state.go("requirement-dashboard");
    }

    $scope.isAtDashboard = function() {
        return $state.includes("home.developer") || $state.includes("developer.assigned-projects")
            || $state.includes("home.executive-dashboard") || $state.includes("home.executive-edit")
            || $state.includes("requirement-dashboard") || $state.includes("requirement-edit")
            || $state.includes("requirement-sprints") || $state.includes("requirement-sprints-edit");
    };

    $scope.isAtDeveloperDashboard = function() {
        return $state.includes("home.developer") || $state.includes("developer.assigned-projects") ;
    };

    $scope.navigateToDeveloperDashboard = function() {
        $state.go("home.developer");
    }

    $scope.navigateToAssignedProjects = function() {
        $state.go("home.developer.assigned-projects");
    }

    $scope.navigateToAssignedTasks = function() {
        $state.go("home.developer.assigned-stories");
    }

    $scope.isAtExecutiveDashboard = function() {
        return $state.includes("home.executive-dashboard") || $state.includes("home.executive-edit");
    };

    $scope.navigateToExecutiveDashboard = function() {
        $state.go("home.executive-dashboard");
    }

    $scope.isAtJoinAProjectThisWeek = function() {
        return $state.includes("home.join-project");
    };

    $scope.navigateToJoinAProjectThisWeek = function() {
        $state.go("home.join-project");
    }

    $scope.isAtWelcome = function() {
        return $state.includes("welcome.home");
    };

    $scope.navigateToWelcome = function() {
        $state.go("welcome.home");
    }

    $scope.isAtTeams = function() {
        return $state.includes("teams.home") || $state.includes("teams.developer");
    };

    $scope.navigateToTeams = function() {
        $state.go("teams.home");
    }

    $scope.isAtReleaseHistory = function() {
        return $state.includes("home.release-history");
    };

    $scope.navigateToReleaseHistory = function() {
        $state.go("home.release-history");
    }

    $scope.isAtShowcase = function() {
        return $state.includes("home.showcase");
    };

    $scope.navigateToShowcase = function() {
        $state.go("home.showcase");
    }

    $scope.isAtMyAccount = function() {
        return $state.includes("myAccount");
    };

    $scope.navigateToMyDetails = function() {
        $state.go("myAccount.myDetails");
    }

    $scope.navigateToSettings = function() {
        $state.go("myAccount.settings");
    }

    $scope.navigateToUpdatePassword = function() {
        $state.go("myAccount.updatePassword");
    }

    $scope.navigateToInvoices = function() {
        $state.go("myAccount.invoices");
    }

    $scope.navigateToCertifications = function() {
        $state.go("myAccount.certifications");
    }

    $scope.isAtLegoStore = function() {
        return $state.includes("legoStore");
    };

    $scope.navigateToLegoWelcome = function() {
        $state.go("legoStore.welcome");
    }

    $scope.navigateToLegoPamm = function() {
        $state.go("legoStore.pamm");
    }

    $scope.navigateToLegoDotNet = function() {
        $state.go("legoStore.dotNet");
    }

    $scope.navigateToLegoLamp = function() {
        $state.go("legoStore.lamp");
    }

    $scope.logout = function() {
        securityManager.logout();
        $state.go("login");
    };

}]);