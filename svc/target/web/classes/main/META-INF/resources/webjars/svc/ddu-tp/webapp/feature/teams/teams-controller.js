"use strict";

/**
 * Teams controller for managing the Teams page, which shows all projects that have a Sprint for a given date, and the
 * team associated with that Sprint.
 */
angular.module("app").controller("teamsController", ["$scope", "$state", "$log", "$filter", "repository", function ($scope, $state, $log, $filter, repository) {
    // Store the current date (for use when displaying today's project teams).
    $scope.currentDate = new Date();

    // Function to get all projects that have a Sprint for the given date.
    var updateProjectsAndTeams = function () {
        repository.getProjectsWithTeams($scope.currentDate.getTime()).then(
            function (results) {
                $scope.projects = results;
                $log.debug("teamsController: Retrieved projects with teams; number of projects:", $scope.projects.length);

                // Loop through all the projects to get a list of team member IDs from all the people in each project's
                // Sprint (there should be only one Sprint - the one for the selected date - per project).
                var teamMemberIds = [];
                $scope.projects.forEach(function (project) {
                    // String to hold the e-mail addresses of everyone in the Sprint team, plus the Product Owner,
                    // delimited by a semicolon and space
                    project.sprints[0].emailAddresses = "";
                    project.targetDate = new Date(project.targetDate);
                    project.createdDate = new Date(project.createdDate);

                    // Add the team members' IDs to the list - these can be assumed to be unique per individual
                    project.sprints[0].members.forEach(function (member) {
                        this.push(member.id);

                        // Calculate the sum of Story Points by each of the roles "Business Analyst", "Developer" and
                        // "Tester", of each Story allocated to the team member
                        member.baStoryPoints = sumStoryPoints($$refdata.JOB_ROLE.BUSINESS_ANALYST, member.storyAllocations);
                        member.devStoryPoints = sumStoryPoints($$refdata.JOB_ROLE.DEVELOPER, member.storyAllocations);
                        member.testStoryPoints = sumStoryPoints($$refdata.JOB_ROLE.TESTER, member.storyAllocations);


                        switch(angular.lowercase(member.role.slice(0,5))) {
                            case "produ":
                                member.priority = 0;
                                break;
                            case "scrum":
                                member.priority = 1;
                                break;
                            case "archi":
                                member.priority = 2;
                                break;
                            case "busin":
                                member.priority = 3;
                                break;
                            case "devel":
                                member.priority = 4;
                                break;
                            case "teste":
                                member.priority = 5;
                                break;
                            default:
                                member.priority = 10;
                                break;
                        }

                        // Append the team member's e-mail address to the string of delimited addresses
                        project.sprints[0].emailAddresses += member.email + ";%20";
                    }, teamMemberIds);

                    // Append the Product Owner's e-mail address to the string of delimited addresses
                    project.sprints[0].emailAddresses += project.productOwner;
                });

                // The count of all individuals across all Sprints for a given date. Note: This is not simply a grand
                // total of everyone per Sprint because an individual can be part of more than one Sprint simultaneously.
                $scope.totalIndividualCount = _.uniq(teamMemberIds).length;
            }, function (error) {
                $scope.error = true;
                $scope.errorMessage = error;
            }
        );
    };

    // Function to sum Story Points of each Story allocated to a team member where they are playing a given role
    function sumStoryPoints(role, storyAllocations) {
        return storyAllocations.filter(function (allocation) {
            return allocation.role === role;
        }).reduce(function (total, allocation) {
            return total + parseInt(allocation.story.storyPoints);
        }, 0);
    }

    // Function to determine which colour (bronze, silver or gold) should be used to render individual certifications
    $scope.getCertColor = function (certification) {
        // Examine the last part of the certificate code, from the '_' onwards, to get the colour code ('b', 's' or 'g')
        var certCode = certification.certificate;

        switch(certCode.substring(certCode.indexOf('_'))) {
            case "_b":
                return "cert-bronze";
                break;
            case "_s":
                return "cert-silver";
                break;
            case "_g":
                return "cert-gold";
                break;
            default:
                break;
        }
    };

    $scope.previousWeek = function () {
        $scope.currentDate = new Date($scope.currentDate.getTime() - 7 * $$constants.DAY_AS_MILLISECONDS);
        updateProjectsAndTeams();
    };

    $scope.nextWeek = function () {
        $scope.currentDate = new Date($scope.currentDate.getTime() + 7 * $$constants.DAY_AS_MILLISECONDS);
        updateProjectsAndTeams();
    };

    $scope.today = function () {
        $scope.currentDate = new Date();
        updateProjectsAndTeams();
    };

// priorityValueSort method to be used as a secondary sort column
    $scope.priorityValueSort = function (project) {
        return 0-((((project.revenue + project.margin + project.costSavings)*1000000) + (project.efficiency * 500))/1000000);

    };

    /* Custom Search Function */
    $scope.search = function (project) {
        var hit = 0;
        $scope.lcsearchKeyword=angular.lowercase($scope.searchKeyword);

        /* Search for text in the key fields */
        hit = (angular.lowercase(project.projectCode).indexOf($scope.lcsearchKeyword || '') !== -1
        || angular.lowercase(project.title).indexOf($scope.lcsearchKeyword || '') !== -1
        || angular.lowercase(project.productOwner).indexOf($scope.lcsearchKeyword || '') !== -1
        || angular.lowercase(project.techStack).indexOf($scope.lcsearchKeyword || '') !== -1);

        /* now search individual team members - but only bother if this row isn't already a match*/
        if (!hit) {
            angular.forEach(project.sprints[0].members, function (member)
            {
            if ((angular.lowercase(member.forename) + " " + angular.lowercase(member.surname)).indexOf($scope.lcsearchKeyword) >= 0) hit = -1;
            });

        };


        return (hit);

};


$scope.downloadProjectTeamCsv = function (){
        var csvFileName = "members_" + $filter('date')($scope.currentDate,'yyyy-MM-dd') + '.csv';
        var downloadLink = document.createElement("a");
        document.body.appendChild(downloadLink);
        repository.downloadProjectTeamCsv($scope.currentDate.getTime()).then(function (result) {
            var csvFile = new Blob([result], {type: 'application/csv'});
            var csvFileURL = URL.createObjectURL(csvFile);

            downloadLink.href = csvFileURL;
            downloadLink.download = csvFileName;
            downloadLink.click();

        }, function(error){
            $scope.error = true;
            $scope.errorMessage = error;
        });
    };

    $scope.navigateToUserProjects = function (member) {
        $state.go("teams.developer", {member:member});
    };

    // Initially, get all projects that have a Sprint running today.
    updateProjectsAndTeams();
}]);