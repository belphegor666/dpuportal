app.config(function ($stateProvider) {
    $stateProvider.state("home.release-history", {
        url: "/release-history",
        views: {
            "home-content": {
                templateUrl: "feature/releaseHistory/release-history.html"
            }
        }
    })
});