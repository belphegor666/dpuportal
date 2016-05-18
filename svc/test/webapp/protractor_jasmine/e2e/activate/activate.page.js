"use strict";

// "Activate" Page Object containing functions to perform actions on the Activate page.

// Node.js 'export', which exposes this Page Object module (a psuedo-class) as a constructor, for use by the tests.
module.exports = (function () {
    function ActivatePage() {
        this.messageArea = element(by.binding("message"));
        this.loginButton = element(by.buttonText("Go to Login"));
    }

    ActivatePage.prototype.goToPage = function (activationKey) {
        browser.get("/#/activate?key=" + activationKey);
    };

    ActivatePage.prototype.getMessageText = function () {
        return this.messageArea.getText();
    };

    ActivatePage.prototype.login = function () {
        this.loginButton.click();
    };

    return ActivatePage;
})();
