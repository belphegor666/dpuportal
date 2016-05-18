"use strict";

var pageUrlBase = "../../../../../test/webapp/protractor_jasmine/e2e/teams/";

// Node.js 'requires', which load Page Object modules for use in tests.
var LoginPage = require("../../../../../test/webapp/protractor_jasmine/e2e/login/login.page.js");
var TeamsPage = require(pageUrlBase + "teams.page.js");
var TestDataLoader = require("../load-test-data.js");

// End-to-end test specifications written in Jasmine syntax.
describe("View Project Teams", function () {
    // Reset the test database
    var testDataLoader = new TestDataLoader();

    // Get today's date and calculate the previous week and next week
    var today = new Date();
    var DAY_AS_MILLISECONDS = 24 * 60 * 60 * 1000;
    var previousWeek = new Date(today.getTime() - 7 * DAY_AS_MILLISECONDS);
    var nextWeek = new Date(today.getTime() + 7 * DAY_AS_MILLISECONDS);

    // Create a new instance of the "Teams" Page Object
    var teamsPage = new TeamsPage();

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

    it("should go to the Project Teams page when the Teams tab is clicked, and display data for today", function () {
        teamsPage.clickTeamsTab().then(function () {
            expect(browser.getCurrentUrl()).toMatch("/teams");

            // Check the page is showing today's date
            teamsPage.getDateHeaderText().then(function (headerText) {
                // Inject the AngularJS 'dateFilter' service to format date for comparison to the date shown on-screen
                browser.executeScript(function (date) {
                    var dateFilter = angular.injector(['ng']).get('dateFilter');
                    return dateFilter(date, 'dd MMMM yyyy');
                }, today).then(function (formattedDate) {
                    expect(headerText).toContain(formattedDate);
                });
            });

            // Check project priorities are ordered correctly
            expect(teamsPage.getRowValues(0, 0)).toContain("1");
            expect(teamsPage.getRowValues(1, 0)).toContain("1");
            expect(teamsPage.getRowValues(2, 0)).toContain("1");
            expect(teamsPage.getRowValues(3, 0)).toContain("2");
            expect(teamsPage.getRowValues(4, 0)).toContain("3");
            expect(teamsPage.getRowValues(5, 0)).toContain("3");

            // Check team totals are correct
            expect(teamsPage.getRowValues(0, 5)).toContain("4");
            expect(teamsPage.getRowValues(1, 5)).toContain("0");
            expect(teamsPage.getRowValues(2, 5)).toContain("0");
            expect(teamsPage.getRowValues(3, 5)).toContain("0");
            expect(teamsPage.getRowValues(4, 5)).toContain("2");
            expect(teamsPage.getRowValues(5, 5)).toContain("2");

            // Check summary total of individuals for the week
            expect(teamsPage.getSummaryTotal()).toContain("5");

            // Check the counts of Stories and totals of Story Points for team members on the last project ("Test
            // Project 1")
            expect(teamsPage.getTeamMembersInfo(5, 0)).toContain("- Stories: BA - 0 Dev - 1 Test - 0");
            expect(teamsPage.getTeamMembersInfo(5, 0)).toContain("- Story Points: BA - 0 Dev - 20 Test - 0");
            expect(teamsPage.getTeamMembersInfo(5, 1)).toContain("- Stories: BA - 1 Dev - 2 Test - 0");
            expect(teamsPage.getTeamMembersInfo(5, 1)).toContain("- Story Points: BA - 13 Dev - 21 Test - 0");

            // Check the certifications of the first team member on "Test Project 1", and the CSS class used to render
            // each certification. Note: For this team member, only one certification is expected because the member's
            // other certification (BA / PO) is at 0% complete.
            teamsPage.getTeamMemberCertifications(5, 0).then(function (certifications) {
                expect(certifications[0].cert).toEqual("Agile (80%)");
                expect(certifications[0].class).toContain("cert-bronze");
                expect(certifications.length).toEqual(1);
            });

            // Check the certifications of the second team member on "Test Project 1", and the CSS class used to render
            // each certification.
            teamsPage.getTeamMemberCertifications(5, 1).then(function (certifications) {
                expect(certifications[0].cert).toEqual("Agile");
                expect(certifications[0].class).toContain("cert-silver");
                expect(certifications[1].cert).toEqual("PAMM (60%)");
                expect(certifications[1].class).toContain("cert-bronze");
                expect(certifications[2].cert).toEqual("Agile (20%)");
                expect(certifications[2].class).toContain("cert-gold");
                expect(certifications.length).toEqual(3);
            });
        });
    });

    it("should display the previous week's data when the 'Previous week' button is clicked", function () {
        teamsPage.clickPrevious().then(function () {
            // Check the page is showing last week's date
            teamsPage.getDateHeaderText().then(function (headerText) {
                // Inject the AngularJS 'dateFilter' service to format date for comparison to the date shown on-screen
                browser.executeScript(function (date) {
                    var dateFilter = angular.injector(['ng']).get('dateFilter');
                    return dateFilter(date, 'dd MMMM yyyy');
                }, previousWeek).then(function (formattedDate) {
                    expect(headerText).toContain(formattedDate);
                });
            });

            // Check summary total of individuals for the week
            expect(teamsPage.getSummaryTotal()).toContain("5");
        });
    });

    it("should display today's data when the 'Today' button is clicked", function () {
        teamsPage.clickToday().then(function () {
            // Check the page is showing today's date
            teamsPage.getDateHeaderText().then(function (headerText) {
                // Inject the AngularJS 'dateFilter' service to format date for comparison to the date shown on-screen
                browser.executeScript(function (date) {
                    var dateFilter = angular.injector(['ng']).get('dateFilter');
                    return dateFilter(date, 'dd MMMM yyyy');
                }, today).then(function (formattedDate) {
                    expect(headerText).toContain(formattedDate);
                });
            });
        });
    });

    it("should display the next week's data when the 'Next week' button is clicked", function () {
        teamsPage.clickNext().then(function () {
            // Check the page is showing next week's date
            teamsPage.getDateHeaderText().then(function (headerText) {
                // Inject the AngularJS 'dateFilter' service to format date for comparison to the date shown on-screen
                browser.executeScript(function (date) {
                    var dateFilter = angular.injector(['ng']).get('dateFilter');
                    return dateFilter(date, 'dd MMMM yyyy');
                }, nextWeek).then(function (formattedDate) {
                    expect(headerText).toContain(formattedDate);
                });
            });

            // Check summary total of individuals for the week
            expect(teamsPage.getSummaryTotal()).toContain("0");
        });
    });
});