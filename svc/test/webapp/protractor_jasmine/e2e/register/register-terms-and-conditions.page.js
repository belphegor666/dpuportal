"use strict";

// "Register Terms and Conditions" Page Object containing functions to perform actions on the Terms and Conditions page.

// Node.js 'export', which exposes this Page Object module (a psuedo-class) as a constructor, for use by the tests.
module.exports = (function () {
    function RegisterTermsAndConditionsPage() {
        this.backButton = element(by.buttonText("Back"));
    }

    RegisterTermsAndConditionsPage.prototype.goToPage = function () {
        browser.get("/#/register/terms-and-conditions");
    };

    RegisterTermsAndConditionsPage.prototype.back = function () {
        this.backButton.click();
    };

    return RegisterTermsAndConditionsPage;
})();
