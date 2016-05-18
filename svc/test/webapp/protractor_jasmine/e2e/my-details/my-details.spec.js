"use strict";

var pageUrlBase = "../";

var LoginPage = require(pageUrlBase + "login/login.page.js");

var MyDetailsPage = require(pageUrlBase + "my-details/my-details.page.js")

// Load the test data loader module.
var TestDataLoader = require("../load-test-data.js");

// End-to-end test specifications written in Jasmine syntax.
describe("At My Details page", function () {
    var loginPage = new LoginPage();
    var myDetailsPage = new MyDetailsPage();

    // Create a new instance of the test data loader
    var testDataLoader = new TestDataLoader();

    // Call REST service to initialize database with test data
    testDataLoader.loadTestData();

    beforeAll(function () {
        //Log in before starting tests
        loginPage.goToPage();
        browser.waitForAngular();

        loginPage.fillUsername("delivery@example.com");
        loginPage.fillPassword("password1");
        loginPage.login();

        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toMatch("/requirements");
    });

    // Setup test fixture (analogous to a JUnit '@Before' annotated method)
    beforeEach(function () {
        // Start from the Login page
        myDetailsPage.goToPage();
        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toMatch("/myDetails");
    });

    it("should populate the user details fields by default", function() {
        expect(myDetailsPage.firstNameField.getAttribute("value")).toEqual("Deli");
        expect(myDetailsPage.lastNameField.getAttribute("value")).toEqual("Very");
        expect(myDetailsPage.twitterUrlField.getAttribute("value")).toEqual("");
        expect(myDetailsPage.linkedInUrlField.getAttribute("value")).toEqual("");
    });

    it("should show a modal popup saying user details have been changed", function() {
        myDetailsPage.fillFirstName("Jane");
        myDetailsPage.fillLastName("Doe");
        myDetailsPage.fillTwitterUrl("jane.doe");
        myDetailsPage.fillLinkedInUrl("jane@doe");

        myDetailsPage.updateMyDetails();

        browser.waitForAngular();

        expect(myDetailsPage.isModalDialogDisplayed()).toBe(true);
        expect(myDetailsPage.getModalDialogMessageText()).toMatch('Your Account Details have been successfully changed');

        // Page should not change
        myDetailsPage.modalDialogOkButtonClick();
        expect(browser.getCurrentUrl()).toMatch("/myDetails");

    });

    it("should populate the my details page with the correct details once changed", function() {
        //Refreshes angular and loses authentication and user data
        browser.get("#/login");

        browser.waitForAngular();

        loginPage.fillUsername("delivery@example.com");
        loginPage.fillPassword("password1");
        loginPage.login();

        browser.waitForAngular();

        myDetailsPage.goToPage();
        browser.waitForAngular();

        expect(myDetailsPage.firstNameField.getAttribute("value")).toEqual("Jane");
        expect(myDetailsPage.lastNameField.getAttribute("value")).toEqual("Doe");
        expect(myDetailsPage.twitterUrlField.getAttribute("value")).toEqual("jane.doe");
        expect(myDetailsPage.linkedInUrlField.getAttribute("value")).toEqual("jane@doe");
    });

});
