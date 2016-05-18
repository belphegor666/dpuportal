var pageUrlBase = "../";

// Node.js 'require', which loads the "Login" Page Object module for use in tests.
var LoginPage = require(pageUrlBase + "login/login.page.js");

var LogoutPage = require(pageUrlBase + "logout/logout.page.js");

var SettingsPage = require(pageUrlBase + "user/settings.page.js");

// Load the test data loader module.
var TestDataLoader = require("../load-test-data.js");

// Create a new instance of the Page Objects
var loginPage = new LoginPage();
var logoutPage = new LogoutPage();

var settingsPage = new SettingsPage();

// Create a new instance of the test data loader
var testDataLoader = new TestDataLoader();

describe("User Homepage Preference", function() {

    beforeAll(function() {
        testDataLoader.loadTestData();

        loginPage.goToPage();

        loginPage.fillUsername("newregistereduser@atos.net");
        loginPage.fillPassword("password1");
        loginPage.login();

        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toMatch("/welcome");
    });

    describe("Settings Page Change User Homepage Preference Section", function() {

        it("should check that the default user preference is welcome", function() {
            settingsPage.goToPage();
            browser.waitForAngular();
            expect(settingsPage.homepagePreferenceDropdown.getAttribute('value')).toEqual("WELCOME");
        });

        it("should change the homepage preference and now go to that homepage on login. The new default selected preference would be the chosen one", function() {
            settingsPage.selectHomepagePreference("Requirements Page");
            settingsPage.saveHomepagePreference();
            logoutPage.logout();
            browser.waitForAngular();

            loginPage.fillUsername("newregistereduser@atos.net");
            loginPage.fillPassword("password1");
            loginPage.login();

            browser.waitForAngular();
            expect(browser.getCurrentUrl()).toMatch("/requirements");

            settingsPage.goToPage();
            expect(settingsPage.homepagePreferenceDropdown.getAttribute('value')).toEqual("REQUIREMENT");
        })

    });

});
