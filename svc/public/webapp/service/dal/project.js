"use strict";

/**
 * Data Access Module
 */
angular.module("dal").decorator("dal", ["$delegate", "$q", "$log", "$http", function ($delegate, $q, $log, $http) {

    /**
     * @param criteria
     * @returns {*}
     */
        $delegate.getProjects = function () {
            var deferred = $q.defer();
                $http.get('/api/projects').then(function (projects) {
                    deferred.resolve(projects.data);
                    $log.debug("Dal-getProjects : " + JSON.stringify(projects));
                }, function (e) {
                    deferred.reject(e);
                    $log.error("DAL:getProjects :" + JSON.stringify(e));
                });

            return deferred.promise;
        };


    /**
     * @param
     * @returns {*}
     */
    $delegate.getProjectsWithCurrentSprint = function () {
        var deferred = $q.defer();
        $http.get('/api/projects?currentSprint=true').then(function (projects) {
            deferred.resolve(projects.data);
            $log.debug("Dal-getProjectWithCurrentSprint : " + JSON.stringify(projects));
        }, function (e) {
            deferred.reject(e);
            $log.error("DAL:getProjectWithCurrentSprint :" + JSON.stringify(e));
        });
        return deferred.promise;
    };


    /**
     * @param
     * @returns {*}
     */
    $delegate.getProjectsForProductOwner = function (productOwnerEmail) {
        var deferred = $q.defer();
        $http.get('/api/projects?productOwner=true').then(function (projects) {
            deferred.resolve(projects.data);
            $log.debug("Dal-getProjectsForProductOwner : " + JSON.stringify(projects));
        }, function (e) {
            deferred.reject(e);
            $log.error("DAL:getProjectsForProductOwner :" + JSON.stringify(e));
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

        $http.get('/api/projects/' + selectedDate).then(
            function (success) {
                deferred.resolve(success.data);
                $log.debug("DAL:getProjectsWithTeams : " + JSON.stringify(success));
            }, function (error) {
                deferred.reject(error);
                $log.error("DAL:getProjectsWithTeams : " + JSON.stringify(error));
            }
        );

        return deferred.promise;
    };

    /**
     * @param
     * @returns {*}
     */
    $delegate.getProjectsAssignedToUser = function (userId) {
        var deferred = $q.defer();
        $http.get('/api/users/' + userId + '/projects').then(
            function (projects) {
                deferred.resolve(projects.data);
                $log.debug("Dal-getProjectsAssignedToUser : " + JSON.stringify(projects));
            }, function (e) {
                deferred.reject(e);
                $log.error("DAL:getProjectsAssignedToUser :" + JSON.stringify(e));
            });
        return deferred.promise;
    };

    /**
     * @param
     * @returns {*}
     */
    $delegate.addMemberToSprint = function(sprintId, role) {
        var deferred = $q.defer();

        var roleToBeSent = {role : role};

        $http.post("/api/sprints/" + sprintId + "/members", roleToBeSent).then(function(response) {
            deferred.resolve(response);
        }, function(e) {
            deferred.reject(e);
        });

        return deferred.promise;
    };

    $delegate.removeMemberFromSprint = function(sprintId) {
        var deferred = $q.defer();

        $http.delete("/api/sprints/" + sprintId + "/members").then(function(response) {
            deferred.resolve(response);
        }, function(e) {
            deferred.reject(e);
        });

        return deferred.promise;
    };

    /**
     * @param projectToSave
     * @returns {*}
     */
    $delegate.saveProject = function (projectToSave) {
        var deferred = $q.defer();

        if (!projectToSave.hasOwnProperty("id")) {

            $http.post('/api/projects', projectToSave).then(function (project) {
                $log.debug("Dal: projectToSave -" + JSON.stringify(project));
                projectToSave = project.data;
                deferred.resolve(projectToSave);
                $log.debug("Dal:projectToSave - new Project is created with id :" + projectToSave.id);
            }, function (e) {
                $log.error("DAL:projectToSave - " + JSON.stringify(e));
                deferred.reject(e);
            });
        }
        // do update
        else {
            $log.debug("Dal : updateProject - " + JSON.stringify(projectToSave));
            $http.put('/api/projects', projectToSave).then(function () {
                $log.debug("Dal: saveProject(update) -" + JSON.stringify(projectToSave));
                deferred.resolve();
            }, function (e) {
                $log.error("DAL:saveProject(update) - " + JSON.stringify(e));
                deferred.reject(e);
            });
        }
        return deferred.promise;
    };

    /**
     * @param projectToDelete
     * @returns {*}
     */
    $delegate.deleteProject = function (projectToDelete) {
        var deferred = $q.defer();
        $http.delete('/api/projects/' + projectToDelete.id).then(function () {
            deferred.resolve();
            $log.debug("Dal:deleteProject - Project deleted :" + projectToDelete.id);
        }, function (e) {
            $log.error("Dal:deleteProject - " + JSON.stringify(e));
            deferred.reject(e);
        });
        deferred.resolve();
        return deferred.promise;
    };

    $delegate.downloadProjectTeamCsv = function(selectedDate){
        var deferred = $q.defer();
        $http.get('/api/teamCsvDownload/' + selectedDate, {responseType: 'arraybuffer' }).then(function(response){
            $log.debug("Dal:downloadTeamCsv - Teams CSV retrieved :");
            deferred.resolve(response.data);
        }, function(e){
            $log.error("Dal:downloadTeamCsv - " + JSON.stringify(e));
            deferred.reject(e);
        });

        return deferred.promise;
    }

    $log.debug("DAL:Project Instantiated");
    // Returns the decorated DAL service back to angular
    return $delegate;
}]);
