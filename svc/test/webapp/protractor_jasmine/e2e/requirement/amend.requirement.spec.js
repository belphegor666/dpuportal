"use strict";

var pageUrlBase = "../";

// Node.js 'require', which loads the "Login" Page Object module for use in tests.
var LoginPage = require(pageUrlBase + "login/login.page.js");

var CreateRequirementPage = require(pageUrlBase + "requirement/create.requirement.page.js");

// Load the test data loader module.
var TestDataLoader = require("../load-test-data.js");

// End-to-end test specifications written in Jasmine syntax.
describe("At AmendRequirement ", function () {
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

    it("should show the submit button and submit summary if status is DRAFT only", function () {
        //Open the requirement with Draft status
        createRequirementPage.amendRequirement(2);
        //should show the submit button for requirements with status draft
        expect(createRequirementPage.showSubmitButton.isDisplayed()).toBe(true);

        createRequirementPage.navigateToRequirement();
        //Open the requirement with Submitted status
        createRequirementPage.amendRequirement(0);

        //should show the submit button for requirements with status draft
        expect(createRequirementPage.showSubmitButton.isDisplayed()).toBe(false);

     });

    it("should save the requirement when all fields entered and return to requirement list screen", function () {
        createRequirementPage.navigateToRequirement();
        //Fill the form with mandatory fields
        createRequirementPage.createRequirement();
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
        createRequirementPage.saveRequirement();
        browser.waitForAngular();

        createRequirementPage.selectDialogOKButton();
        expect(browser.getCurrentUrl()).toMatch("/requirements");
        expect(createRequirementPage.getRequirementList().count()).toEqual(8);
    });

    it("should not show the admin fields to normal user", function () {
        createRequirementPage.amendRequirement(7);
       //Requirement entered using test data
       expect(createRequirementPage.getTitleValue()).toEqual('Test Project Title XXX');
       expect(createRequirementPage.getSummaryValue()).toEqual('Test Project Summary XXX');

       //Check the fields to be visible to Admin only on Amend Requirement are not visible
       expect($('[ng-show="isAmend && isAdmin"]').isDisplayed()).toBe(false);
       createRequirementPage.submitRequirement();
       browser.waitForAngular();

       createRequirementPage.selectDialogOKButton();
       expect(browser.getCurrentUrl()).toMatch("/requirements");

    });

    it("should go to requirements dashboard of Admin", function () {

        loginPage.goToPage();
        loginPage.fillUsername("admin@atos.net");
        loginPage.fillPassword("password1");
        loginPage.login();

        browser.waitForAngular();
        browser.getCurrentUrl().then(console.log);
        expect(browser.getCurrentUrl()).toMatch("/requirements");

    });

    it("should not show the fields visible only to Admin on Amend", function () {
        createRequirementPage.addRequirement();
        //Fill the form with mandatory fields
        createRequirementPage.fillTitle("Admin Test Project");
        createRequirementPage.fillSummary("Admin Test Project Summary");
        createRequirementPage.openCalendar();
        createRequirementPage.fillTargetDate();

       //Check the fields to be visible to Admin only on Amend Requirement are not visible
       expect($('[ng-show="isAmend && isAdmin"]').isDisplayed()).toBe(false);

        createRequirementPage.saveRequirement();
        browser.waitForAngular();

        createRequirementPage.selectDialogOKButton();
        expect(browser.getCurrentUrl()).toMatch("/requirements");
        expect(createRequirementPage.getRequirementList().count()).toEqual(2);

    });

    it("should show the fields visible only to Admin on Amend", function () {
        createRequirementPage.amendRequirement(0);
       //Check the fields to be visible to Admin only on Amend Requirement are not visible
       expect($('[ng-show="isAmend && isAdmin"]').isDisplayed()).toBe(true);

    });

});
