"use strict";

angular.module("app").controller("showcaseController", ["$scope", "$state", "$log", "securityManager", "$uibModal", "$location", "repository", function ($scope, $state, $log, securityManager, $uibModal, $location, repository) {

    $scope.item = 'All';

    $scope.refdata = $$refdata;

    $scope.articles = [];

    repository.getShowcases().then(function(response) {
        $scope.articles = response;
    });

    $scope.navigateToPage = function(url) {
        $location.path("/" + url);
    };

    $scope.showCategory = function(category) {
        if($scope.item == 'All' || $scope.item == category) {
            return true;
        } else {
            return false;
        }
    };

    $scope.showMedia = function(mediaUrl) {
        var templateUrl = 'component/mediaModal/media-modal.html';
        var extensionLength = mediaUrl.lastIndexOf(".");
        var extension = mediaUrl.slice(1 - (mediaUrl.length - extensionLength));

        if (extension == "png" || extension == "jpg" || extension == "jpeg" || extension == "bmp") {
            templateUrl = 'component/mediaModal/image-modal.html';
        }

        $uibModal.open({
            templateUrl: templateUrl,
            controller: 'mediaModalController',
            windowClass: 'showcase-modal',
            resolve: {
                mediaUrl: function() { return mediaUrl; }
            }
        });
    }

    $scope.back = function () {
        $log.debug("showcaseController - User selected Back.  Returning to showcase");
        $state.go("home.showcase");
        //window.history.back();
    }

}]);
