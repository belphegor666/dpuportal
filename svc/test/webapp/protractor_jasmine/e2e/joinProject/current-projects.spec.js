"use strict";

var pageUrlBase = "../../../../../test/webapp/protractor_jasmine/e2e/joinProject/";

// Node.js 'requires', which load Page Object modules for use in tests.
var LoginPage = require("../../../../../test/webapp/protractor_jasmine/e2e/login/login.page.js");
var ProjectsPage = require(pageUrlBase + "current-projects.page.js");
var SprintPage = require("../../../../../test/webapp/protractor_jasmine/e2e/sprint/sprint.page.js");
var TestDataLoader = require("../load-test-data.js");

// End-to-end test specifications written in Jasmine syntax.
describe("Join a Project", function () {
    // Reset the test database
    var testDataLoader = new TestDataLoader();

    // Create a new instance of the "Projects" Page Object
    var projectsPage = new ProjectsPage();

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

    it("should go to the Projects page when the Projects tab is clicked, and display all active projects", function () {
        projectsPage.projectsTabClick().then(function () {
            expect(browser.getCurrentUrl()).toMatch("/projects");

            // Check projects are shown in the correct Priority tables, and in the correct order within a table
            expect(projectsPage.getPriorityOneRowValues(0, 1)).toMatch(/^9/);
            expect(projectsPage.getPriorityOneRowValues(1, 1)).toMatch(/^10/);
            expect(projectsPage.getPriorityOneRowValues(2, 1)).toMatch(/^7/);
            expect(projectsPage.getPriorityTwoRowValues(0, 1)).toMatch(/^2/);
            expect(projectsPage.getPriorityThreeRowValues(0, 1)).toMatch(/^1/);
            expect(projectsPage.getPriorityThreeRowValues(1, 1)).toMatch(/^6/);

            // Check that, within each Priority table, projects are listed in descending order of priority value
            expect(projectsPage.getPriorityOneRowValues(1, 2)).not.toBeGreaterThan(projectsPage.getPriorityOneRowValues(0, 2));
            expect(projectsPage.getPriorityOneRowValues(2, 2)).not.toBeGreaterThan(projectsPage.getPriorityOneRowValues(1, 2));
            expect(projectsPage.getPriorityThreeRowValues(1, 2)).not.toBeGreaterThan(projectsPage.getPriorityThreeRowValues(0, 2));
        });
    });

    it("should join a project when the Join Project button is clicked for a project", function () {
        // Get the current number of projects the user has worked on from the "My Agile CV" page
        var assignedProjects;

        projectsPage.developerTabDropdownClick().then(function () {
            projectsPage.myAgileCVMenuItemClick().then(function () {
                // Returns a promise, which will need to be resolved later to use the actual count value
                assignedProjects = projectsPage.getAssignedProjects().count();
            });
        });

        projectsPage.projectsTabClick().then(function () {
            // Attempt to join the "Priority 2" project
            projectsPage.priorityTwoProjectJoinButtonClick().then(function () {
                expect(sprintPage.isJobRoleFormDisplayed()).toBe(true);
                sprintPage.jobRoleFieldClick();
                sprintPage.firstJobRoleOptionClick();
                sprintPage.joinSprintButtonClick().then(function () {
                    expect(sprintPage.isModalDialogDisplayed()).toBe(true);
                    sprintPage.modalDialogOkButtonClick().then(function () {
                        projectsPage.developerTabDropdownClick().then(function () {
                            projectsPage.myAgileCVMenuItemClick().then(function () {
                                assignedProjects.then(function (count) {
                                    expect(projectsPage.getAssignedProjects().count()).toEqual(count + 1);
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    it("should leave a project when the Leave Project button is clicked for a project", function () {
        // Get the current number of projects the user has worked on from the "My Agile CV" page
        var assignedProjects;

        projectsPage.developerTabDropdownClick().then(function () {
            projectsPage.myAgileCVMenuItemClick().then(function () {
                // Returns a promise, which will need to be resolved later to use the actual count value
                assignedProjects = projectsPage.getAssignedProjects().count();
            });
        });

        projectsPage.projectsTabClick().then(function () {
            // Attempt to leave the "Priority 2" project
            projectsPage.priorityTwoProjectLeaveButtonClick().then(function () {
                expect(sprintPage.isModalDialogDisplayed()).toBe(true);
                sprintPage.modalDialogOkButtonClick().then(function () {
                    projectsPage.developerTabDropdownClick().then(function () {
                        projectsPage.myAgileCVMenuItemClick().then(function () {
                            assignedProjects.then(function (count) {
                                expect(projectsPage.getAssignedProjects().count()).toEqual(count - 1);
                            });
                        });
                    });
                });
            });
        });
    });
});
