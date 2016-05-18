describe('dashboard pie chart sprint status controller', function() {

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
        controller = $controller('pieChartSprintStatusController', {$scope: $scope, repository: repository, $log: $log});
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

            expect($scope.controllerName).toEqual("pieChartSprintStatusController");
            expect($scope.projects).toEqual({});
            expect($scope.sprints).toEqual({});
            expect($scope.completed).toEqual(0);
            expect($scope.inProgress).toEqual(0);
            expect($scope.planned).toEqual(0);

        });

        it('should successfully retrieve projects upon start', function() {
            spyOn(repository, 'getMyProjects').and.callThrough();
            spyOn(repository, 'getSprintsForProject').and.callThrough();

            createController();

            expect(repository.getMyProjects).toHaveBeenCalled();
            expect($scope.completed).toEqual(0);
            expect($scope.inProgress).toEqual(0);
            expect($scope.planned).toEqual(0);

            $scope.$apply();

            //expect(repository.getSprintsForProject).toHaveBeenCalled();
            //expect($scope.projects).not.toEqual({});
            //expect($scope.sprints).not.toEqual({});
            //expect($scope.chartObject.data.rows.length).toBeGreaterThan(0);
            //expect($scope.completed).not.toEqual(0);
            //expect($scope.inProgress).not.toEqual(0);
            //expect($scope.planned).not.toEqual(0);
            //
            //expect($scope.chartObject.data.rows.length).toEqual(3);
            //expect($scope.completed).toEqual(2);
            //expect($scope.inProgress).toEqual(6);
            //expect($scope.planned).toEqual(1);
        });


        it('should return an error if repository fails to load projects for chart calculation', function() {
            spyOn(repository, 'getMyProjects').and.returnValue(new promise("Repository Error",false));

            createController();

            expect(repository.getMyProjects).toHaveBeenCalled();
            expect($scope.projects).toEqual({});
            $scope.$apply();
            expect($scope.error).toBeTruthy();
        });

    });

});


