"use strict";

module.exports = (function () {
    function RequirementDocumentPage() {

        this.requirementButton = $('[data-ng-click="navigateToRequirementDashboard()"]');

        this.executiveButton = $('[data-ng-click="navigateToExecutiveDashboard()"]');

        this.showSubmitButton = $('[ng-show="showSubmitButton"]');

        this.saveButton = element(by.buttonText("Save URL"));

        this.documentLinkField = element(by.id("documentLink"));
    }

    //Navigation Clicks
    RequirementDocumentPage.prototype.navigateToRequirement = function () {
        this.requirementButton.click();
    };

    RequirementDocumentPage.prototype.navigateToExecutive = function () {
        this.executiveButton.click();
    };

    //Get url field value
    RequirementDocumentPage.prototype.getUrlValue = function () {
        return this.documentLinkField.getAttribute('value');
    };


    RequirementDocumentPage.prototype.clickDocumentButton = function (value) {
        var EC = protractor.ExpectedConditions;
        var documentButton = element.all(by.repeater('requirement in projects')).get(value).$("button[title='Documents']");
        var isClickable = EC.elementToBeClickable(documentButton);
        browser.wait(isClickable, 5000); //wait for success dialog box to close
        documentButton.click();
        browser.waitForAngular();
    };

    //Fill fields
    RequirementDocumentPage.prototype.fillDocumentsLinkField = function (url) {
        this.documentLinkField.clear().sendKeys(url);
    };

    RequirementDocumentPage.prototype.saveUrl = function () {
        this.saveButton.click();
    };

    return RequirementDocumentPage;

})();