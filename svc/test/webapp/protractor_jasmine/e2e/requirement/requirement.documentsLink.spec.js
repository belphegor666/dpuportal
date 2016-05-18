"use strict";

var pageUrlBase = "../";

// Node.js 'require', which loads the "Login" Page Object module for use in tests.
var LoginPage = require(pageUrlBase + "login/login.page.js");

var DocumentRequirementPage = require(pageUrlBase + "requirement/requirement.documentsLink.page.js");

// Load the test data loader module.
var TestDataLoader = require("../load-test-data.js");

// End-to-end test specifications written in Jasmine syntax.
describe("Requirement documents Page", function () {
    // Create a new instance of the "Login" Page Object
    var loginPage = new LoginPage();

    var documentRequirementPage = new DocumentRequirementPage();

    // Create a new instance of the test data loader
    var testDataLoader = new TestDataLoader();

    beforeAll(function() {
        // Call REST service to initialize database with test data
        testDataLoader.loadTestData();
        loginPage.goToPage();
        loginPage.fillUsername("originator@example.com");
        loginPage.fillPassword("password1");
        loginPage.login();
    });

    it("should not show the document input link if user is not admin or product owner", function () {
            //Click Executive tab to navigate to executive dashbaord
            documentRequirementPage.navigateToExecutive();
            documentRequirementPage.clickDocumentButton(0);

            expect(browser.getCurrentUrl()).toMatch("/requirements/1/documentRepository");

            expect($('[data-ng-show="!documentRepositoryLink"]').isDisplayed()).toBe(true);
            expect($('[data-ng-show="!permittedUser()"]').isDisplayed()).toBe(true);

            expect($('[data-ng-show="documentRepositoryLink"]').isDisplayed()).toBe(false);
            expect($('[data-ng-show="permittedUser()"]').isDisplayed()).toBe(false);


    });

    it("should show the document input link if user is product owner", function () {
        // Call REST service to initialize database with test data
        testDataLoader.loadTestData();
        loginPage.goToPage();
        loginPage.fillUsername("delivery@example.com");
        loginPage.fillPassword("password1");
        loginPage.login();

        browser.waitForAngular();
        //Click Requirement tab to navigate to requirement dashbaord
        documentRequirementPage.navigateToRequirement();
        documentRequirementPage.clickDocumentButton(0);

        expect(browser.getCurrentUrl()).toMatch("/requirements/1/documentRepository");

        expect($('[data-ng-show="!documentRepositoryLink"]').isDisplayed()).toBe(true);
        expect($('[data-ng-show="!permittedUser()"]').isDisplayed()).toBe(false);

        expect($('[data-ng-show="documentRepositoryLink"]').isDisplayed()).toBe(false);
        expect($('[data-ng-show="permittedUser()"]').isDisplayed()).toBe(true);
    });

    it("should save the documents repository link when saved by product owner", function () {

        documentRequirementPage.fillDocumentsLinkField("https://sp.myatos.net/si/UKI/tp/epi/ddca/PROJ/Forms/AllItems.aspx?RootFolder=%2Fsi%2FUKI%2Ftp%2Fepi%2Fddca%2FPROJ%2FDigital%20Delivery%20Unit&FolderCTID=0x01200063A6012313852049BA6F822C8A110090&View=%7bEF4AD8EF-5AA2-4F5A-8A3D-24158614EA59%7d&InitialTabId=Ribbon%2EDocument&VisibilityContext=WSSTabPersistence");
        documentRequirementPage.saveUrl();
        browser.waitForAngular();
        expect($('[data-ng-show="documentRepositoryLink"]').isDisplayed()).toBe(true);
        expect($('[data-ng-show="permittedUser()"]').isDisplayed()).toBe(true);
        expect(documentRequirementPage.getUrlValue()).toEqual('https://sp.myatos.net/si/UKI/tp/epi/ddca/PROJ/Forms/AllItems.aspx?RootFolder=%2Fsi%2FUKI%2Ftp%2Fepi%2Fddca%2FPROJ%2FDigital%20Delivery%20Unit&FolderCTID=0x01200063A6012313852049BA6F822C8A110090&View=%7bEF4AD8EF-5AA2-4F5A-8A3D-24158614EA59%7d&InitialTabId=Ribbon%2EDocument&VisibilityContext=WSSTabPersistence');

    });

    it("should show the document input link if user is Admin", function () {

        loginPage.goToPage();
        loginPage.fillUsername("admin@atos.net");
        loginPage.fillPassword("password1");
        loginPage.login();

        browser.waitForAngular();

        //Click Requirement tab to navigate to requirement dashbaord
        documentRequirementPage.navigateToExecutive();
        documentRequirementPage.clickDocumentButton(1);

        expect(browser.getCurrentUrl()).toMatch("/requirements/2/documentRepository");

        expect($('[data-ng-show="!documentRepositoryLink"]').isDisplayed()).toBe(true);
        expect($('[data-ng-show="!permittedUser()"]').isDisplayed()).toBe(false);

        expect($('[data-ng-show="documentRepositoryLink"]').isDisplayed()).toBe(false);
        expect($('[data-ng-show="permittedUser()"]').isDisplayed()).toBe(true);


    });

    it("should save the documents repository link when saved by admin", function () {

        documentRequirementPage.fillDocumentsLinkField("https://sp.myatos.net/si/UKI/tp/epi/ddca/PROJ/Forms/AllItems.aspx?RootFolder=%2Fsi%2FUKI%2Ftp%2Fepi%2Fddca%2FPROJ%2FDigital%20Delivery%20Unit&FolderCTID=0x01200063A6012313852049BA6F822C8A110090&View=%7bEF4AD8EF-5AA2-4F5A-8A3D-24158614EA59%7d&InitialTabId=Ribbon%2EDocument&VisibilityContext=WSSTabPersistence");
        documentRequirementPage.saveUrl();
        browser.waitForAngular();
        expect($('[data-ng-show="documentRepositoryLink"]').isDisplayed()).toBe(true);
        expect($('[data-ng-show="permittedUser()"]').isDisplayed()).toBe(true);
        expect(documentRequirementPage.getUrlValue()).toEqual('https://sp.myatos.net/si/UKI/tp/epi/ddca/PROJ/Forms/AllItems.aspx?RootFolder=%2Fsi%2FUKI%2Ftp%2Fepi%2Fddca%2FPROJ%2FDigital%20Delivery%20Unit&FolderCTID=0x01200063A6012313852049BA6F822C8A110090&View=%7bEF4AD8EF-5AA2-4F5A-8A3D-24158614EA59%7d&InitialTabId=Ribbon%2EDocument&VisibilityContext=WSSTabPersistence');

    });

});