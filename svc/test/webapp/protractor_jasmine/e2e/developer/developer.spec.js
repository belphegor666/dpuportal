"use strict";

var pageUrlBase = "../";

var LoginPage = require(pageUrlBase + "login/login.page.js");

var DeveloperPage = require(pageUrlBase + "developer/developer.page.js")

// Load the test data loader module.
var TestDataLoader = require("../load-test-data.js");

// End-to-end test specifications written in Jasmine syntax.
describe("At Developer page", function () {
    var loginPage = new LoginPage();
    var developerPage = new DeveloperPage();

    // Create a new instance of the test data loader
    var testDataLoader = new TestDataLoader();

    beforeAll(function () {
        // Call REST service to initialize database with test data
        testDataLoader.loadTestData();

        //Log in before starting tests
        loginPage.goToPage();
        browser.waitForAngular();

        loginPage.fillUsername("approver@example.com");
        loginPage.fillPassword("password1");
        loginPage.login();

        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toMatch("/developer/projects");
    });

    // Setup test fixture (analogous to a JUnit '@Before' annotated method)
    beforeEach(function () {
        // Start from the Login page
        developerPage.goToMyTasks();
        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toMatch("/myTasks");
    });

    it("should list two records in the my tasks screen", function () {
        //projects having sprint joined by the user in test data
        expect(developerPage.getMyTasks().count()).toEqual(3);
    });



});
