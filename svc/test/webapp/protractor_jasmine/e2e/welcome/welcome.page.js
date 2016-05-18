"use strict";

module.exports = (function () {

    function WelcomePage() {
        this.welcomeTab = $('[data-ng-click="navigateToWelcome()"]');

        this.productOwnerButton = $('[data-ng-click="changeHomepage(\'REQUIREMENT\')"]');
        this.developerButton = $('[data-ng-click="changeHomepage(\'DEVELOPER\')"]');
        this.executiveButton = $('[data-ng-click="changeHomepage(\'EXECUTIVE\')"]');
    }

    WelcomePage.prototype.clickElement = function(element) {
        return element.click();
    };

    return WelcomePage;
})();
