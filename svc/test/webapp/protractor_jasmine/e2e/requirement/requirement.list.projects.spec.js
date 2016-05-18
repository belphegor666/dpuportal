"use strict";

var pageUrlBase = "../";

// Node.js 'require', which loads the "Login" Page Object module for use in tests.
var LoginPage = require(pageUrlBase + "login/login.page.js");

var RequirementPage = require(pageUrlBase + "requirement/requirement.page.js");

// Load the test data loader module.
var TestDataLoader = require("../load-test-data.js");

// End-to-end test specifications written in Jasmine syntax.
describe("At requirement list projects ", function () {
    // Create a new instance of the "Login" Page Object
    var loginPage = new LoginPage();

    var requirementPage = new RequirementPage();

    // Create a new instance of the test data loader
    var testDataLoader = new TestDataLoader();

    beforeAll(function () {
        // Call REST service to initialize database with test data
        testDataLoader.loadTestData();
        loginPage.goToPage();
        loginPage.fillUsername("delivery@example.com");
        loginPage.fillPassword("password1");
        loginPage.login();

        expect(browser.getCurrentUrl()).toMatch("/requirements");
    });

    it("should list seven records in the my projects screen", function () {
        //projects having sprint joined by the user in test data
        expect(requirementPage.getMyProjects().count()).toEqual(7);
    });

    it("should show draft total values", function () {
        //projects having sprint joined by the user in test data
        var draftValueText = "1\nDraft\nRevenue - £60m\nMargin - £0m\nCost - £0m"
        //requirementPage.submittedValues.getText().then(function(response) { console.log(response) });
        expect(requirementPage.draftValues.getText()).toEqual(draftValueText)
    });

    it("should show submitted total values", function () {
        //projects having sprint joined by the user in test data
        var submittedValueText = "3\nSubmitted\nRevenue - £245m\nMargin - £0m\nCost - £0m"
        //requirementPage.submittedValues.getText().then(function(response) { console.log(response) });
        expect(requirementPage.submittedValues.getText()).toEqual(submittedValueText)
    });

    it("should show in development total values", function () {
        //projects having sprint joined by the user in test data
        var inDevelopmentValueText = "2\nIn Development\nRevenue - £143m\nMargin - £0m\nCost - £0m"
        //requirementPage.submittedValues.getText().then(function(response) { console.log(response) });
        expect(requirementPage.inDevelopmentValues.getText()).toEqual(inDevelopmentValueText)
    });

    it("should show complete total values", function () {
        //projects having sprint joined by the user in test data
        var completedValueText = "1\nCompleted OK\nRevenue - £70m\nMargin - £0m\nCost - £0m"
        //requirementPage.submittedValues.getText().then(function(response) { console.log(response) });
        expect(requirementPage.completedValues.getText()).toEqual(completedValueText)
    });

    it("should navigate to the create requirement screen when 'create requirement button' is selected", function () {
            //Click My Projects tab to navigate to my projects list screen
            requirementPage.requirementButtonClick();

            requirementPage.createRequirementButtonClick();
            browser.waitForAngular();

            browser.getCurrentUrl().then(console.log);
            expect(browser.getCurrentUrl()).toMatch("/requirements/");
        });


    it("should navigate to the amend requirements screen when 'amend button' is selected", function () {
            //Click My Projects tab to navigate to my projects list screen
            requirementPage.requirementButtonClick();

            requirementPage.amendButtonClick();
            browser.waitForAngular();

            browser.getCurrentUrl().then(console.log);
            expect(browser.getCurrentUrl()).toMatch("/requirements/1");

    });

    it("should navigate to the requirements sprint screen when 'sprint button' is selected", function () {
            //Click My Projects tab to navigate to my projects list screen
            requirementPage.requirementButtonClick();

            requirementPage.navigateToSprints();
            browser.waitForAngular();

            browser.getCurrentUrl().then(console.log);
            expect(browser.getCurrentUrl()).toMatch("/requirements/1/sprints");
    });

    it("should list filtered records when status links clicked in requirements dashboard", function () {
            requirementPage.requirementButtonClick();

            expect(requirementPage.getMyProjects().count()).toEqual(7);

            requirementPage.draftStatusLinkClick();
            expect(requirementPage.getMyProjects().count()).toEqual(1);

            //SUBMITTED status included EVALUATION and SCHEDULED
            requirementPage.submittedStatusLinkClick();
            expect(requirementPage.getMyProjects().count()).toEqual(3);

            //IN_DEVELOPMENT status included ON_HOLD
            requirementPage.inDevelopmentStatusLinkClick();
            expect(requirementPage.getMyProjects().count()).toEqual(2);

            //CLOSED_OK status
            requirementPage.completedOkStatusLinkClick();
            expect(requirementPage.getMyProjects().count()).toEqual(1);

    });

});
