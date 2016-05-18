app.config(function ($stateProvider) {
    $stateProvider.state("teams", {
        abstract: true,
        views: {
            "content": {
                templateUrl: "feature/home/home-index.html"
            }
        }
    }).state("teams.home", {
        url: "/teams",
        views: {
            "home-content": {
                templateUrl: "feature/teams/teams.html"
            }
        }
    }).state("teams.developer", {
        url: "/teams/developer/projects",
        params: {
            member:null
        },
        views: {
            "home-content": {
                templateUrl: "feature/developer/developer-assigned-projects.html"
            }
        }
    });
});