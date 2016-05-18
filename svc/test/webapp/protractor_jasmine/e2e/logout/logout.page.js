"use strict";

module.exports = (function () {
    function LogoutPage() {
        this.myAccountDropdown = $('[data-ng-class="{\'active\': isAtMyAccount() }"] > a');
        this.logoutButton = $('[data-ng-click="logout()"]');
    };

    LogoutPage.prototype.logout = function () {
        this.myAccountDropdown.click();
        this.logoutButton.click();
    };

    return LogoutPage;
})();
