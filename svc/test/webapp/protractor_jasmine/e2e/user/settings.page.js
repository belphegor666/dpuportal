"use strict";

module.exports = (function () {
    function SettingsPage() {
        this.myAccountDropdown = $('[data-ng-class="{\'active\': isAtMyAccount() }"] > a');
        this.settingsLink = $('[data-ng-click="navigateToSettings()"]');

        this.homepagePreferenceDropdown = element(by.model("userPreferences.homePagePreference"));
        this.saveButton = element(by.buttonText("Save"));
    }

    SettingsPage.prototype.goToPage = function () {
        //Somehow getting refreshed and losing authentication, so this doesn't work as it gets redirected straight away back to login
        //browser.get("/#/settings");
        this.myAccountDropdown.click();
        this.settingsLink.click();
    };

    SettingsPage.prototype.selectHomepagePreference = function (value) {
        element(by.cssContainingText('option', value)).click();
    };

    SettingsPage.prototype.saveHomepagePreference = function () {
        this.saveButton.click();
    };

    return SettingsPage;
})();
