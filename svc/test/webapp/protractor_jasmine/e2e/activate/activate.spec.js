"use strict";

var pageUrlBase = "../";

// Node.js 'require', which loads the "Activate" Page Object module for use in tests.
var ActivatePage = require(pageUrlBase + "activate/activate.page.js");

// Load the test data loader module.
var TestDataLoader = require("../load-test-data.js");

// End-to-end test specifications written in Jasmine syntax.
describe("On activation", function () {
    // Create a new instance of the "Activate" Page Object
    var page = new ActivatePage();

    // Create a new instance of the test data loader
    var testDataLoader = new TestDataLoader();

    beforeAll(function () {
        // Call REST service to initialize database with test data
        testDataLoader.loadTestData();
    });

    it("should activate the user's account if the activation key is valid", function () {
        // Go to the activation page, passing a valid activation key from the test data
        page.goToPage("Qy8xixNA");
        expect(page.getMessageText()).toMatch(/account activated/);

        // Go to the Login page
        page.login();
        expect(browser.getCurrentUrl()).toMatch("/login");
    });

    it("should show an error message if the activation key is invalid", function () {
        // Go to the activation page, passing an invalid activation key
        page.goToPage("cuC4fvOo");
        expect(page.getMessageText()).toMatch(/An error has occurred/);
    });
});
