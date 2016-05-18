"use strict";

angular.module('app').controller("requirementFormController", ["$scope", "$log", "$state", "$stateParams", "repository", "codeBook",
    function ($scope, $log, $state, $stateParams, repository, codeBook) {
        $scope.baseState = $state.$current.data.baseState;
        $scope.hasValidationError = false;

        //Adds list of types of project to scope
        codeBook.getRequestTypes().then(function(result){
            $scope.projectTypes = result;
        });

        //Adds list of types of funding to scope
        codeBook.getFundingTypes().then(function(result){
            $scope.fundingTypes = result;
        })

        //Adds list of types of project status to scope
        codeBook.getProjectStatuses().then(function(result){
            $scope.projectStatuses = result;
        });

        //Adds list of types of technologies to scope
        codeBook.getTechnologies().then(function(result){
            $scope.technologies = result;
        });

        //All fields need to be shown for a new requirement
        $scope.isReadOnlyMode = false;

        $scope.user = repository.getUser();
        $scope.userRole = $scope.user.systemRole;
        $scope.isAdmin = false;

        if ($scope.userRole == $$refdata.SYSTEM_ROLE.ADMIN) {
            $scope.isAdmin = true;
        }

        if ($stateParams.hasOwnProperty("requirementId") && $stateParams.requirementId != "") {
            $scope.headingText = "Amend Requirement";
            $scope.isAmend = true;

            $scope.project = repository.getSelectedProject();
            //submit button needs to be shown for a Draft requirement
            if ($scope.project.status == $$refdata.PROJECT_STATUS.DRAFT) {
                $scope.showSubmitButton = true;
            }

            if (!$scope.isAdmin && $scope.project.productOwner != $scope.user.email) {
                $scope.isReadOnlyMode = true;
            }

        } else {
            $scope.headingText = "Create New Requirement";
            $scope.project = {};
            $scope.isAmend = false;
            //submit button needs to be shown for a new requirement
            $scope.showSubmitButton = true;

        }

        $scope.submit = function (requirementForm) {
            $scope.project.status = $$refdata.PROJECT_STATUS.SUBMITTED;
            $scope.saveRequirement(requirementForm);
        }

        $scope.saveRequirement = function (requirementForm) {
            $log.debug("requirementFormController: saveRequirement");

            if (!$scope.project.status){
                $scope.project.status = $$refdata.PROJECT_STATUS.DRAFT;
            }

            if (requirementForm.$valid) {
                $scope.hasValidationError = false;
                delete $scope.project.priority;
                delete $scope.project.statusDescription;
                console.log($scope.project);
                repository.saveProject($scope.project).then(function () {
                    BootstrapDialog.show({
                        message: 'Requirement Saved successfully',
                        type: BootstrapDialog.TYPE_SUCCESS,
                        buttons: [{
                            label: 'New Requirement',
                            cssClass: 'btn-default',
                            autospin: false,
                            action: function (dialogRef) {
                                $scope.project = {};
                                $scope.$apply();
                                dialogRef.close();
                            }
                        }, {
                            label: 'OK',
                            cssClass: 'btn-success',
                            action: function (dialogRef) {
                                dialogRef.close();
                                $state.go($scope.baseState);
                            }
                        }]
                    });
                }, function (error) {
                    // waitingDialog.close();
                    BootstrapDialog.alert({
                        title: "Error",
                        message: error,
                        type: BootstrapDialog.TYPE_DANGER
                    });
                    $state.go($scope.baseState);
                });
            } else {
                $scope.hasValidationError = true;
            }
        };


        /**
         * Cancel and return to manage requirement
         */
        $scope.cancel = function () {
            $log.debug("requirementFormController - User selected cancel.  Returning to manage requirements");
            //$state.go($scope.baseState);
            window.history.back();
        }

        // Data options for target date
        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

        // the display format for the date
        $scope.dateFormat = "dd-MM-yyyy";

        // Disable weekend selection
        $scope.disabled = function (date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.maxDate = new Date(2020, 5, 22);

        $scope.openTargetDate = function () {
            if($scope.isReadOnlyMode) {
                $scope.targetDateOpened = false;
            } else {
                $scope.targetDateOpened = true;
            }

        };

        $scope.parseFloat = function(field) {
            $scope.project[field] = parseFloat($scope.project[field]);
            if($scope.project[field] == "NaN") {
                $scope.project[field] = undefined;
            }
        };

        $scope.back = function() {
            var previousBaseState = repository.getPreviousBaseState();
            if(previousBaseState == "requirement-dashboard") {
                $state.go("requirement-dashboard");
            } else if(previousBaseState == "home.executive-dashboard") {
                $state.go("home.executive-dashboard");
            } else if(previousBaseState == "teams.home") {
                $state.go("teams.home");
            }
        };

    }]);
