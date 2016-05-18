"use strict";

module.exports = (function () {
    function CreateRequirementPage() {

        this.requirementLink = $('[data-ng-click="navigateToRequirementDashboard()"]');

        //this.addRequirementButton = element(by.buttonText("Create a new Requirement"));
        this.addRequirementButton = $('[data-ng-click="createRequirement()"]');

        //Mandatory error fields
        this.titleRequiredError = element(by.id("title-required"));
        this.summaryRequiredError = element(by.id("summary-required"));
        this.targetDateRequiredError = element(by.id("targetDate-required"));

        this.titleField = element(by.id("title"));
        this.summaryField = element(by.id("summary"));
        this.marginField = element(by.id("margin"));
        this.costCodeField = element(by.id("costCode"));
        this.efficiencyField = element(by.id("efficiency"));
        this.revenueField = element(by.id("revenue"));
        this.costSavingsField = element(by.id("costSavings"));
        this.maxBudgetField = element(by.id("maxBudget"));
        this.projectTypeDown = element(by.model("project.projectType"));
        this.fundingTypeDown = element(by.model("project.fundingType"));

        this.calendarButton = element(by.name("calendarButton"));
        //Select the first date visible on page
        this.targetDate = $('[ng-click="select(dt.date)"]');

        this.saveButton = element(by.buttonText("Save"));
        this.submitButton = element(by.buttonText("Submit"));
        this.amendButton = $('button[data-ng-click="amend()"]');
        this.modalOKButton = element(by.buttonText('OK'));
        this.cancelButtonOnForm = element(by.buttonText('Cancel'));
        this.showSubmitButton = $('[ng-show="showSubmitButton"]');

        //Requirement List
        this.requirementList = element.all(by.repeater('requirement in projects'));
        //Amend button of the first row in the list
        this.amendButtonOfFirstRow = element.all(by.repeater('requirement in projects')).get(0).$("button[title='Amend this Requirement']");

    }

    //Select and fill fields for ProjectType
    CreateRequirementPage.prototype.selectProjectType = function (projectType) {
        this.projectTypeDown.sendKeys(projectType);
    };

    //Select and fill fields for FundingType
    CreateRequirementPage.prototype.selectFundingType = function (fundingType) {
        this.fundingTypeDown.sendKeys(fundingType);
    };

    //Return to requirement list
    CreateRequirementPage.prototype.returnToList = function () {
        browser.get("/requirements");
    };

    //Navigation Clicks
    CreateRequirementPage.prototype.navigateToRequirement = function () {
        this.requirementLink.click();
    };


    //Is error visible
    CreateRequirementPage.prototype.isTitleRequiredErrorDisplayed = function() {
        return this.titleRequiredError.isDisplayed();
    };

    CreateRequirementPage.prototype.isSummaryRequiredErrorDisplayed = function() {
        return this.summaryRequiredError.isDisplayed();
    };

    CreateRequirementPage.prototype.isTargetDateRequiredErrorDisplayed = function() {
        return this.targetDateRequiredError.isDisplayed();
    };

    //Add requirement Button
    CreateRequirementPage.prototype.addRequirement = function () {
        this.addRequirementButton.click();
    };

    //Fill fields
    CreateRequirementPage.prototype.fillTitle = function (title) {
        this.titleField.clear().sendKeys(title);
    };

    CreateRequirementPage.prototype.fillSummary = function (summary) {
        this.summaryField.clear().sendKeys(summary);
    };

    CreateRequirementPage.prototype.fillRevenue = function (revenue) {
        this.revenueField.clear().sendKeys(revenue);
    };

    CreateRequirementPage.prototype.fillCostSavings = function (costSavings) {
        this.costSavingsField.clear().sendKeys(costSavings);
    };

    CreateRequirementPage.prototype.fillMargin = function (margin) {
        this.marginField.clear().sendKeys(margin);
    };
    CreateRequirementPage.prototype.fillCostCode = function (margin) {
        this.costCodeField.clear().sendKeys(margin);
    };
    CreateRequirementPage.prototype.fillEfficiency = function (margin) {
        this.efficiencyField.clear().sendKeys(margin);
    };

    CreateRequirementPage.prototype.fillMaxBudget = function (maxBudget) {
        this.maxBudgetField.clear().sendKeys(maxBudget);
    };

    CreateRequirementPage.prototype.fillTargetDate = function () {
        this.targetDate.click();
    };

    //Calendar for Date selection
    CreateRequirementPage.prototype.openCalendar = function () {
        this.calendarButton.click();
    };

    //Get Title field value
    CreateRequirementPage.prototype.getTitleValue = function () {
        return this.titleField.getAttribute('value');
    };

    CreateRequirementPage.prototype.getSummaryValue = function () {
        return this.summaryField.getAttribute('value');
    };

    CreateRequirementPage.prototype.getRevenueValue = function () {
        return this.revenueField.getAttribute('value');
    };

    CreateRequirementPage.prototype.getMarginValue = function () {
        return this.marginField.getAttribute('value');
    };

    CreateRequirementPage.prototype.getCostSavingsValue = function () {
        return this.costSavingsField.getAttribute('value');
    };

    //Get Requirement List
    CreateRequirementPage.prototype.getRequirementList = function () {
        return this.requirementList;
    };



    CreateRequirementPage.prototype.cancelChangesOnForm = function () {
        var EC = protractor.ExpectedConditions;
        var isClickable = EC.elementToBeClickable(this.cancelButtonOnForm);
        browser.wait(isClickable, 5000); //wait for success dialog box to close
        this.cancelButtonOnForm.click();
        browser.waitForAngular();
    };

    CreateRequirementPage.prototype.saveRequirement = function () {
        var EC = protractor.ExpectedConditions;
        var isClickable = EC.elementToBeClickable(this.saveButton);
        browser.wait(isClickable, 5000); //wait for success dialog box to close
        this.saveButton.click();
        browser.waitForAngular();
    };

    CreateRequirementPage.prototype.submitRequirement = function () {
        var EC = protractor.ExpectedConditions;
        var isClickable = EC.elementToBeClickable(this.submitButton);
        browser.wait(isClickable, 5000); //wait for success dialog box to close
        this.submitButton.click();
        browser.waitForAngular();
    };

    CreateRequirementPage.prototype.selectDialogOKButton = function () {
        var EC = protractor.ExpectedConditions;
        var isClickable = EC.elementToBeClickable(this.modalOKButton);
        browser.wait(isClickable, 5000); //wait for success dialog to appear
        this.modalOKButton.click();
        browser.waitForAngular();
    };

    CreateRequirementPage.prototype.amendRequirement = function (value) {
        var EC = protractor.ExpectedConditions;
        var amendButton = element.all(by.repeater('requirement in projects')).get(value).$("button[title='Amend this Requirement']");
        var isClickable = EC.elementToBeClickable(amendButton);
        browser.wait(isClickable, 5000); //wait for success dialog box to close
        amendButton.click();
        browser.waitForAngular();
    };

    CreateRequirementPage.prototype.createRequirement = function () {
        var EC = protractor.ExpectedConditions;
        var isClickable = EC.elementToBeClickable(this.addRequirementButton);
        browser.wait(isClickable, 5000); //wait for success dialog box to close
        this.addRequirementButton.click();
        browser.waitForAngular();
    };



    return CreateRequirementPage;

})();