"use strict";
/**
 * Requirement Controller - this manages the default Reauirements pages that shows all the requirements
 */
angular.module('app').controller("requirementsDashboardController", ["$scope", "$state", "$log", "repository", function ($scope, $state, $log, repository) {

    // Constant - for trace and debug
    $scope.controllerName = "requirementsDashboardController";
    $scope.noProjectsFound = false;
    $scope.draft = 0;
    $scope.submitted = 0;
    $scope.inDevelopment = 0;
    $scope.completed = 0;

    //Revenue Values
    $scope.draftRevenue = 0;
    $scope.submittedRevenue = 0;
    $scope.inDevelopmentRevenue = 0;
    $scope.completedRevenue = 0;

    //Margin Values
    $scope.draftMargin = 0;
    $scope.submittedMargin = 0;
    $scope.inDevelopmentMargin = 0;
    $scope.completedMargin = 0;

    //Cost Values
    $scope.draftCost = 0;
    $scope.submittedCost = 0;
    $scope.inDevelopmentCost = 0;
    $scope.completedCost = 0;

    $scope.revenueTotal = 0;
    $scope.marginTotal = 0;
    $scope.costTotal = 0;
    $scope.efficiencyTotal = 0;

    var projects = [];

    // init get all user projects
    function getProjects() {
        repository.getProjectsForProductOwner(repository.getUser()).then(function (results) {

            if (results.length == 0) {
                $scope.noProjectsFound = true;
            }
            else {
                $scope.projects = results;
                $scope.noProjectsFound = false;
            }

            //Calculate totals
            results.forEach(function (project) {
                $scope.revenueTotal += project.revenue;
                $scope.marginTotal += project.margin;
                $scope.costTotal += project.costSavings;
                $scope.efficiencyTotal += project.efficiency;

                // Generate totals for draft projects
                if (project.status == $$refdata.PROJECT_STATUS.DRAFT) {
                    $scope.draft++;
                    if (project.revenue != null) {
                        $scope.draftRevenue += project.revenue;
                    }
                    if (project.margin != null) {
                        $scope.draftMargin += project.margin;
                    }
                    if (project.costSavings != null) {
                        $scope.draftCost += project.costSavings;
                    }
                }

                // Generate totals for submitted projects
                if (project.status == $$refdata.PROJECT_STATUS.SUBMITTED ||
                    project.status == $$refdata.PROJECT_STATUS.EVALUATION ||
                    project.status == $$refdata.PROJECT_STATUS.SCHEDULED) {
                    $scope.submitted++;

                    if (project.revenue != null) {
                        $scope.submittedRevenue += project.revenue;
                    }
                    if (project.margin != null) {
                        $scope.submittedMargin += project.margin;
                    }
                    if (project.costSavings != null) {
                        $scope.submittedCost += project.costSavings;
                    }
                }

                // Generate totals for projects in development
                if (project.status == $$refdata.PROJECT_STATUS.IN_DEVELOPMENT ||
                    project.status == $$refdata.PROJECT_STATUS.ON_HOLD) {
                    $scope.inDevelopment++;
                    if (project.revenue != null) {
                        $scope.inDevelopmentRevenue += project.revenue;
                    }
                    if (project.margin != null) {
                        $scope.inDevelopmentMargin += project.margin;
                    }
                    if (project.costSavings != null) {
                        $scope.inDevelopmentCost += project.costSavings;
                    }
                }

                // Generate totals for completed projects
                if (project.status == $$refdata.PROJECT_STATUS.CLOSED_OK) {
                    $scope.completed++;
                    if (project.revenue != null) {
                        $scope.completedRevenue += project.revenue;
                    }
                    if (project.margin != null) {
                        $scope.completedMargin += project.margin;
                    }
                    if (project.costSavings != null) {
                        $scope.completedCost += projects.costSavings;
                    }
                }
            });

            //Store a copy of the results for filtering
            projects = results;

        }, function (error) {
            $scope.error = true;
            $scope.errorMessage = error;
        });

    }

    getProjects();

    $scope.filterByStatus = function (filterStatus) {
        $scope.projects = filterProjects(projects, filterStatus);
    }

    var filterProjects = function (projects, filterStatus) {
        $scope.efficiencyTotal = 0;

        return projects.filter(function (project) {

            if (filterStatus == $$refdata.PROJECT_STATUS.DRAFT) {
                $scope.revenueTotal = $scope.draftRevenue;
                $scope.marginTotal = $scope.draftMargin;
                $scope.costTotal = $scope.draftCost;
                return project.status === $$refdata.PROJECT_STATUS.DRAFT;
            }
            else if (filterStatus == $$refdata.PROJECT_STATUS.SUBMITTED) {
                $scope.revenueTotal = $scope.submittedRevenue;
                $scope.marginTotal = $scope.submittedMargin;
                $scope.costTotal = $scope.submittedCost;
                return project.status === $$refdata.PROJECT_STATUS.SUBMITTED || project.status === $$refdata.PROJECT_STATUS.EVALUATION ||
                project.status === $$refdata.PROJECT_STATUS.SCHEDULED;
            }
            else if (filterStatus == $$refdata.PROJECT_STATUS.IN_DEVELOPMENT) {
                $scope.revenueTotal = $scope.inDevelopmentRevenue;
                $scope.marginTotal = $scope.inDevelopmentMargin;
                $scope.costTotal = $scope.inDevelopmentCost;
                return project.status === $$refdata.PROJECT_STATUS.IN_DEVELOPMENT || project.status === $$refdata.PROJECT_STATUS.ON_HOLD;
            }
            else if (filterStatus == $$refdata.PROJECT_STATUS.CLOSED_OK) {
                $scope.revenueTotal = $scope.completedRevenue;
                $scope.marginTotal = $scope.completedMargin;
                $scope.costTotal = $scope.completedCost;
                return project.status === $$refdata.PROJECT_STATUS.CLOSED_OK;
            }

        }).map(function (project) {
            $scope.efficiencyTotal += project.efficiency;
            return project;
        });
    };


    $scope.createRequirement = function () {
        $state.go("requirement-edit");
    }

}]);




