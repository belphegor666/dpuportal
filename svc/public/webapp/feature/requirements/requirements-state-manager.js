app.config(function ($stateProvider) {
    $stateProvider.state("requirement-dashboard", {
        parent: 'home',
        url: "/requirements",
        views: {
            "home-content": {
                templateUrl: "feature/requirements/requirement/requirements-dashboard-index.html"
            }
        }
    })

        .state("requirement-edit", {
            parent: 'home',
            url: "/requirements/:requirementId",
            data: {baseState: "requirement-dashboard"},
            views: {
                "home-content": {
                    templateUrl: "feature/requirements/requirement/requirement-form.html"
                }
            }
        })

        .state("requirement-sprints", {
            parent: 'home',
            url: "/requirements/:requirementId/sprints",
            views: {
                "home-content": {
                    templateUrl: "feature/requirements/sprint/sprint-manage.html"
                }
            }
        })

        .state("requirement-sprints-edit", {
            parent: 'home',
            url: "/requirements/:projectId/sprints/:sprintId",
            params: {
                sprintNo : 0,
                sprint : null
            },
            views: {
                "home-content": {
                    templateUrl: "feature/requirements/sprint/sprint-form.html"
                }
            }
        }).state("requirement-documentRepository", {
            parent: 'home',
            url: "/requirements/:projectId/documentRepository",
            views: {
                "home-content": {
                    templateUrl: "feature/documentRepository/document-repository-index.html"
                }
            }
        }).state("home.sprint-stories", {
            url: "/requirements/:projectId/sprints/:sprintId/stories",
            views: {
                "home-content": {
                    templateUrl: "feature/requirements/sprint/sprintPlan/sprint-plan-manage.html"
                }
            }
        }).state("home.sprint-stories-edit", {
            url: "/requirements/:projectId/sprints/:sprintId/stories/:storyId",
            params: {
                story: null
            },
            views: {
                "home-content": {
                    templateUrl: "feature/requirements/sprint/sprintPlan/story-form.html"
                }
            }
        });

});
