"use strict";

/**
 * Data Access Module
 */
angular.module("dal").decorator("dal", ["$delegate", "$q", "$log", "$http", function ($delegate, $q, $log, $http) {

    var mockSprints = [
        {
            sprintId : 1,
            sprintNo : 1,
            projectId : 5,
            title : "To set up the coffee machine",
            startDate : new Date("2015-12-01"),
            endDate : new Date("2015-12-30"),
            description : "Need to purchase a new coffee machine.",
            status : "COMPLETE",
            members: [{
                id: 1,
                surname: "Joe",
                forename: "Bloggs",
                email: "joe@bloggs.net",
                jobTitle: "Business Analyst"
            }, {
                id: 2,
                surname: "Joy",
                forename: "Bill",
                email: "bill@joy.net",
                jobTitle: "Developer"
            }]
        },
        {
            sprintId : 2,
            sprintNo : 2,
            projectId : 1,
            title : "To get coffee ingredients",
            startDate : new Date("2015-11-21"),
            endDate : new Date("2015-11-28"),
            description : "Coffee beans, milk and sugar. As well as some mugs.",
            status : "IN_PROGRESS",
            members: [{
                id: 1,
                surname: "Joe",
                forename: "Bloggs",
                email: "joe@bloggs.net",
                jobTitle: "Business Analyst"
            }, {
                id: 2,
                surname: "Joy",
                forename: "Bill",
                email: "delivery@anywhere.com",
                jobTitle: "Developer"
            }]
        },
        {
            sprintId : 3,
            sprintNo : 1,
            projectId : 2,
            title : "To make a new car",
            startDate : new Date("2015-10-01"),
            endDate : new Date("2015-10-21"),
            description : "Need to purchase a 3D printer",
            status : "COMPLETE",
            members: [{
                id: 1,
                surname: "Joe",
                forename: "Bloggs",
                email: "delivery@anywhere.com",
                jobTitle: "Business Analyst"
            }, {
                id: 2,
                surname: "Joy",
                forename: "Bill",
                email: "bill@joy.net",
                jobTitle: "Developer"
            }]
        },
        {
            sprintId : 4,
            sprintNo : 2,
            projectId : 2,
            title : "To make a new car tutorial step",
            startDate : new Date("2015-10-25"),
            endDate : new Date("2015-11-25"),
            description : "Learn how to use 3D printer as well as gathering materials",
            status : "IN_PROGRESS",
            members: [{
                id: 1,
                surname: "Joe",
                forename: "Bloggs",
                email: "joe@bloggs.net",
                jobTitle: "Business Analyst"
            }, {
                id: 2,
                surname: "Joy",
                forename: "Bill",
                email: "bill@joy.net",
                jobTitle: "Developer"
            }]
        },
        {
            sprintId : 5,
            sprintNo : 3,
            projectId : 2,
            title : "Printing the new car",
            startDate : new Date("2015-11-26"),
            endDate : new Date("2015-11-28"),
            description : "Need to purchase a 3D printer",
            status : "PLANNED",
            members: [{
                id: 1,
                surname: "Joe",
                forename: "Bloggs",
                email: "joe@bloggs.net",
                jobTitle: "Business Analyst"
            }, {
                id: 2,
                surname: "Joy",
                forename: "Bill",
                email: "bill@joy.net",
                jobTitle: "Developer"
            }]
        },
         {
             sprintId : 6,
             sprintNo : 1,
             projectId : 3,
             title : "Printing the new car",
             startDate : new Date("2015-11-26"),
             endDate : new Date("2015-11-28"),
             description : "Need to purchase a 3D printer",
             status : "IN_PROGRESS",
             members: [{
                 id: 1,
                 surname: "Joe",
                 forename: "Bloggs",
                 email: "joe@bloggs.net",
                 jobTitle: "Business Analyst"
             }, {
                 id: 2,
                 surname: "Joy",
                 forename: "Bill",
                 email: "bill@joy.net",
                 jobTitle: "Developer"
             }]
         },
       {
           sprintId : 7,
           sprintNo : 1,
           projectId : 4,
           title : "Printing the new bike",
           startDate : new Date("2015-11-26"),
           endDate : new Date("2015-11-28"),
           description : "Need to purchase a 3D printer",
           status : "IN_PROGRESS",
           members: [{
               id: 1,
               surname: "Joe",
               forename: "Bloggs",
               email: "joe@bloggs.net",
               jobTitle: "Business Analyst"
           }]
       },
       {
           sprintId : 8,
           sprintNo : 2,
           projectId : 5,
           title : "Printing the new bike",
           startDate : new Date("2015-11-26"),
           endDate : new Date("2015-11-28"),
           description : "Need to purchase a 3D printer",
           status : "IN_PROGRESS",
           members: [{
               id: 1,
               surname: "Joe",
               forename: "Bloggs",
               email: "joe@bloggs.net",
               jobTitle: "Business Analyst"
           }]
       },
       {
           sprintId : 9,
           sprintNo : 1,
           projectId : 6,
           title : "Printing the new bike",
           startDate : new Date("2015-11-25"),
           endDate : new Date("2015-11-28"),
           description : "Need to purchase a 3D printer",
           status : "IN_PROGRESS",
           members: [{
               id: 1,
               surname: "Joe",
               forename: "Bloggs",
               email: "joe@bloggs.net",
               jobTitle: "Business Analyst"
           }, {
                 id: 2,
                 surname: "Joy",
                 forename: "Bill",
                 email: "bill@joy.net",
                 jobTitle: "Developer"
             }]
       }
    ];
    //sprint_user table mock. Initially haven't joined any sprints
    var mockSprintUsers = [];

    $delegate.getSprintsForProject = function(projectId) {
        var mockSprintsForProject = _.filter(mockSprints, function(mockSprint) {
            return mockSprint.projectId == projectId;
        });

        var deferred = $q.defer();

        deferred.resolve(mockSprintsForProject);

        return deferred.promise;
    };

    $delegate.saveSprint = function(sprint) {
        var deferred = $q.defer();

        if(sprint.sprintId == undefined) {
            sprint.sprintId = mockSprints.length + 1;
        }

        mockSprints.push(sprint);

        deferred.resolve(sprint);

        return deferred.promise;
    };

 $delegate.getProjectIdsWithSprintsJoined = function(memberId) {
        var projectIdsWithSprintsJoinedArray = [];

        //Mock assumes user has an id of 2
        if(memberId == false) {
            memberId = 2;
        }

        var deferred = $q.defer();

        for(var i = 0; i < mockSprintUsers.length; i++) {
            if((mockSprintUsers[i].memberId == memberId)) {
                for(var j = 0; j < mockSprints.length; j++) {
                    if(mockSprints[j].id == mockSprintUsers[i].sprintId) {
                        console.log(mockSprintUsers);
                        projectIdsWithSprintsJoinedArray.push(mockSprints[j].projectId);
                        break;
                    }
                }
            }
        };

        if(projectIdsWithSprintsJoinedArray.length > 0) {
            deferred.resolve(projectIdsWithSprintsJoinedArray);
        }
        else {
            deferred.reject("No sprints joined");
        }

        return deferred.promise;
    };


    $delegate.getMockedSprints = function() {
        return mockSprints;
    };

    $log.debug("DAL:Sprint Instantiated");
    return $delegate;

}]);