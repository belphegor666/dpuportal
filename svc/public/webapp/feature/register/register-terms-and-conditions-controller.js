angular.module('app').controller("registerTermsAndConditionsController", ["$scope", "$q", "$state", "$stateParams", "dal", "$log", function ($scope, $q, $state, $stateParams, dal, $log) {

    if($stateParams.credentials == null) {
        $state.go('login');
    }

    $scope.termsAndConditionsHeading = $$refdata.TERMS_OF_USE.heading;
    $scope.termsAndConditionsBody = $$refdata.TERMS_OF_USE.body;

    $scope.back = function() {
        $state.go('register', {credentials: $stateParams.credentials, confirmEmail: $stateParams.confirmEmail, confirmPassword: $stateParams.confirmPassword});
    }

}]);