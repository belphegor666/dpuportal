app.config(function ($stateProvider) {
    $stateProvider.state("home.join-project", {
        url: "/projects",
        views: {
            "home-content": {
                templateUrl: "feature/joinProject/current-projects.html"
            }
        }
    });
});
