"use strict";

module.exports = (function () {
    function MyDetailsPage() {
        this.myAccountDropdown = $('[data-ng-class="{\'active\': isAtMyAccount() }"] > a');
        this.myDetailsLink = $('[data-ng-click="navigateToMyDetails()"]');

        this.firstNameField = element(by.model("credentials.firstName"));
        this.lastNameField = element(by.model("credentials.lastName"));
        this.twitterUrlField = element(by.model("credentials.twitterUrl"));
        this.linkedInUrlField = element(by.model("credentials.linkedInUrl"));
        this.updateMyDetailsButton = element(by.buttonText("Update My Details"));

        this.bootstrapDialog = $(".modal-dialog");
        this.bootstrapDialogHeader = $(".bootstrap-dialog-title");
        this.bootstrapDialogMessage = $(".bootstrap-dialog-message");
        this.bootstrapDialogOKButton = element(by.buttonText("OK"));

        this.firstNameRequiredError = $('div[data-ng-show="hasValidationError && userDetailsForm.firstName.$error.required"]');
        this.lastNameRequiredError = $('div[data-ng-show="hasValidationError && userDetailsForm.firstName.$error.required"]');
    }

    MyDetailsPage.prototype.goToPage = function () {
        //Refreshes angular, so loses authentication
        //browser.get("/#/myDetails");

        var EC = protractor.ExpectedConditions;
        browser.wait(EC.elementToBeClickable(this.myAccountDropdown), 5000);

        this.myAccountDropdown.click();
        this.myDetailsLink.click();
    };

    MyDetailsPage.prototype.fillFirstName = function (keys) {
        this.firstNameField.clear().sendKeys(keys);
    };

    MyDetailsPage.prototype.fillLastName = function (keys) {
        this.lastNameField.clear().sendKeys(keys);
    };

    MyDetailsPage.prototype.fillTwitterUrl = function (keys) {
        this.twitterUrlField.clear().sendKeys(keys);
    };

    MyDetailsPage.prototype.fillLinkedInUrl = function (keys) {
        this.linkedInUrlField.clear().sendKeys(keys);
    };

    MyDetailsPage.prototype.updateMyDetails = function () {
        this.updateMyDetailsButton.click();
    };

    MyDetailsPage.prototype.isModalDialogDisplayed = function () {
        var EC = protractor.ExpectedConditions;
        return browser.wait(EC.visibilityOf(this.bootstrapDialog), 5000);
    };

    MyDetailsPage.prototype.getModalDialogHeaderText = function () {
        return this.bootstrapDialogHeader.getText();
    };

    MyDetailsPage.prototype.getModalDialogMessageText = function () {
        return this.bootstrapDialogMessage.getText();
    };

    MyDetailsPage.prototype.modalDialogOkButtonClick = function () {
        return this.bootstrapDialogOKButton.click();
    };

    return MyDetailsPage;
})();