"use strict";

var pageUrlBase = "../../../../../test/webapp/protractor_jasmine/e2e/sprint/";

// Node.js 'requires', which load Page Object modules for use in tests.
var LoginPage = require("../../../../../test/webapp/protractor_jasmine/e2e/login/login.page.js");
var SprintPage = require(pageUrlBase + "sprint.page.js");
var TestDataLoader = require("../load-test-data.js");

// End-to-end test specifications written in Jasmine syntax.
describe("Add a Sprint to an Existing Requirement", function () {
    // Reset the test database
    var testDataLoader = new TestDataLoader();

    // Create a new instance of the "Sprint" Page Object
    var sprintPage = new SprintPage();

    // Create a new instance of the "Login" Page Object
    var loginPage = new LoginPage();

    beforeAll(function () {
        testDataLoader.loadTestData();
        // Login as a known user
        loginPage.goToPage();
        loginPage.fillUsername("delivery@example.com");
        loginPage.fillPassword("password1");
        loginPage.login();
    });

    it("should show the total number of members in each Sprint when the Manage Sprints page is viewed for a Requirement", function () {
        sprintPage.requirementsTabClick().then(function () {
            expect(browser.getCurrentUrl()).toMatch("/requirements");
            sprintPage.manageSprintsButtonClick().then(function () {
                expect(browser.getCurrentUrl()).toMatch("/requirements/1/sprints");
                expect(sprintPage.getSprintTableValues(0, 3)).toMatch(/Team of 2/);
            });
        });
    });

    it("should join the project with the selected role when the Join Project button is clicked", function () {
        sprintPage.joinButtonClick().then(function () {
            expect(sprintPage.isJobRoleFormDisplayed()).toBe(true);

            // Check that a validation error message is shown if no job role is chosen
            sprintPage.joinSprintButtonClick().then(function () {
                expect(sprintPage.jobRoleRequiredError.isDisplayed()).toBe(true);
            });

            sprintPage.jobRoleFieldClick();
            sprintPage.firstJobRoleOptionClick();
            sprintPage.joinSprintButtonClick().then(function () {
                expect(sprintPage.isModalDialogDisplayed()).toBe(true);
                sprintPage.modalDialogOkButtonClick().then(function () {
                    expect(sprintPage.getSprintTableValues(0, 3)).toMatch(/Developer/);
                    expect(sprintPage.getSprintTableValues(0, 3)).toMatch(/Team of 3/);
                });
            });
        });
    });

    it("should leave the project when the Leave Project button is clicked", function () {
        sprintPage.leaveButtonClick().then(function () {
            expect(sprintPage.isModalDialogDisplayed()).toBe(true);
            sprintPage.modalDialogOkButtonClick().then(function () {
                expect(sprintPage.getSprintTableValues(0, 3)).not.toMatch(/Developer/);
                expect(sprintPage.getSprintTableValues(0, 3)).toMatch(/Team of 2/);
            });
        });
    });

    it("should save a new Sprint from the Add New Sprint page", function () {
        sprintPage.addNewSprintButtonClick().then(function () {
            // Check that this is going to be the second Sprint
            expect(sprintPage.getSprintNumber()).toEqual("2");

            // Check that a 'required' error message is shown for every required field if submitting the form with
            // these blank
            sprintPage.saveButtonClick().then(function () {
                // All "required" field error messages should be shown
                expect(sprintPage.sprintTitleRequiredError.isDisplayed()).toBe(true);
                expect(sprintPage.sprintDescriptionRequiredError.isDisplayed()).toBe(true);
                expect(sprintPage.sprintStartDateRequiredError.isDisplayed()).toBe(true);
                expect(sprintPage.sprintEndDateRequiredError.isDisplayed()).toBe(true);
            });

            sprintPage.fillTitle("2nd Sprint");
            sprintPage.fillDescription("2nd Sprint for Project 1");

            // Check that a validation error message is shown if the End Date is on or before the Start Date
            sprintPage.openStartDateCalendarButtonClick().then(function () {
                sprintPage.workingDayOfCurrentWeekSelect(1);
            });

            // Select the End Date to be the same day as the Start Date
            sprintPage.openEndDateCalendarButtonClick().then(function () {
                sprintPage.workingDayOfCurrentWeekSelect(1);
            });

            // "End Date before Start Date" validation error message should be shown
            expect(sprintPage.sprintEndDateBeforeStartDateError.isDisplayed()).toBe(true);

            // Select the first working day of the current week
            sprintPage.openStartDateCalendarButtonClick().then(function () {
                sprintPage.workingDayOfCurrentWeekSelect(0);
            });

            // Select the last working day of the current week
            sprintPage.openEndDateCalendarButtonClick().then(function () {
                sprintPage.workingDayOfCurrentWeekSelect(4);
            });

            sprintPage.saveButtonClick().then(function () {
                expect(sprintPage.isModalDialogDisplayed()).toBe(true);

                // Check navigation to the Add New Sprint page when the New Sprint button is clicked after successfully
                // saving a Sprint
                sprintPage.modalDialogNewSprintButtonClick().then(function () {
                    // Check that this is going to be the third Sprint
                    expect(sprintPage.getSprintNumber()).toEqual("3");
                });

                sprintPage.cancelButtonClick().then(function () {
                    // Check the correct number of Sprints are listed
                    expect(sprintPage.getSprintList().count()).toEqual(2);
                });
            });
        });
    });
});