"use strict";

var pageUrlBase = "../";

// Node.js 'requires', which load Page Object modules for use in tests.
var LoginPage = require("../login/login.page.js");
var RegisterPage = require(pageUrlBase + "register/register.page.js");
var RegisterTermsAndConditionsPage = require(pageUrlBase + "register/register-terms-and-conditions.page.js");
var TestDataLoader = require("../load-test-data.js");


// End-to-end test specifications written in Jasmine syntax.
describe("At login", function () {
    //Reset the test database
    var testDataLoader = new TestDataLoader();

    beforeAll(function () {
        testDataLoader.loadTestData();
    })

    // Create a new instance of the "Login" Page Object
    var page = new LoginPage();

    it("should go to the Register page if the Register button is clicked", function () {
        // Start from the Login page
        page.goToPage();
        page.register();
        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toMatch("/register");
    });
});

describe("At register", function () {
    // Create a new instance of the "Register" Page Object
    var page = new RegisterPage();

    // Setup test fixture (analogous to a JUnit '@Before' annotated method)
    beforeEach(function () {
        // Start from the Register page
        page.goToPage();
    });

    it("should go successfully register if the form has no validation errors", function () {
        // No need to select a Title because it defaults to "Mr"
        page.fillFirstName("New");
        page.fillLastName("User");
        page.fillTelephone("01234567890");
        page.fillEmail("newuser@atos.net");
        page.fillConfirmEmail("newuser@atos.net");
        page.fillPassword("password1");
        page.fillConfirmPassword("password1");
        page.clickTermsAndConditionsCheckBox();
        page.register();

        expect(page.isModalDialogDisplayed()).toBe(true);
        expect(page.getModalDialogMessageText()).toEqual("Registration is successful. A validation link has been sent to your email");

        page.modalDialogOkButtonClick();

        expect(browser.getCurrentUrl()).toMatch("/login");
    });

    it("should output an already exists error dialog box if the email already exists", function () {
        // No need to select a Title because it defaults to "Mr"
        page.fillFirstName("Fake");
        page.fillLastName("User");
        page.fillTelephone("01234567890");
        page.fillEmail("fakeuser@atos.net");
        page.fillConfirmEmail("fakeuser@atos.net");
        page.fillPassword("password1");
        page.fillConfirmPassword("password1");
        page.clickTermsAndConditionsCheckBox();
        page.register();

        // Check that an "Error" dialog is displayed
        expect(page.isModalDialogDisplayed()).toBe(true);
        expect(page.getModalDialogMessageText()).toMatch(/User already exists/);

        // Page should go to login page
        page.modalDialogGoToLoginButtonClick();
        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toMatch("/login");
    });

    it("should output an error dialog box if the email domain is not part of the whitelist", function () {
        // No need to select a Title because it defaults to "Mr"
        page.fillFirstName("Origin");
        page.fillLastName("Ator");
        page.fillTelephone("01234567890");
        page.fillEmail("originator@whitelistexample.com");
        page.fillConfirmEmail("originator@whitelistexample.com");
        page.fillPassword("password1");
        page.fillConfirmPassword("password1");
        page.clickTermsAndConditionsCheckBox();
        page.register();

        // Check that an "Error" dialog is displayed
        expect(page.isModalDialogDisplayed()).toBe(true);
        expect(page.getModalDialogMessageText()).toMatch('Your email domain is not allowed at this moment in time. Please check back later');

        // Page should not change
        page.modalDialogOkButtonClick();
        expect(browser.getCurrentUrl()).toMatch("/register");
    });

    it("should show a 'required' error message for every required text field", function () {
        page.register();

        // All "required" text field error messages should be shown
        expect(page.firstNameRequiredError.isDisplayed()).toBe(true);
        expect(page.lastNameRequiredError.isDisplayed()).toBe(true);
        expect(page.telephoneRequiredError.isDisplayed()).toBe(true);
        expect(page.emailRequiredError.isDisplayed()).toBe(true);
        expect(page.confirmEmailRequiredError.isDisplayed()).toBe(true);
        expect(page.passwordRequiredError.isDisplayed()).toBe(true);
        expect(page.confirmPasswordRequiredError.isDisplayed()).toBe(true);
        expect(page.termsAndConditionsUncheckedError.isDisplayed()).toBe(true);

        // Other validation error messages should not be shown
        expect(page.telephonePatternError.isDisplayed()).toBe(false);
        expect(page.emailPatternError.isDisplayed()).toBe(false);
        expect(page.confirmEmailMatchError.isDisplayed()).toBe(false);
        expect(page.passwordPatternError.isDisplayed()).toBe(false);
        expect(page.confirmPasswordMatchError.isDisplayed()).toBe(false);
    });

    it("should show a validation error message for every field requiring a particular pattern", function () {
        page.fillFirstName("Origi");
        page.fillLastName("Nator");
        page.fillTelephone("abcdefghijk");
        page.fillEmail("originator");
        page.fillConfirmEmail("originator");
        page.fillPassword("password");
        page.fillConfirmPassword("password");
        page.clickTermsAndConditionsCheckBox();
        page.register();

        // All "required" text field error messages should not be shown
        expect(page.firstNameRequiredError.isDisplayed()).toBe(false);
        expect(page.lastNameRequiredError.isDisplayed()).toBe(false);
        expect(page.telephoneRequiredError.isDisplayed()).toBe(false);
        expect(page.emailRequiredError.isDisplayed()).toBe(false);
        expect(page.confirmEmailRequiredError.isDisplayed()).toBe(false);
        expect(page.passwordRequiredError.isDisplayed()).toBe(false);
        expect(page.confirmPasswordRequiredError.isDisplayed()).toBe(false);
        expect(page.termsAndConditionsUncheckedError.isDisplayed()).toBe(false);

        // Only pattern validation error messages should be shown
        expect(page.telephonePatternError.isDisplayed()).toBe(true);
        expect(page.emailPatternError.isDisplayed()).toBe(true);
        expect(page.confirmEmailMatchError.isDisplayed()).toBe(false);
        expect(page.passwordPatternError.isDisplayed()).toBe(true);
        expect(page.confirmPasswordMatchError.isDisplayed()).toBe(false);
    });

    it("should show a match error if Email and Confirm Email fields do not match", function () {
        page.fillFirstName("Origi");
        page.fillLastName("Nator");
        page.fillTelephone("01234567890");
        page.fillEmail("originator@example.com");
        page.fillConfirmEmail("approver@example.com");
        page.fillPassword("password1");
        page.fillConfirmPassword("password1");
        page.clickTermsAndConditionsCheckBox();
        page.register();

        // Only the email matching error message should be shown
        expect(page.confirmEmailMatchError.isDisplayed()).toBe(true);
        expect(page.confirmPasswordMatchError.isDisplayed()).toBe(false);
    });

    it("should show a match error if Password and Confirm Password fields do not match", function () {
        page.fillFirstName("Origi");
        page.fillLastName("Nator");
        page.fillTelephone("01234567890");
        page.fillEmail("originator@example.com");
        page.fillConfirmEmail("originator@example.com");
        page.fillPassword("password1");
        page.fillConfirmPassword("password2");
        page.clickTermsAndConditionsCheckBox();
        page.register();

        // Only the password matching error message should be shown
        expect(page.confirmEmailMatchError.isDisplayed()).toBe(false);
        expect(page.confirmPasswordMatchError.isDisplayed()).toBe(true);
    });
});

describe("At terms and conditions", function () {
    // Create a new instance of the "Register" Page Object
    var registerPage = new RegisterPage();

    // Create a new instance of the "Register Terms and Conditions" Page Object
    var registerTermsAndConditionsPage = new RegisterTermsAndConditionsPage();

    // Create a new instance of the test data loader
    var testDataLoader = new TestDataLoader();

    // Call REST service to initialize database with test data
    testDataLoader.loadTestData();

    // Setup test fixture (analogous to a JUnit '@Before' annotated method)
    beforeEach(function () {
        // Populate the registration form (it must be submitted successfully to reach the Terms and Conditions page)
        registerPage.goToPage();
    });

    it("should go to the terms and conditions page", function () {
        registerPage.clickTermsAndConditionsLink();

        expect(browser.getCurrentUrl()).toMatch("/register/terms-and-conditions");
    });

    it("should go to the terms and conditions page and then return", function () {
        registerPage.clickTermsAndConditionsLink();
        browser.waitForAngular();

        // Go back to the registration page
        registerTermsAndConditionsPage.back();

        expect(browser.getCurrentUrl()).toMatch("/register");
    });

    it("should enter user details and save them when the user goes into terms and conditions then back", function () {
        registerPage.fillFirstName("New");
        registerPage.fillLastName("User");
        registerPage.fillTelephone("01234567890");
        registerPage.fillEmail("newfakeuser@atos.net");
        registerPage.fillConfirmEmail("newfakeuser@atos.net");
        registerPage.fillPassword("password1");
        registerPage.fillConfirmPassword("password1");

        registerPage.clickTermsAndConditionsLink();
        browser.waitForAngular();

        registerTermsAndConditionsPage.back();

        expect(registerPage.firstNameField.getAttribute("value")).toEqual("New");
        expect(registerPage.lastNameField.getAttribute("value")).toEqual("User");
        expect(registerPage.telephoneField.getAttribute("value")).toEqual("01234567890");
        expect(registerPage.emailField.getAttribute("value")).toEqual("newfakeuser@atos.net");
        expect(registerPage.confirmEmailField.getAttribute("value")).toEqual("newfakeuser@atos.net");
        expect(registerPage.passwordField.getAttribute("value")).toEqual("password1");
        expect(registerPage.confirmPasswordField.getAttribute("value")).toEqual("password1");
    });
});
