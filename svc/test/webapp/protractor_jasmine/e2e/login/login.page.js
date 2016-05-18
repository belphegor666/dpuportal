"use strict";

// "Login" Page Object containing functions to perform actions on the Login page.

// Node.js 'export', which exposes this Page Object module (a psuedo-class) as a constructor, for use by the tests.

// (Syntax note: The function is enclosed in parentheses and there is a '()' at the end. This syntax, (function () {...})(),
// defines an (in this case) anonymous function that is called immediately with no arguments (the '()' bit). This is
// often referred to as an Immediately Invoked Function Expression, or IIFE. Here, function is interpreted as an expression
// or operator, not a statement declaring the function, so it can be invoked with ().)
module.exports = (function () {
    function LoginPage() {
        this.usernameField = element(by.model("credentials.username"));
        this.passwordField = element(by.model("credentials.password"));
        this.loginButton = element(by.buttonText("Login"));
        this.registerButton = element(by.buttonText("Register"));
        this.forgotPasswordButton = element(by.buttonText("Forgot Password"));

        //Error Messages
        this.usernameRequiredError = $('div[data-ng-show="hasValidationError && loginForm.username.$error.required"]');
        this.passwordRequiredError = $('div[data-ng-show="hasValidationError && loginForm.password.$error.required"]');
        this.invalidLoginError = $('div[data-ng-show="hasAuthenticationError"]');
    }

    LoginPage.prototype.goToPage = function () {
        browser.get("/");
    };

    LoginPage.prototype.fillUsername = function (username) {
        this.usernameField.clear().sendKeys(username);
    };

    LoginPage.prototype.fillPassword = function (password) {
        this.passwordField.clear().sendKeys(password);
    };

    LoginPage.prototype.login = function () {
        this.loginButton.click();
    };

    LoginPage.prototype.register = function () {
        this.registerButton.click();
    };

    LoginPage.prototype.forgotPassword = function () {
        this.forgotPasswordButton.click();
    };

    return LoginPage;
})();
