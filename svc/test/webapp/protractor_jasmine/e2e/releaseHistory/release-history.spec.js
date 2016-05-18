"use strict";

var pageUrlBase = "../../../../../test/webapp/protractor_jasmine/e2e/releaseHistory/";

var LoginPage = require("../../../../../test/webapp/protractor_jasmine/e2e/login/login.page.js");
var ReleaseHistoryPage = require(pageUrlBase + "release-history.page.js");
var TestDataLoader = require("../load-test-data.js");

describe("View Release History", function () {
    // Reset the test database
    var testDataLoader = new TestDataLoader();

    var releaseHistoryPage = new ReleaseHistoryPage();
    var loginPage = new LoginPage();

    beforeAll(function () {
        testDataLoader.loadTestData();
        // Login as a known user
        loginPage.goToPage();
        loginPage.fillUsername("originator@example.com");
        loginPage.fillPassword("password1");
        loginPage.login();
    });

    it("should view a list of release histories", function () {
        releaseHistoryPage.clickReleaseHistoryTab().then(function () {
            expect(browser.getCurrentUrl()).toMatch("/release-history");

            //It should display two records on the release history page
            var releaseHistories = element.all(by.repeater('releaseHistory in releaseHistories'));
            expect(releaseHistories.count()).toEqual(2);

        });
    });
});