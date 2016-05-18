app.config(function ($stateProvider) {
    $stateProvider.state("myAccount", {
        abstract: true,
        views: {
            "content": {
                templateUrl: "feature/home/home-index.html"
            }
        }
    }).state("myAccount.myDetails", {
        url: "/myDetails",
        views: {
            "home-content": {
                templateUrl: "feature/myAccount/details/my-details-index.html"
            }
        }
    }).state("myAccount.settings", {
        url: "/settings",
        views: {
            "home-content": {
                templateUrl: "feature/myAccount/settings/user-homepage-preferences-index.html"
            }
        }
    }).state("myAccount.updatePassword", {
        url: "/updatePassword",
        views: {
            "home-content": {
                templateUrl: "feature/myAccount/changePassword/change-password-index.html"
            }
        }
    }).state("myAccount.invoices", {
        url: "/invoices",
        views: {
            "home-content": {
                templateUrl: "feature/myAccount/invoices.html"
            }
        }
    }).state("myAccount.certifications", {
        url: "/certifications",
        views: {
            "home-content": {
                templateUrl: "feature/myAccount/certification/certification.html"
            }
        }
    })
});
