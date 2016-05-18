describe('dashboard pie chart requirement status controller', function() {

    beforeEach(module('app'));

    var $controller;
    var controller;
    var $scope;
    var repository;
    var $log;
    var $q, deferred, response;


    //To jasmine test promises, use the below example.
    var promise = function(response, resolved) {
        deferred = $q.defer();
        if (resolved == true) {
            deferred.resolve(response);
        }
        else {
            deferred.reject(response);
        }
        return deferred.promise;
    };

    var createController = function () {
        controller = $controller('pieChartRequirementStatusController', {$scope: $scope, repository: repository, $log: $log});
    };

    beforeEach(inject(function($rootScope, _$controller_, _repository_, _$q_, _$log_) {
        $q = _$q_;
        $log = _$log_;
        $scope = $rootScope.$new();
        repository = _repository_;
        $controller = _$controller_;
    }));

    describe('controller initialisation', function() {

        it('set controller name and projects to an initial value', function() {
            createController();

            expect($scope.controllerName).toEqual("pieChartRequirementStatusController");
            expect($scope.projects).toEqual({});
            expect($scope.approved).toEqual(0);
            expect($scope.cancelled).toEqual(0);
            expect($scope.rejected).toEqual(0);
            expect($scope.submitted).toEqual(0);


        });

        it('should successfully retrieve projects upon start', function() {
            spyOn(repository, 'getProject').and.callThrough();

            createController();
            expect(repository.getProject).toHaveBeenCalled();
            expect($scope.chartObject.data.rows.length).toEqual(0);
            expect($scope.approved).toEqual(0);
            expect($scope.cancelled).toEqual(0);
            expect($scope.rejected).toEqual(0);
            expect($scope.submitted).toEqual(0);

            $scope.$apply();

            expect($scope.projects).not.toEqual({});
            expect($scope.chartObject.data.rows.length).toBeGreaterThan(0);
            expect($scope.approved).not.toEqual(0);
            expect($scope.cancelled).not.toEqual(0);
            expect($scope.rejected).not.toEqual(0);
            expect($scope.submitted).not.toEqual(0);

            expect($scope.chartObject.data.rows.length).toEqual(4);
            expect($scope.approved).toEqual(2);
            expect($scope.cancelled).toEqual(1);
            expect($scope.rejected).toEqual(3);
            expect($scope.submitted).toEqual(3);
        });


        it('should return an error if repository fails to load projects for chart calculation', function() {
            spyOn(repository, 'getProject').and.returnValue(promise("Error has occurred",false));

            createController();

            expect(repository.getProject).toHaveBeenCalled();
            expect($scope.projects).toEqual({});

            $scope.$apply();

            expect($scope.projects).toEqual({});

            expect($scope.error).toBe(true);
            expect($scope.errorMessage).toEqual("Error has occurred");
        });

    });

});


