"use strict";

module.exports = (function () {
    function ForgotPasswordPage() {

        this.emailField = element(by.model("credentials.email"));
        this.submitButton = element(by.buttonText("Submit"));

        this.bootstrapDialog = $(".modal-dialog");
        this.bootstrapDialogHeader = $(".bootstrap-dialog-title");
        this.bootstrapDialogMessage = $(".bootstrap-dialog-message");
        this.bootstrapDialogOKButton = element(by.buttonText("OK"));

        this.emailRequiredError = $('div[data-ng-show="hasValidationError && forgotPasswordForm.email.$error.required"]');
        this.emailPatternError = $('div[data-ng-show="hasValidationError && forgotPasswordForm.email.$error.email"]');

    }

    ForgotPasswordPage.prototype.goToPage = function () {
        browser.get("/#/forgot-password");
    };

    ForgotPasswordPage.prototype.fillEmail = function (email) {
        this.emailField.clear().sendKeys(email);
    };

    ForgotPasswordPage.prototype.submit = function () {
        this.submitButton.click();
    };

    ForgotPasswordPage.prototype.isModalDialogDisplayed = function () {
        var EC = protractor.ExpectedConditions;
        return browser.wait(EC.visibilityOf(this.bootstrapDialog), 5000);
    };

    ForgotPasswordPage.prototype.getModalDialogHeaderText = function () {
        return this.bootstrapDialogHeader.getText();
    };

    ForgotPasswordPage.prototype.getModalDialogMessageText = function () {
        return this.bootstrapDialogMessage.getText();
    };

    ForgotPasswordPage.prototype.modalDialogOkButtonClick = function () {
        return this.bootstrapDialogOKButton.click();
    };

    return ForgotPasswordPage;
})();