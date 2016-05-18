"use strict";

/**
 * Mock Project DAO
 */
angular.module("dal").decorator("dal", ["$delegate", "$q", "$log", "securityStore", "$http", function ($delegate, $q, $log, securityStore) {
    var mockProjectId = 100;
    var mockProjects =
        [{
            id: 1,
            title: "My Noddy Project",
            summary: "This is just a test entry",
            info: "It is Really Really Noddy",
            status: $$refdata.PROJECT_STATUS.REJECTED,
            revenue: 100,
            costSavings: 50,
            createdDate: new Date (2015,0,1),
            targetDate: new Date (2015,10,27)

        }, {
            id: 2,
            title: "Clarus - Project Review Management",
            summary: "Manage project meetings and document reviews",
            status: $$refdata.PROJECT_STATUS.SUBMITTED,
            revenue: 100,
            costSavings: 50,
            createdDate: new Date (2015,4,1),
            targetDate: new Date (2016,0,1)

        }, {
            id: 3,
            title: "Data Access Layer",
            summary: "High Level Design for WDL",
            status: $$refdata.PROJECT_STATUS.SUBMITTED,
            revenue: 100,
            costSavings: 50,
            createdDate: new Date (2015,7,1),
            targetDate: new Date (2016,0,1)

        }, {
            id: 4,
            title: "Oli Test",
            summary: "Test Test Test",
            status: $$refdata.PROJECT_STATUS.REJECTED,
            revenue: 100,
            costSavings: 50,
            createdDate: new Date (2015,1,1),
            targetDate: new Date (2016,0,1)

        },
        {
            id: 5,
            title: "Oli Test2",
            summary: "Test Test Test2",
            status: $$refdata.PROJECT_STATUS.APPROVED,
            revenue: 100,
            costSavings: 50,
            createdDate: new Date (2015,5,1),
            targetDate: new Date (2016,0,1)

        },
        {
            id: 6,
            title: "Oli Test3",
            summary: "Test Test Test3",
            status: $$refdata.PROJECT_STATUS.APPROVED,
            revenue: 100,
            costSavings: 50,
            createdDate: new Date (2015,9,1),
            targetDate: new Date (2016,0,1)

        },
        {
            id: 7,
            title: "Oli Test Completed",
            summary: "Oli Test Completed",
            status: $$refdata.PROJECT_STATUS.SUBMITTED,
            revenue: 100,
            costSavings: 50,
            createdDate: new Date (2015,1,1),
            targetDate: new Date (2016,0,1)

        },
        {
            id: 8,
            title: "Oli Test On Hold",
            summary: "Oli Test On Hold",
            status: $$refdata.PROJECT_STATUS.REJECTED,
            revenue: 100,
            costSavings: 50,
            createdDate: new Date (2015,3,1),
            targetDate: new Date (2016,0,1)

        },
        {
            id: 9,
            title: "Oli Test Cancelled",
            summary: "Oli Test Cancelled",
            status: $$refdata.PROJECT_STATUS.CANCELLED,
            revenue: 100,
            costSavings: 50,
            createdDate: new Date (2015,8,1),
            targetDate: new Date (2016,0,1)

        }];

    /**
     * This is where the $http REST goes
     * @param criteria
     * @returns {*}
     */
    $delegate.getProject = function (criteria) {
        var deferred = $q.defer();
        if (criteria == undefined || criteria == null) {
            deferred.resolve(_.cloneDeep(mockProjects));
        } else if (criteria.hasOwnProperty('id')) {
            if (mockProjects[criteria.id] != undefined) {
                deferred.resolve(_.find(mockProjects, function(project) {
                    return project.id == criteria.id;
                }));
            } else {
                deferred.reject("No Project Found");
            }
        } else {
            deferred.reject("Unrecognised criteria");
        }

        return deferred.promise;
    };

   /**
     * This is where the $http REST goes
     * @returns {*}
     */
   $delegate.getProjectsWithCurrentSprint = function () {
        var mockSprints = $delegate.getMockedSprints();
        var now = new Date();
        var currentSprint;

        var deferred = $q.defer();
        deferred.resolve(_.filter(mockProjects, function(project) {
            //If project id matches any of the sprints project Ids and now date is between the sprint start and end date, return true
            for(var i = 0; i < mockSprints.length; i++) {

                //Need to format the dates to javascript default style and compare via milliseconds from January 1 1970
                currentSprint = (new Date(mockSprints[i].startDate).getTime() < now.getTime()) && (now.getTime() < new Date(mockSprints[i].endDate).getTime());

                //Note, assumes sprints can only be created for Approved Projects. Otherwise, add another condition && project.status == 'Approved'
                if((project.id == mockSprints[i].projectId) && (currentSprint == true)) {
                    //Return breaks out of for loop and returns true
                    return true;
                }
            }
            //If not returned true, will reach this part and return false
            return false;
        }));
        return deferred.promise;
   };


   $delegate.getMyProjects = function () {
        var mockSprints = $delegate.getMockedSprints();
        var mySprint;

        var deferred = $q.defer();
        deferred.resolve(_.filter(mockProjects, function(project) {
            //If project id matches any of the sprints project Ids and now date is between the sprint start and end date, return true
            for(var i = 0; i < mockSprints.length; i++) {

                for(var j = 0; j < mockSprints[i].members.length; j ++) {
                    mySprint = false;
                    mySprint = mockSprints[i].members[j].email == securityStore.getSubject();
                    if(mySprint) break;
                }

               if((project.id == mockSprints[i].projectId) && (mySprint == true)) {
                    //Return breaks out of for loop and returns true
                    return true;
               }
            }

            //If not returned true, will reach this part and return false
            return false;
        }));
        return deferred.promise;
   };

    /**
     * This is where the $http REST goes
     * @param project
     * @returns {*}
     */
    $delegate.saveProject = function (project) {
        var deferred = $q.defer();
        if (!project.hasOwnProperty("id")) {
            project.id = mockProjectId++;
            project.status = "SUBMITTED";
            mockProjects.push(project);
        }
        deferred.resolve(project);
        return deferred.promise;
    };

    /**
     *  This is where the $http REST goes
     * @param projectToDelete
     * @returns {*}
     */
    $delegate.deleteProject = function (projectToDelete) {
        var deferred = $q.defer();
        if (mockProjects[projectToDelete.id] != undefined) {
            _.remove(mockProjects, {
             id: projectToDelete.id
            });
            deferred.resolve(mockProjects);
        } else {
            deferred.reject("No Project Found");
        }       
        
        return deferred.promise;
    };


    $log.debug("Mock DAL:Project Instantiated");
    // Returns the decorated DAL service back to angular
    return $delegate;
}]);


