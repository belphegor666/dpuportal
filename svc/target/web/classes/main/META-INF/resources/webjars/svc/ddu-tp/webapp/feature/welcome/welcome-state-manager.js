app.config(function ($stateProvider) {
    $stateProvider.state("welcome", {
        abstract: true,
        views: {
            "content": {
                templateUrl: "feature/home/home-index.html"
            }
        }
    }).state("welcome.home", {
        url: "/welcome",
        views: {
            "home-content": {
                templateUrl: "feature/welcome/welcome.html"
            }
        }
    })
});

