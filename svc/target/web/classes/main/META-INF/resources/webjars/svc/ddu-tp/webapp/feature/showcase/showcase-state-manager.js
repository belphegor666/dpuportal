app.config(function ($stateProvider) {
    $stateProvider.state("home.showcase", {
        url: "/showcase",
        views: {
            "home-content": {
                templateUrl: "feature/showcase/showcase.html"
            }
        }
    }).state("home.bentley-motors", {
        url: "/bentley-motors",
        views: {
            "home-content": {
                templateUrl: "feature/showcase/bentley-motors.html"
            }
        }
    }).state("home.mod", {
        url: "/mod",
        views: {
            "home-content": {
                templateUrl: "feature/showcase/mod.html"
            }
        }
    }).state("home.home-office", {
        url: "/home-office",
        views: {
            "home-content": {
                templateUrl: "feature/showcase/home-office.html"
            }
        }
    }).state("home.digital-kickstart", {
        url: "/digital-kickstart",
        views: {
            "home-content": {
                templateUrl: "feature/showcase/digital-kickstart.html"
            }
        }
    }).state("home.digital-terms-conditions", {
        url: "/digital-terms-conditions",
        views: {
            "home-content": {
                templateUrl: "feature/showcase/digital-terms-conditions.html"
            }
        }
    }).state("home.nhss", {
        url: "/nhss",
        views: {
            "home-content": {
                templateUrl: "feature/showcase/nhss.html"
            }
        }
    })

});