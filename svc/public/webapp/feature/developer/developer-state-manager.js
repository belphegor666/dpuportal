app.config(function ($stateProvider) {
    $stateProvider.state("home.developer", {
        abstract: true,
        views: {
            "home-content": {
                templateUrl: "feature/developer/developer-index.html"
            }
        }
    }).state("home.developer.assigned-projects", {
        url: "/developer/projects",
        params: {
            member:null
        },
        views: {
            "developer-content": {
                templateUrl: "feature/developer/developer-assigned-projects.html"
            }
        }

    });
});