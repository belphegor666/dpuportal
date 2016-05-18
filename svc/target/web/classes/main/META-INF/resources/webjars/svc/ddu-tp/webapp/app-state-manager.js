"use strict";

/**
 * Set up the top level states and default root.
 */
app.config(function ($stateProvider, $urlRouterProvider) {

    //Default state
    $urlRouterProvider.otherwise("login");

    $stateProvider.state("login", {
        url: "/login",
        views: {
            "content": {
                templateUrl: "feature/login/login-index.html"
            }
        }
    }).state("login-change-password", {
        url: "/login/change-password",
        params: {
            homepage: null
        },
        views: {
            "content": {
                templateUrl: "feature/login/login-change-password.html"
            }
        }
    }).state("register", {
        url: "/register",
        params: {
            credentials: null,
            confirmEmail: null,
            confirmPassword: null
        },
        views: {
            "content": {
                templateUrl: "feature/register/register-index.html"
            }
        }
    }).state("forgot-password", {
        url: "/forgot-password",
        views: {
            "content": {
                templateUrl: "feature/forgotPassword/forgot-password.html"
            }
        }
    }).state("activate", {
        url: "/activate?key",
        views: {
            "content": {
                templateUrl: "feature/activate/activate-index.html"
            }
        }
    }).state("register-terms-and-conditions", {
        url: "/register/terms-and-conditions",
        params: {
            credentials: null,
            confirmEmail: null,
            confirmPassword: null
        },
        views: {
            "content": {
                templateUrl: "feature/register/register-terms-and-conditions.html"
            }
        }
    })

        .state("home", {
            abstract: true,
            views: {
                "content": {
                    templateUrl: "feature/home/home-index.html"
                }
            }
        })
});



