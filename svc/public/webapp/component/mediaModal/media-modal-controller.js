angular.module("app").controller('mediaModalController', ["$scope", "$timeout", "$sce", "mediaUrl", "$uibModalInstance", "$window", function($scope, $timeout, $sce, mediaUrl, $uibModalInstance, $window) {

    $scope.media = {
        src: $sce.trustAsResourceUrl(mediaUrl)
    };

    $scope.closeModal = function() {
        $uibModalInstance.dismiss('cancel');
    };

}]);