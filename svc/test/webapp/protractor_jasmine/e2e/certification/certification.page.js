"use strict";

module.exports = (function () {
    function CertificationPage() {

        this.myAccountDropdown = $('[data-ng-class="{\'active\': isAtMyAccount() }"]');
       // this.myAccountDropdown = element(By.id('myAccount'));
        this.certificationLink = $('[data-ng-click="navigateToCertifications()"]');

        this.percentCompleteField = $('[data-ng-model="certificate.percentComplete"]');
        this.dialogPercentCompleteField = $('[ng-model="percentComplete"]');
        this.certificationDropDown = element(by.model("certificate.certificate"));

        this.addCertificationButton = element(by.buttonText("Add certification"));
        this.updateCertificationButton = element(by.buttonText("Update certificate"));
        this.percentageCompleteColumnValue = element(by.css("text-muted"));

        this.percentCompleteRequiredError = element(by.id("title-required"));

        //Certification List
        this.certificationList = element.all(by.repeater('certification in certifications'));
    }

    //Is error visible
    CertificationPage.prototype.isPercentCompleteRequiredErrorDisplayed = function() {
        return this.percentCompleteRequiredError.isDisplayed();
    };

    //Get My Certifications List
    CertificationPage.prototype.getMyCertifications = function () {
        return this.certificationList;
    };

     CertificationPage.prototype.goToCertificationPage = function () {
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.elementToBeClickable(this.myAccountDropdown), 5000);

        this.myAccountDropdown.click();
        this.certificationLink.click();
     };

    //Select and fill fields for certification
    CertificationPage.prototype.selectCertification = function (certification) {
        this.certificationDropDown.sendKeys(certification);
    };

    //Navigation Clicks
    CertificationPage.prototype.navigateToCertification = function () {
        this.certificationLink.click();
    };


    //Fill fields
    CertificationPage.prototype.fillPercentComplete = function (percentComplete) {
        this.percentCompleteField.clear().sendKeys(percentComplete);
    };

    //Fill fields
    CertificationPage.prototype.fillDialogPercentComplete = function (percentComplete) {
        this.dialogPercentCompleteField.clear().sendKeys(percentComplete);
    };


    //Get Title field value
    CertificationPage.prototype.getPercentCompleteValue = function () {
        return this.percentCompleteField.getAttribute('value');
    };

    CertificationPage.prototype.addCertification = function () {
        var EC = protractor.ExpectedConditions;
        var isClickable = EC.elementToBeClickable(this.addCertificationButton);
        browser.wait(isClickable, 5000); //wait for success dialog box to close
        this.addCertificationButton.click();
        browser.waitForAngular();
    };

    CertificationPage.prototype.updateCertification = function () {
        var EC = protractor.ExpectedConditions;
        var isClickable = EC.elementToBeClickable(this.updateCertificationButton);
        browser.wait(isClickable, 5000); //wait for success dialog box to close
        this.updateCertificationButton.click();
        browser.waitForAngular();
    };


    CertificationPage.prototype.amendCertification = function (value) {
        var EC = protractor.ExpectedConditions;
        var amendButton = element.all(by.repeater('certification in certifications')).get(value).$("button[title='Update certification']");
        var isClickable = EC.elementToBeClickable(amendButton);
        browser.wait(isClickable, 5000); //wait for success dialog box to close
        amendButton.click();
        browser.waitForAngular();
    };

    CertificationPage.prototype.getPercentageCompleteColumn = function (value) {
        var percentageCompleteValue = element(by.repeater('certification in certifications').row(value)).$(".text-muted").getText();
        return percentageCompleteValue;
    };


    var firstCatName = element(by.repeater('cat in pets').
        row(0).column('cat.name'));

    return CertificationPage;

})();