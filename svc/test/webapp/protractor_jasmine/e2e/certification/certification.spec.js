"use strict";

var pageUrlBase = "../";

// Node.js 'require', which loads the "Login" Page Object module for use in tests.
var LoginPage = require(pageUrlBase + "login/login.page.js");

var CertificationPage = require(pageUrlBase + "certification/certification.page.js");

// Load the test data loader module.
var TestDataLoader = require("../load-test-data.js");

// End-to-end test specifications written in Jasmine syntax.
describe("To Add and View certification ", function () {
    // Create a new instance of the "Login" Page Object
    var loginPage = new LoginPage();

    var certificationPage = new CertificationPage();

    // Create a new instance of the test data loader
    var testDataLoader = new TestDataLoader();

    beforeAll(function () {
        testDataLoader.loadTestData();
        // Login as a known user
        loginPage.goToPage();
        loginPage.fillUsername("delivery@example.com");
        loginPage.fillPassword("password1");
        loginPage.login();
    });

    it("should go to the Certification page when the Certifications is selected from myAccount, and display all certifications", function () {
        certificationPage.goToCertificationPage();
        expect(browser.getCurrentUrl()).toMatch("/certifications");
        expect(certificationPage.getMyCertifications().count()).toEqual(0);
    });

    it("should add certification when details entered and add certification button clicked", function () {
        certificationPage.fillPercentComplete("25");
        certificationPage.selectCertification('abd_b');


        certificationPage.addCertification();
        browser.waitForAngular();

        expect(browser.getCurrentUrl()).toMatch("/certifications");
        expect(certificationPage.getMyCertifications().count()).toEqual(1);
        expect(certificationPage.getPercentageCompleteColumn(0)).toContain("25");
    });

    it("should open dialog with values populated on amend button clicked", function () {

        certificationPage.amendCertification(0);
        certificationPage.updateCertification();
        expect(certificationPage.isPercentCompleteRequiredErrorDisplayed()).toBe(true);

        certificationPage.fillDialogPercentComplete("75");
        certificationPage.updateCertification();
        browser.waitForAngular();

        expect(browser.getCurrentUrl()).toMatch("/certifications");
        expect(certificationPage.getMyCertifications().count()).toEqual(1);
        expect(certificationPage.getPercentageCompleteColumn(0)).toContain("75");
    });


    it("should modify certification when already existing certification is selected from dropdown and added", function () {

        certificationPage.selectCertification('abd_b');
        certificationPage.fillPercentComplete("96");

        certificationPage.addCertification();
        browser.waitForAngular();

        expect(browser.getCurrentUrl()).toMatch("/certifications");
        expect(certificationPage.getMyCertifications().count()).toEqual(1);
        expect(certificationPage.getPercentageCompleteColumn(0)).toContain("96");
    });

});


