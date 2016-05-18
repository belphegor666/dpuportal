"use strict";

angular.module("app").controller("releaseHistoryController", ["$scope", "$state", "$log","repository",
    function ($scope, $state, $log, repository) {

        repository.getReleaseHistories().then(function (results){
            $log.debug("releaseHistoryController: Retrieving release histories");
            $scope.releaseHistories = results;

        }, function(error){
            $scope.error = true;
            $log.error("releaseHistoryController: problem retrieving release histories" + error);
        });
    }]);

