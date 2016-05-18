"use strict";

var pageUrlBase = "../";

var ForgotPasswordPage = require(pageUrlBase + "forgot-password/forgot-password.page.js")

// Load the test data loader module.
var TestDataLoader = require("../load-test-data.js");


// End-to-end test specifications written in Jasmine syntax.
describe("At forgot password page", function () {
    // Create a new instance of the "Forgot Password" Page Object
    var page = new ForgotPasswordPage();

    // Create a new instance of the test data loader
    var testDataLoader = new TestDataLoader();

    // Call REST service to initialize database with test data
    testDataLoader.loadTestData();

    // Setup test fixture (analogous to a JUnit '@Before' annotated method)
    beforeEach(function () {
        // Start from the Login page
        page.goToPage();
    });

    it("should show a modal popup saying email has been sent with new temporary password for existing email", function() {
        page.fillEmail("originator@example.com");
        page.submit();

        // Check that an "Success" dialog is displayed
        expect(page.isModalDialogDisplayed()).toBe(true);
        expect(page.getModalDialogMessageText()).toMatch('If the email you entered is registered, it will be sent a temporary password.\nPlease change your password once you have logged in.');

        // Page should not change
        page.modalDialogOkButtonClick();
        expect(browser.getCurrentUrl()).toMatch("/login");
    });

    it("should show a modal popup saying the user has not yet registered for non existing email", function() {
        page.fillEmail("anyemail@example.com");
        page.submit();

        // Check that an "Error" dialog is displayed
        expect(page.isModalDialogDisplayed()).toBe(true);
        expect(page.getModalDialogMessageText()).toMatch('You have not yet registered');

        // Page should not change
        page.modalDialogOkButtonClick();
        expect(browser.getCurrentUrl()).toMatch("/login");
    });

    it("should show a modal popup saying email must be activated first", function() {
        page.fillEmail("unactivated@example.com");
        page.submit();

        // Check that an "Error" dialog is displayed
        expect(page.isModalDialogDisplayed()).toBe(true);
        expect(page.getModalDialogMessageText()).toMatch('You have not yet activated your registered email');

        // Page should not change
        page.modalDialogOkButtonClick();
        expect(browser.getCurrentUrl()).toMatch("/login");
    });

   it("should show the email is a required field and can not be blank", function() {
        page.submit();

        expect(page.emailRequiredError.isDisplayed()).toBe(true);
        expect(page.emailPatternError.isDisplayed()).toBe(false);
    });

    it("should show the email is in an invalid format error", function() {
        page.fillEmail("example");
        page.submit();

        expect(page.emailRequiredError.isDisplayed()).toBe(false);
        expect(page.emailPatternError.isDisplayed()).toBe(true);
    });

});
