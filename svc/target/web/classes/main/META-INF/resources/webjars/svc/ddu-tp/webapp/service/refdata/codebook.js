"use strict";

angular.module("referenceData", []).service("codeBook", ['$log', "$q", "$http",
    function ($log, $q, $http) {

        var codeBookCache;

        this.getProjectStatuses = function () {
            return findCodeBookByType("status");
        };

        this.getRequestTypes = function(){
            return findCodeBookByType("req_type");
        };


        this.getFundingTypes = function(){
            return findCodeBookByType("funding");
        };

        this.getCertificationTypes = function(){
            return findCodeBookByType("cert");
        };

        this.getTechnologies = function(){
            return findCodeBookByType("technology");
        };

        this.getStoryStatuses = function(){
            return findCodeBookByType("story_status");
        };

        var findCodeBookByType = function (type) {
            var deferred = $q.defer();
            var filteredData = [];

            if (codeBookCache == undefined) {
                fetchCodeBookRefData().then(function (result) {
                    filteredData = filterByType(type);
                    deferred.resolve(filteredData);
                });
            } else {
                filteredData = filterByType(type);
                deferred.resolve(filteredData);
            }

            return deferred.promise;
        };

        this.findByLookupCode = function(lookupCode){
            var deferred = $q.defer();
            var filteredData = [];
            if (codeBookCache == undefined) {
                fetchCodeBookRefData().then(function (result) {
                    filteredData = filterByLookupCode(lookupCode);
                    var filteredCodeBook = filteredData.shift();
                    deferred.resolve(filteredCodeBook);
                });
            } else {
                filteredData = filterByLookupCode(lookupCode);
                var filteredCodeBook = filteredData.shift();
                deferred.resolve(filteredCodeBook);
            }

            return deferred.promise;

        }

        var filterByType = function (value) {
            var filteredList = _.filter(codeBookCache, function (codeBook) {
                return codeBook.type == value;
            });
            return filteredList;
        }

        var filterByLookupCode = function (value) {
            var filteredList = _.filter(codeBookCache, function (codeBook) {
                return codeBook.lookupCode == value;
            });
            return filteredList;
        }

        function fetchCodeBookRefData() {
            var deferred = $q.defer();
            $http.get('/api/reference-data/codebook').then(function (success) {
                    codeBookCache = success.data
                    deferred.resolve(codeBookCache);
                    $log.debug("ReferenceData:getCodeBook : " + JSON.stringify(success));
                }, function (error) {
                    deferred.reject(error);
                    $log.error("ReferenceData:getCodeBook : " + JSON.stringify(error));
                }
            );

            return deferred.promise;
        };

        $log.debug("codeBookRefData: Instantiated");

    }]);