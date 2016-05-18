"use strict";

var pageUrlBase = "../";

// Node.js 'require', which loads the "Login" Page Object module for use in tests.
var LoginPage = require(pageUrlBase + "login/login.page.js");

// Load the test data loader module.
var TestDataLoader = require("../load-test-data.js");


// End-to-end test specifications written in Jasmine syntax.
describe("At login", function () {
    // Create a new instance of the "Login" Page Object
    var page = new LoginPage();

    // Create a new instance of the test data loader
    var testDataLoader = new TestDataLoader();

    beforeAll(function () {
        // Call REST service to initialize database with test data
        testDataLoader.loadTestData();
    });

    // Setup test fixture (analogous to a JUnit '@Before' annotated method)
    beforeEach(function () {
        // Start from the Login page
        page.goToPage();
        browser.waitForAngular();
    });

    it('should go to the welcome page for a newly registered user', function() {
        //Test data is already created replicating a newly registered user
        page.fillUsername("newregistereduser@atos.net");
        page.fillPassword("password1");
        page.login();

        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toMatch("/welcome");
    });

    it("should go to the requirements homepage when that is set as the user preference", function () {
        page.fillUsername("delivery@example.com");
        page.fillPassword("password1");
        page.login();

        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toMatch("/requirements");
    });

    it("should go to the developer homepage when that is set as the user preference", function () {
        page.fillUsername("approver@example.com");
        page.fillPassword("password1");
        page.login();

        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toMatch("/developer");
    });

    it("should go to the projects homepage when that is set as the user preference", function () {
        page.fillUsername("originator@example.com");
        page.fillPassword("password1");
        page.login();

        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toMatch("/projects");
    });

    it("should go to the change password page when the user has reset his password", function () {
        page.fillUsername("fakeuser@atos.net");
        page.fillPassword("password1");
        page.login();

        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toMatch("/change-password");
    });

    it("should show an error message if the password is incorrect", function () {
        page.fillUsername("approver@example.com");
        page.fillPassword("password2");
        page.login();

        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toMatch("/login");
        expect(page.usernameRequiredError.isDisplayed()).toBe(false);
        expect(page.passwordRequiredError.isDisplayed()).toBe(false);
        expect(page.invalidLoginError.isDisplayed()).toBe(true);
    });

    it("should show an error message if the username is not activated or not recognised", function () {
        page.fillUsername("owner@example.com");
        page.fillPassword("password1");
        page.login();

        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toMatch("/login");
        expect(page.usernameRequiredError.isDisplayed()).toBe(false);
        expect(page.passwordRequiredError.isDisplayed()).toBe(false);
        expect(page.invalidLoginError.isDisplayed()).toBe(true);
    });

    it("should show a validation error if the username is blank", function () {
        page.fillPassword("password1");
        page.login();

        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toMatch("/login");
        expect(page.usernameRequiredError.isDisplayed()).toBe(true);
        expect(page.passwordRequiredError.isDisplayed()).toBe(false);
        expect(page.invalidLoginError.isDisplayed()).toBe(false);
    });

    it("should show a validation error if the password is blank", function () {
        page.fillUsername("originator@example.com");
        page.login();

        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toMatch("/login");
        expect(page.usernameRequiredError.isDisplayed()).toBe(false);
        expect(page.passwordRequiredError.isDisplayed()).toBe(true);
        expect(page.invalidLoginError.isDisplayed()).toBe(false);
    });

    it("should show validation errors if both the username and password are blank", function () {
        page.login();

        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toMatch("/login");
        expect(page.usernameRequiredError.isDisplayed()).toBe(true);
        expect(page.passwordRequiredError.isDisplayed()).toBe(true);
        expect(page.invalidLoginError.isDisplayed()).toBe(false);
    });

    it("should go to registration page", function () {
        page.register();
        expect(browser.getCurrentUrl()).toMatch("/register");
    });

    it("should go to forgot password page", function () {
        page.forgotPassword();
        expect(browser.getCurrentUrl()).toMatch("/forgot-password");
    });
});

