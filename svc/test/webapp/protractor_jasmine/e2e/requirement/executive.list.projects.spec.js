"use strict";

var pageUrlBase = "../";

// Node.js 'require', which loads the "Login" Page Object module for use in tests.
var LoginPage = require(pageUrlBase + "login/login.page.js");

var RequirementPage = require(pageUrlBase + "requirement/requirement.page.js");

// Load the test data loader module.
var TestDataLoader = require("../load-test-data.js");

// End-to-end test specifications written in Jasmine syntax.
describe("At Executive Dashboard ", function () {
    // Create a new instance of the "Login" Page Object
    var loginPage = new LoginPage();

    var requirementPage = new RequirementPage();

    // Create a new instance of the test data loader
    var testDataLoader = new TestDataLoader();

    beforeAll(function () {
        // Call REST service to initialize database with test data
        testDataLoader.loadTestData();
        loginPage.goToPage();
        loginPage.fillUsername("originator@example.com");
        loginPage.fillPassword("password1");
        loginPage.login();

        expect(browser.getCurrentUrl()).toMatch("/projects");
    });

    it("should list two records in the my requirements dashboard screen", function () {

        //navigate to requirement tab
        requirementPage.requirementButtonClick();
        browser.waitForAngular();

        browser.getCurrentUrl().then(console.log);
        expect(browser.getCurrentUrl()).toMatch("/requirements");

        //projects having productOwner as originator@example.com
        expect(requirementPage.getMyProjects().count()).toEqual(2);
    });

    it("should navigate to executive dashboard when Executive is clicked on the navigation menu", function () {
        //Click Executive tab to navigate to executive dashbaord
        requirementPage.executiveButtonClick();
        expect(browser.getCurrentUrl()).toMatch("/executive");
    });

    it("should show draft total values", function () {
        //projects having sprint joined by the user in test data
        var draftValueText = "2\nDraft\nRevenue - £150m\nMargin - £0m\nCost - £0m"
        //requirementPage.submittedValues.getText().then(function(response) { console.log(response) });
        expect(requirementPage.draftValues.getText()).toEqual(draftValueText)
    });

    it("should show submitted total values", function () {
        //projects having sprint joined by the user in test data
        var submittedValueText = "4\nSubmitted\nRevenue - £320m\nMargin - £0m\nCost - £0m"
        //requirementPage.submittedValues.getText().then(function(response) { console.log(response) });
        expect(requirementPage.submittedValues.getText()).toEqual(submittedValueText)
    });

    it("should show in development total values", function () {
        //projects having sprint joined by the user in test data
        var inDevelopmentValueText = "3\nIn Development\nRevenue - £218m\nMargin - £0m\nCost - £0m"
        //requirementPage.submittedValues.getText().then(function(response) { console.log(response) });
        expect(requirementPage.inDevelopmentValues.getText()).toEqual(inDevelopmentValueText)
    });

    it("should show complete total values", function () {
        //projects having sprint joined by the user in test data
        var completedValueText = "1\nCompleted OK\nRevenue - £70m\nMargin - £0m\nCost - £0m"
        //requirementPage.submittedValues.getText().then(function(response) { console.log(response) });
        expect(requirementPage.completedValues.getText()).toEqual(completedValueText)
    });

    it("should list eight records in the executive dashboard screen", function () {
        //requirements with status DRAFT are not shown on the executive dashboard list
        expect(requirementPage.getMyProjects().count()).toEqual(8);
    });

    it("should open the form in read-Only when other product owner requirement is selected for edit", function () {
        requirementPage.amendButtonClick();
        browser.waitForAngular();

        expect(browser.getCurrentUrl()).toMatch("/requirements/1");

        expect(requirementPage.formFieldSet.getAttribute('disabled')).toBeTruthy();
    });

    it("should open the form for edit if user is the product owner", function () {

        //Click Executive tab to navigate to executive dashbaord
        requirementPage.executiveButtonClick();
        requirementPage.amendRequirement(6);
        browser.waitForAngular();

        browser.getCurrentUrl().then(console.log);
        expect(browser.getCurrentUrl()).toMatch("/requirements/9");

        expect(requirementPage.formFieldSet.getAttribute('disabled')).toBeFalsy();
       // expect($('[ng-disabled="isReadOnlyMode"]').isEnabled()).toBe(false);

       //Check the fields to be visible to Admin only on Amend Requirement are not visible
       expect($('[ng-show="isAmend && isAdmin"]').isDisplayed()).toBe(false);

    });

    it("should list filtered records when status links clicked in executive dashboard", function () {
        requirementPage.executiveButtonClick();
        //requirements with status DRAFT are not shown on the executive dashboard list
        expect(requirementPage.getMyProjects().count()).toEqual(8);

        //Draft requirements only shown for Admin user
        requirementPage.draftStatusLinkClick();
        expect(requirementPage.getMyProjects().count()).toEqual(0);

        //SUBMITTED status included EVALUATION and SCHEDULED
        requirementPage.submittedStatusLinkClick();
        expect(requirementPage.getMyProjects().count()).toEqual(4);

        //IN_DEVELOPMENT status included ON_HOLD
        requirementPage.inDevelopmentStatusLinkClick();
        expect(requirementPage.getMyProjects().count()).toEqual(3);

        //CLOSED_OK status
        requirementPage.completedOkStatusLinkClick();
        expect(requirementPage.getMyProjects().count()).toEqual(1);
    });

    it("should go to requirements dashboard of Admin when admin credentials provided", function () {

        loginPage.goToPage();
        loginPage.fillUsername("admin@atos.net");
        loginPage.fillPassword("password1");
        loginPage.login();

        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toMatch("/requirements");


        //Click Executive tab to navigate to executive dashbaord
        requirementPage.executiveButtonClick();
        expect(browser.getCurrentUrl()).toMatch("/executive");
    });

    it("should open any requirement form for edit if user is admin", function () {
        //Click Executive tab to navigate to executive dashboard
        requirementPage.executiveButtonClick();
        requirementPage.amendRequirement(6);
        browser.waitForAngular();

        browser.getCurrentUrl().then(console.log);
        expect(browser.getCurrentUrl()).toMatch("/requirements/9");

        expect(requirementPage.formFieldSet.getAttribute('disabled')).toBeFalsy();

        //Check the fields to be visible to Admin only on Amend Requirement are not visible
        expect($('[ng-show="isAmend && isAdmin"]').isDisplayed()).toBe(true);

    });

    it("should list DRAFT status filtered records when status links clicked by Admin", function () {
            requirementPage.executiveButtonClick();
            //requirements with status DRAFT are not shown on the executive dashboard list
            expect(requirementPage.getMyProjects().count()).toEqual(8);

            //Draft requirements only shown for Admin user
            requirementPage.draftStatusLinkClick();
            expect(requirementPage.getMyProjects().count()).toEqual(2);

    });
});
