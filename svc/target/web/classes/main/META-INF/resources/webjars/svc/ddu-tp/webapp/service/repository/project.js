"use strict";

/**
 * Project Repository
 */
angular.module("repository").decorator("repository", ["$delegate", "$q", "$log", "dal", "codeBook",
    function ($delegate, $q, $log, dal, codeBook) {

        /* productOwner project cache */
        var projectCache = {
            projects : [],
        };

        /**
         * Method to retrieve all projects
         * @param
         * @returns {*}
         */
        $delegate.getProjects = function () {
            var deferred = $q.defer();
            dal.getProjects().then(function (results) {
                results.forEach(function(project){
                    project.targetDate = new Date(project.targetDate);
                    project.createdDate = new Date(project.createdDate);

                    codeBook.findByLookupCode(project.status).then(function(result){
                        project.statusDescription = result.description;
                    });
                });
                deferred.resolve(results);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        /**
         * Method to retrieve all projects with logged in user as ProductOwner
         * @param
         * @returns {*}
         */
        $delegate.getProjectsForProductOwner = function (user) {
            var deferred = $q.defer();
            if (projectCache.projects.length != 0) {
                deferred.resolve(projectCache.projects);
            } else {
                dal.getProjectsForProductOwner(user.email).then(function (results) {
                    projectCache.projects = results;
                    results.forEach(function(project){
                        project.targetDate = new Date(project.targetDate);
                        project.createdDate = new Date(project.createdDate);
                        codeBook.findByLookupCode(project.status).then(function(result){
                            project.statusDescription = result.description;
                        });

                    });
                    deferred.resolve(projectCache.projects);
                }, function (error) {
                    deferred.reject(error);
                });
            }
            return deferred.promise;
        };


        /**
         * Gets all projects that have a current sprint
         * @returns {{}}
         */
        $delegate.getProjectsWithCurrentSprint = function () {
            var deferred = $q.defer();
            dal.getProjectsWithCurrentSprint().then(function (results) {
                deferred.resolve(results);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        /**
         * Gets all projects that have a Sprint running on the selected date.
         *
         * @param selectedDate The date represented as a long
         * @returns {*}
         */
        $delegate.getProjectsWithTeams = function (selectedDate) {
            var deferred = $q.defer();

            // If there is no selected date, default it to the current date.
            if (selectedDate == undefined || selectedDate == null) {
                var currentDate = new Date();
                selectedDate = currentDate.getTime();
            }

            dal.getProjectsWithTeams(selectedDate).then(
                function (results) {
                    results.forEach(function (project) {
                        project.sprints[0].members.forEach(function (member) {
                            member.certifications.forEach(function (certification) {
                                codeBook.findByLookupCode(certification.certificate).then(function (result) {
                                    certification.shortDesc = result.shortDesc;
                                });
                            });
                        });
                    });
                    deferred.resolve(results);
                }, function (error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        };

        /**
         * Gets all projects that have a sprint, user has joined
         * @returns {{}}
         */
        $delegate.getProjectsAssignedToUser = function () {
            var deferred = $q.defer();

            var userId = $delegate.getUserId();


            if (projectCache.assignedProjects == undefined) {
                dal.getProjectsAssignedToUser(userId).then(function (results) {
                    projectCache.assignedProjects = results;
                    for (var i=0; i < projectCache.assignedProjects.length; i++) {
                        for (var j=0; j < projectCache.assignedProjects[i].sprints.length; j++){
                            projectCache.assignedProjects[i].sprints[j].startDate = new Date(projectCache.assignedProjects[i].sprints[j].startDate);
                            projectCache.assignedProjects[i].sprints[j].endDate = new Date(projectCache.assignedProjects[i].sprints[j].endDate);
                        }
                    }
                    deferred.resolve(projectCache.assignedProjects);
                }, function (error) {
                    deferred.reject(error);
                });

            }else{
                for (var i=0; i < projectCache.assignedProjects.length; i++) {
                    for (var j=0; j < projectCache.assignedProjects[i].sprints.length; j++){
                        projectCache.assignedProjects[i].sprints[j].startDate = new Date(projectCache.assignedProjects[i].sprints[j].startDate);
                        projectCache.assignedProjects[i].sprints[j].endDate = new Date(projectCache.assignedProjects[i].sprints[j].endDate);
                    }
                }
                deferred.resolve(projectCache.assignedProjects);
            }
            return deferred.promise;
        };

        /**
         * Gets all projects that have a sprint, a selected user has joined
         * @returns {{}}
         */
        $delegate.getProjectsAssignedToOtherUser = function (userId) {
            var deferred = $q.defer();

            dal.getProjectsAssignedToUser(userId).then(function (results) {

                for (var i=0; i < results.length; i++) {
                    for (var j=0; j < results[i].sprints.length; j++){
                        results[i].sprints[j].startDate = new Date(results[i].sprints[j].startDate);
                        results[i].sprints[j].endDate = new Date(results[i].sprints[j].endDate);
                    }
                }
                deferred.resolve(results);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        /**
         * Adds user to a current sprint
         */
        $delegate.addMemberToSprint = function(project, currentSprint, role) {
            var deferred = $q.defer();

            dal.addMemberToSprint(currentSprint.sprintId, role).then(function(response) {

                //Sets up the user object to be added to the members array
                var user = $delegate.getUser();

                var userToBeAdded = {};
                userToBeAdded.id = user.userId;
                userToBeAdded.role = role;
                userToBeAdded.email = user.email;
                userToBeAdded.surname = user.lastName;
                userToBeAdded.forename = user.firstName;

                //If new sprint then create empty members array
                if(currentSprint.members == undefined) {
                    currentSprint.members = [];
                }
                //Adds member to sprintCache
                currentSprint.members.push(userToBeAdded);

                if(projectCache.assignedProjects) {

                    var cacheCopy = angular.copy(projectCache.assignedProjects);

                    //Find if the project already exists in the assignedProjects cache and if it does, adds the joined sprint to it with the user added into the members array of that sprint
                    var projectFound = _.find(cacheCopy, function(foundProject) {
                        if (foundProject.id == project.id) {
                            foundProject.sprints.push(currentSprint);
                            return true;
                        }
                    });

                    //If project doesn't exist in assignedProjects, adds the project to that cache
                    if(projectFound == undefined) {
                        project.sprints = [currentSprint];
                        cacheCopy.push(project);
                    }

                    projectCache.assignedProjects = angular.copy(cacheCopy);

                }

                deferred.resolve(response);
            }, function(e) {
                deferred.reject(e);
            });

            return deferred.promise;
        };

        /**
         * Removes user from a current sprint
         */
        $delegate.removeMemberFromSprint = function(projectId, currentSprint) {
            var deferred = $q.defer();

            dal.removeMemberFromSprint(currentSprint.sprintId).then(function(response) {

                var userId = $delegate.getUserId();

                //Remove member from the $scope
                _.remove(currentSprint.members, function(member) {
                    return member.id == userId;
                });

                if(projectCache.assignedProjects) {

                    var cacheCopy = angular.copy(projectCache.assignedProjects);

                    //Find the sprint to be left in assignedProjects cache and removes it.
                    _.find(cacheCopy, function(project) {
                        _.remove(project.sprints, function(sprint) {
                            return sprint.sprintId == currentSprint.sprintId;
                        })
                    });

                    //Checks for any projects that have no sprints joined, and remove them from the cache
                    for(var i = 0; i < cacheCopy.length; i++) {
                        _.remove(cacheCopy, function(project) {
                            return project.sprints.length == 0;
                        })
                    };

                    projectCache.assignedProjects = angular.copy(cacheCopy);

                }

                deferred.resolve(response);
            }, function(e) {
                deferred.reject(e);
            });

            return deferred.promise;
        };

        /**
         * Create or update requirement.  A project with no ID is new.
         * @returns {{}}
         */
        $delegate.saveProject = function (projectToSave) {
            $log.debug("Repository:Project - saveProject");

            var deferred = $q.defer();
            var isUpdate = projectToSave.hasOwnProperty("id");

            delete projectToSave.priority;
            delete projectToSave.statusDescription;

            dal.saveProject(projectToSave).then(function (project) {
                /* reset the status from lookup as removed in controller before update*/
                codeBook.findByLookupCode(projectToSave.status).then(function(result){
                    projectToSave.statusDescription = result.description;
                });

                // Add newly created project to cache
                if (!isUpdate) {
                    project.targetDate = new Date(project.targetDate);
                    project.createdDate = new Date(project.createdDate);
                    codeBook.findByLookupCode(project.status).then(function(result){
                        project.statusDescription = result.description;
                    });
                    projectCache.projects.push(project);
                }
                deferred.resolve(project);
            }, function (error) {
                deferred.reject(error.data);
            });

            return deferred.promise;
        };

        /**
         * Delete the given project
         * @param projectToDelete
         * @returns {*}
         */
        $delegate.deleteProject = function (projectToDelete) {
            $log.debug("Repository:Project - deleteProject");

            var deferred = $q.defer();

            dal.deleteProject(projectToDelete).then(function () {
                projectToDelete.status = $$refdata.PROJECT_STATUS.CANCELLED;
                deferred.resolve(projectCache.projects);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        $delegate.clearProjects = function() {
            projectCache = {
                projects : []
            };
        };

        $delegate.downloadProjectTeamCsv = function(selectedDate){
            var deferred = $q.defer();

            dal.downloadProjectTeamCsv(selectedDate).then(function(result){
                deferred.resolve(result)
            }, function (error){
                deferred.reject(error);
            });

            return deferred.promise;
        }

        $log.debug("Repository:Project Instantiated");
        return $delegate;
    }]);
