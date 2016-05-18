var pageUrlBase = "../";

var LoginPage = require(pageUrlBase + "login/login.page.js");

var LogoutPage = require(pageUrlBase + "logout/logout.page.js");

var WelcomePage = require(pageUrlBase + "welcome/welcome.page.js");

// Load the test data loader module.
var TestDataLoader = require("../load-test-data.js");

// Create a new instance of the Page Objects
var loginPage = new LoginPage();
var logoutPage = new LogoutPage();
var welcomePage = new WelcomePage();

// Create a new instance of the test data loader
var testDataLoader = new TestDataLoader();

describe("Welcome Page", function() {

    beforeAll(function() {
        testDataLoader.loadTestData();

        loginPage.goToPage();

        loginPage.fillUsername("newregistereduser@atos.net");
        loginPage.fillPassword("password1");
        loginPage.login();

        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toMatch("/welcome");
    });

    describe("homepage buttons", function() {

        beforeEach(function() {
            welcomePage.clickElement(welcomePage.welcomeTab);
        });

        it("should redirect to the product owner page when the product owner button is clicked, and then verify homepage is now the product owner page", function() {
            welcomePage.clickElement(welcomePage.productOwnerButton);
            expect(browser.getCurrentUrl()).toMatch("/requirements");
            logoutPage.logout();
            loginPage.fillUsername("newregistereduser@atos.net");
            loginPage.fillPassword("password1");
            loginPage.login();
            expect(browser.getCurrentUrl()).toMatch("/requirements");
        });

        it("should redirect to the developer projects page when the developer button is clicked, and then verify homepage is now the developer projects page", function() {
            welcomePage.clickElement(welcomePage.developerButton);
            expect(browser.getCurrentUrl()).toMatch("/developer/projects");
            logoutPage.logout();
            loginPage.fillUsername("newregistereduser@atos.net");
            loginPage.fillPassword("password1");
            loginPage.login();
            expect(browser.getCurrentUrl()).toMatch("/developer/projects");
        });

        it("should redirect to the executive dashboard page when the executive button is clicked, and then verify homepage is now the executive dashboard page", function() {
            welcomePage.clickElement(welcomePage.executiveButton);
            expect(browser.getCurrentUrl()).toMatch("/executive");
            logoutPage.logout();
            loginPage.fillUsername("newregistereduser@atos.net");
            loginPage.fillPassword("password1");
            loginPage.login();
            expect(browser.getCurrentUrl()).toMatch("/executive");
        });

    });

});
