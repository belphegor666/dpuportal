"use strict";

var pageUrlBase = "../";

// Node.js 'require', which loads the "Login" Page Object module for use in tests.
var LoginPage = require(pageUrlBase + "login/login.page.js");

var RequirementPage = require(pageUrlBase + "requirement/requirement.page.js");

var SprintPlanPage = require(pageUrlBase + "requirement/sprintPlan.page.js");

var SprintPlanFormPage = require(pageUrlBase + "requirement/sprintPlan.form.page.js")

// Load the test data loader module.
var TestDataLoader = require("../load-test-data.js");

// End-to-end test specifications written in Jasmine syntax.
describe("Add a story to a sprint", function () {
    // Create a new instance of the "Login" Page Object
    var loginPage = new LoginPage();

    var requirementPage = new RequirementPage();

    var sprintPlanPage = new SprintPlanPage();

    var sprintPlanFormPage = new SprintPlanFormPage();

    // Create a new instance of the test data loader
    var testDataLoader = new TestDataLoader();

    var storyCount;

    //Login and go to sprint plan page
    beforeAll(function() {
        // Call REST service to initialize database with test data
        testDataLoader.loadTestData();
        loginPage.goToPage();
        loginPage.fillUsername("delivery@example.com");
        loginPage.fillPassword("password1");
        loginPage.login();

        browser.waitForAngular();

        //Go to the sprints page of the first project
        sprintPlanPage.manageSprints(0);

        //Go to the stories page of the first sprint
        sprintPlanPage.manageSprintPlans(0);

        sprintPlanPage.getStoriesForPlan().count().then(function(response) {
            storyCount = response;
        });

        //Add a new story
        sprintPlanPage.addStoryButtonClick();
        expect(browser.getCurrentUrl()).toMatch(/stories/);
    });

    describe("add a story", function() {

        it("should confirm that every default field is populated properly", function() {
            expect(sprintPlanFormPage.createdByField.getAttribute("value")).toMatch("delivery@example.com");

            //4, includes Not Applicable and the empty selection
            expect(sprintPlanFormPage.getMembersCount(sprintPlanFormPage.businessAnalystField)).toEqual(4);
            expect(sprintPlanFormPage.getMembersCount(sprintPlanFormPage.developerField)).toEqual(4);
            expect(sprintPlanFormPage.getMembersCount(sprintPlanFormPage.testerField)).toEqual(4);
        });

        it("should show error validation messages for the required fields if the story is saved with no entry", function() {
            sprintPlanFormPage.save();

            expect(sprintPlanFormPage.epicRequiredError.isDisplayed()).toBe(true);
            expect(sprintPlanFormPage.storyDetailsRequiredError.isDisplayed()).toBe(true);
            expect(sprintPlanFormPage.storyPointsRequiredError.isDisplayed()).toBe(true);
            expect(sprintPlanFormPage.priorityRequiredError.isDisplayed()).toBe(true);
        });


        it("should show 4 records in the sprint plan list after adding a new story", function () {
            //Fill all fields
            sprintPlanFormPage.fillEpic("New Epic");
            sprintPlanFormPage.fillStoryDetails("Adding a new story to this epic");
            sprintPlanFormPage.fillTrelloLink("www.trello.com/storyboard");
            sprintPlanFormPage.selectBusinessAnalyst("originator@example.com");
            sprintPlanFormPage.selectDeveloper("approver@example.com");
            sprintPlanFormPage.selectTester("Not Applicable");
            sprintPlanFormPage.fillStoryPoints("8");
            sprintPlanFormPage.fillPriority("3");

            sprintPlanFormPage.save();

            expect(sprintPlanFormPage.isModalDialogDisplayed()).toBe(true);
            sprintPlanFormPage.modalDialogOkButtonClick();
            expect(sprintPlanPage.getStoriesForPlan().count()).toEqual(storyCount + 1);
        });

    });

    describe("complete a story", function() {

        it("should complete a story", function() {
            sprintPlanPage.getCompleteButtonOfStory(storyCount).click();
            //Complete status means delete button is removed from view
            expect(sprintPlanPage.getDeleteButtonOfStory(storyCount).isDisplayed()).toBe(false);
        });

    });

    describe("amend a story", function() {

        it("should show the fields pre-populated with the correct data", function () {
            sprintPlanPage.getUpdateButtonOfStory(storyCount).click();
            expect(browser.getCurrentUrl()).toMatch(new RegExp("/stories/" + '([0-9]+)'));
            //Check pre populated fields
            expect(sprintPlanFormPage.epicField.getAttribute("value")).toMatch("New Epic");
            expect(sprintPlanFormPage.storyDetailsField.getAttribute("value")).toMatch("Adding a new story to this epic");
            expect(sprintPlanFormPage.trelloLinkField.getAttribute("value")).toMatch("www.trello.com/storyboard")
            expect(sprintPlanFormPage.createdByField.getAttribute("value")).toMatch("delivery@example.com");
            expect(sprintPlanFormPage.businessAnalystField.getAttribute("value")).toMatch("originator@example.com");
            expect(sprintPlanFormPage.developerField.getAttribute("value")).toMatch("approver@example.com");
            expect(sprintPlanFormPage.testerField.getAttribute("value")).toMatch("");
            expect(sprintPlanFormPage.storyPointsField.getAttribute("value")).toMatch("8");
            expect(sprintPlanFormPage.priorityField.getAttribute("value")).toMatch("3");
        });

        it("should amend the story details", function () {
            sprintPlanFormPage.fillStoryDetails("Test Epic Changed");
            //Required fields
            sprintPlanFormPage.selectBusinessAnalyst("Not Applicable");
            sprintPlanFormPage.selectTester("Not Applicable");
            sprintPlanFormPage.selectStatus("In development");

            sprintPlanFormPage.save();

            expect(sprintPlanFormPage.isModalDialogDisplayed()).toBe(true);
            sprintPlanFormPage.modalDialogOkButtonClick();

            //Same amount of stories
            expect(sprintPlanPage.getStoriesForPlan().count()).toEqual(storyCount + 1);
            //First .ng-binding is the Story Details
            expect(sprintPlanPage.getStoriesForPlan().get(storyCount).$('.ng-binding').getInnerHtml()).toMatch("Test Epic Changed");
        });

    });

    describe("delete a story", function() {

        it("should delete a story", function() {
            sprintPlanPage.getDeleteButtonOfStory(storyCount).click();
            expect(sprintPlanPage.isModalDialogDisplayed()).toBe(true);
            sprintPlanPage.deleteStoryModalButtonClick();
            expect(sprintPlanPage.getStoriesForPlan().count()).toEqual(storyCount);
            expect(sprintPlanPage.getStoriesForPlan().get(storyCount - 1).$('.ng-binding').getInnerHtml()).not.toMatch("Test Epic Changed");
        });

    });

});
