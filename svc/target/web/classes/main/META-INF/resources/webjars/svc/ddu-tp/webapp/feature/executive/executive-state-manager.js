app.config(function ($stateProvider) {
    $stateProvider.state("home.executive-dashboard", {
        url: "/executive",
        views: {
            "home-content": {
                templateUrl: "feature/executive/executive-dashboard-index.html"
            }
        }
    });
});