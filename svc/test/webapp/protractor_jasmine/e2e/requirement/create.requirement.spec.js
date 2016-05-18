"use strict";

var pageUrlBase = "../";

// Node.js 'require', which loads the "Login" Page Object module for use in tests.
var LoginPage = require(pageUrlBase + "login/login.page.js");

var CreateRequirementPage = require(pageUrlBase + "requirement/create.requirement.page.js");

// Load the test data loader module.
var TestDataLoader = require("../load-test-data.js");

// End-to-end test specifications written in Jasmine syntax.
describe("At CreateRequirement ", function () {
    // Create a new instance of the "Login" Page Object
    var loginPage = new LoginPage();

    var createRequirementPage = new CreateRequirementPage();

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

    it("should verify the list count is correct", function() {
        expect(createRequirementPage.getRequirementList().count()).toEqual(7);
    });

    it("should open add requirement form when addRequirement button clicked", function () {
        //Navigate to AddRequirement Form by clicking Add Requirement button
        createRequirementPage.addRequirement();
        expect(browser.getCurrentUrl()).toMatch("/requirements/");
    });

    it("should show required error messages for every mandatory field", function () {
        createRequirementPage.saveRequirement();
        //Required error messages shown
        expect(createRequirementPage.isTitleRequiredErrorDisplayed()).toBe(true);
        expect(createRequirementPage.isSummaryRequiredErrorDisplayed()).toBe(true);
        expect(createRequirementPage.isTargetDateRequiredErrorDisplayed()).toBe(true);
    });

/*    it("should save the requirement when mandatory fields entered and return to requirement list screen", function () {
        //Fill the form with mandatory fields
        createRequirementPage.fillTitle("Test Project Title");
        createRequirementPage.fillSummary("Test Project Summary");
        createRequirementPage.openCalendar();
        createRequirementPage.fillTargetDate();
        createRequirementPage.saveRequirement();
        browser.waitForAngular();

        createRequirementPage.selectDialogOKButton();
        expect(browser.getCurrentUrl()).toMatch("/requirements");
        expect(createRequirementPage.getRequirementList().count()).toEqual(8);

    });*/

    it("should save the requirement when all fields entered and return to requirement list screen", function () {
        //Fill the form with mandatory fields
       // createRequirementPage.createRequirement();
        createRequirementPage.fillTitle("Test Project Title XXX");
        createRequirementPage.fillSummary("Test Project Summary XXX");
        createRequirementPage.fillRevenue("99");
        createRequirementPage.fillCostSavings("50");
        createRequirementPage.fillMargin("75");
        createRequirementPage.selectProjectType('Prototype');
        createRequirementPage.selectFundingType('Client funded');
        createRequirementPage.fillCostCode("GB12345678");
        createRequirementPage.fillEfficiency("100");
        createRequirementPage.fillMaxBudget("50,000");
        createRequirementPage.openCalendar();
        createRequirementPage.fillTargetDate();
        //should show the submit button for new requirement
        expect(createRequirementPage.showSubmitButton.isDisplayed()).toBe(true);
        createRequirementPage.saveRequirement();
        browser.waitForAngular();

        createRequirementPage.selectDialogOKButton();
        expect(browser.getCurrentUrl()).toMatch("/requirements");
        expect(createRequirementPage.getRequirementList().count()).toEqual(8);
    });
});


