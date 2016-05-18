app.config(function ($stateProvider) {
    $stateProvider.state("legoStore", {
        abstract: true,
        views: {
            "content": {
                templateUrl: "feature/home/home-index.html"
            }
        }
    }).state("legoStore.welcome", {
        url: "/legoStore/welcome",
        views: {
            "home-content": {
                templateUrl: "feature/legoStore/welcome.html"
            }
        }
    }).state("legoStore.pamm", {
        url: "/legoStore/pamm",
        views: {
            "home-content": {
                templateUrl: "feature/legoStore/pamm.html"
            }
        }
    }).state("legoStore.lamp", {
        url: "/legoStore/lamp",
        views: {
            "home-content": {
                templateUrl: "feature/legoStore/lamp.html"
            }
        }
    }).state("legoStore.dotNet", {
        url: "/legoStore/dotNet",
        views: {
            "home-content": {
                templateUrl: "feature/legoStore/dot-net.html"
            }
        }
    })
});
