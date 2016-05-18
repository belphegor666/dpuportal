"use strict";

// "Register" Page Object containing functions to perform actions on the Register page.

// Node.js 'export', which exposes this Page Object module (a psuedo-class) as a constructor, for use by the tests.
module.exports = (function () {
    function RegisterPage() {
        this.firstNameField = element(by.model("credentials.firstName"));
        this.lastNameField = element(by.model("credentials.lastName"));
        this.telephoneField = element(by.model("credentials.telephone"));
        this.emailField = element(by.model("credentials.email"));
        this.confirmEmailField = element(by.model("confirmEmail"));
        this.passwordField = element(by.model("credentials.password"));
        this.confirmPasswordField = element(by.model("confirmPassword"));
        this.termsAndConditionsCheckbox = element(by.model("accepted"));
        this.termsAndConditionsLink = element(by.linkText("Terms And Conditions"));
        this.registerButton = element(by.buttonText("Register"));

        this.bootstrapDialog = $(".modal-dialog");
        this.bootstrapDialogHeader = $(".bootstrap-dialog-title");
        this.bootstrapDialogMessage = $(".bootstrap-dialog-message");
        this.bootstrapDialogOKButton = element(by.buttonText("OK"));
        this.bootstrapDialogGoToLoginButton = element(by.buttonText("Go to login"));

        // Error messages
        this.firstNameRequiredError = $('div[data-ng-show="hasValidationError && registerForm.forename.$error.required"]');
        this.lastNameRequiredError = $('div[data-ng-show="hasValidationError && registerForm.surname.$error.required"]');
        this.telephoneRequiredError = $('div[data-ng-show="hasValidationError && registerForm.telephone.$error.required"]');
        this.telephonePatternError = $('div[data-ng-show="hasValidationError && registerForm.telephone.$error.pattern"]');
        this.emailRequiredError = $('div[data-ng-show="hasValidationError && registerForm.email.$error.required"]');
        this.emailPatternError = $('div[data-ng-show="hasValidationError && registerForm.email.$error.email"]');
        this.confirmEmailRequiredError = $('div[data-ng-show="hasValidationError && registerForm.confirmemail.$error.required"]');
        this.confirmEmailMatchError = $('div[data-ng-show="visitedEmail && registerForm.confirmemail.$error.match"]');
        this.passwordRequiredError = $('div[data-ng-show="hasValidationError && registerForm.password.$error.required"]');
        this.passwordPatternError = $('div[data-ng-show="hasValidationError && registerForm.password.$error.pattern"]');
        this.confirmPasswordRequiredError = $('div[data-ng-show="hasValidationError && registerForm.confirmpassword.$error.required"]');
        this.confirmPasswordMatchError = $('div[data-ng-show="visitedPassword && registerForm.confirmpassword.$error.match"]');
        this.termsAndConditionsUncheckedError = $('div[data-ng-show="hasValidationError && registerForm.termsandconditionscheckbox.$error.required"]');
    }

    RegisterPage.prototype.goToPage = function () {
        browser.get("/#/register");
    };

    RegisterPage.prototype.fillFirstName = function (firstName) {
        this.firstNameField.clear().sendKeys(firstName);
    };

    RegisterPage.prototype.fillLastName = function (lastName) {
        this.lastNameField.clear().sendKeys(lastName);
    };

    RegisterPage.prototype.fillTelephone = function (telephone) {
        this.telephoneField.clear().sendKeys(telephone);
    };

    RegisterPage.prototype.fillEmail = function (email) {
        this.emailField.clear().sendKeys(email);
    };

    RegisterPage.prototype.fillConfirmEmail = function (confirmEmail) {
        this.confirmEmailField.clear().sendKeys(confirmEmail);
    };

    RegisterPage.prototype.fillPassword = function (password) {
        this.passwordField.clear().sendKeys(password);
    };

    RegisterPage.prototype.fillConfirmPassword = function (confirmPassword) {
        this.confirmPasswordField.clear().sendKeys(confirmPassword);
    };

    RegisterPage.prototype.clickTermsAndConditionsCheckBox = function () {
        this.termsAndConditionsCheckbox.click();
    };

    RegisterPage.prototype.clickTermsAndConditionsLink = function () {
        this.termsAndConditionsLink.click();
    };

    RegisterPage.prototype.register = function () {
        this.registerButton.click();
    };

    RegisterPage.prototype.isModalDialogDisplayed = function () {
        var EC = protractor.ExpectedConditions;
        return browser.wait(EC.visibilityOf(this.bootstrapDialog), 5000);
    };

    RegisterPage.prototype.getModalDialogHeaderText = function () {
        return this.bootstrapDialogHeader.getText();
    };

    RegisterPage.prototype.getModalDialogMessageText = function () {
        return this.bootstrapDialogMessage.getText();
    };

    RegisterPage.prototype.modalDialogOkButtonClick = function () {
        return this.bootstrapDialogOKButton.click();
    };

    RegisterPage.prototype.modalDialogGoToLoginButtonClick = function () {
        return this.bootstrapDialogGoToLoginButton.click();
    };

    return RegisterPage;
})();