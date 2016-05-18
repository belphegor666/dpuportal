"use strict";

var pageUrlBase = "../";

// Node.js 'require', which loads the "Login" Page Object module for use in tests.
var LoginPage = require(pageUrlBase + "login/login.page.js");
var LogoutPage = require(pageUrlBase + "logout/logout.page.js");
var RequirementPage = require(pageUrlBase + "requirement/requirement.page.js");

// Load the test data loader module.
var TestDataLoader = require("../load-test-data.js");

// End-to-end test specifications written in Jasmine syntax.
describe("At login", function () {
    // Create a new instance of each page object
    var loginPage = new LoginPage();
    var logoutPage = new LogoutPage();
    var requirementPage = new RequirementPage();

    // Create a new instance of the test data loader
    var testDataLoader = new TestDataLoader();

    beforeAll(function () {
        // Call REST service to initialize database with test data
        testDataLoader.loadTestData();
    });

    // Setup test fixture (analogous to a JUnit '@Before' annotated method)
    beforeEach(function () {
        // Start from the Login page
        loginPage.goToPage();
        browser.waitForAngular();
    });

    it("should login and then logout", function () {
        loginPage.fillUsername("delivery@example.com");
        loginPage.fillPassword("password1");
        loginPage.login();

        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toMatch("/requirements");

        logoutPage.logout();
        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toMatch("/login");
    });

    it("should login as one user, logout then login as another user and check that cache has been cleared", function () {
        loginPage.fillUsername("delivery@example.com");
        loginPage.fillPassword("password1");
        loginPage.login();

        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toMatch("/requirements");
        expect(requirementPage.getMyProjects().count()).toEqual(7);

        logoutPage.logout();
        browser.waitForAngular();

        loginPage.fillUsername("approver@example.com");
        loginPage.fillPassword("password1");
        loginPage.login();

        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toMatch("/developer");

        requirementPage.requirementButtonClick();
        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toMatch("/requirements");

        expect(requirementPage.getMyProjects().count()).toEqual(0);
    });

});

