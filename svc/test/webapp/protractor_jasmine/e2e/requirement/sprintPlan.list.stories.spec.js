"use strict";

var pageUrlBase = "../";

// Node.js 'require', which loads the "Login" Page Object module for use in tests.
var LoginPage = require(pageUrlBase + "login/login.page.js");

var RequirementPage = require(pageUrlBase + "requirement/requirement.page.js");

var SprintPlanPage = require(pageUrlBase + "requirement/sprintPlan.page.js");

// Load the test data loader module.
var TestDataLoader = require("../load-test-data.js");

// End-to-end test specifications written in Jasmine syntax.
describe("To View SprintPlans ", function () {
    // Create a new instance of the "Login" Page Object
    var loginPage = new LoginPage();

    var requirementPage = new RequirementPage();

    var sprintPlanPage = new SprintPlanPage();

    // Create a new instance of the test data loader
    var testDataLoader = new TestDataLoader();

    // Setup test fixture (analogous to a JUnit '@Before' annotated method)
    beforeAll(function () {
        // Call REST service to initialize database with test data
        testDataLoader.loadTestData();
        loginPage.goToPage();
        loginPage.fillUsername("delivery@example.com");
        loginPage.fillPassword("password1");
        loginPage.login();

        expect(browser.getCurrentUrl()).toMatch("/requirements");
    });

    it("should navigate to sprints when manage sprints button clicked", function () {
        //Click manageSprints button of the first requirement
        sprintPlanPage.manageSprints(0);
        expect(browser.getCurrentUrl()).toMatch("/requirements/1/sprints");
    });

    it("should navigate to sprintPlans when manage sprint plans button clicked", function () {
       sprintPlanPage.manageSprintPlans(0);
       expect(browser.getCurrentUrl()).toMatch("/requirements/1/sprints/5/stories");
    });

    it("should show 3 records in the sprint plan list", function () {
       expect(sprintPlanPage.getStoriesForPlan().count()).toEqual(3);
       expect(sprintPlanPage.getDeleteButtonOfStory(2).isDisplayed()).toBe(false);
    });

    it("should show only the Update action button for story with status COMPLETE", function () {
       expect(sprintPlanPage.getStoriesForPlan().count()).toEqual(3);
       expect(sprintPlanPage.getDeleteButtonOfStory(2).isDisplayed()).toBe(false);
       expect(sprintPlanPage.getCompleteButtonOfStory(2).isDisplayed()).toBe(false);
       expect(sprintPlanPage.getUpdateButtonOfStory(2).isDisplayed()).toBe(true);
    });

    it("should show all action buttons for story with status not as COMPLETE", function () {
       expect(sprintPlanPage.getDeleteButtonOfStory(1).isDisplayed()).toBe(true);
       expect(sprintPlanPage.getCompleteButtonOfStory(1).isDisplayed()).toBe(true);
       expect(sprintPlanPage.getUpdateButtonOfStory(1).isDisplayed()).toBe(true);
    });


});
