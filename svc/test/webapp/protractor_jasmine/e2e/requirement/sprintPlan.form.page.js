"use strict";

module.exports = (function () {
    function SprintPlanFormPage() {

        //Fields on the form
        this.epicField = element(by.model("story.epic"));
        this.storyDetailsField = element(by.model("story.storyDetails"));
        this.trelloLinkField = element(by.model("story.trelloLink"));
        this.createdByField = element(by.model("story.createdBy"));
        this.businessAnalystField = element(by.model("role.businessAnalyst"));
        this.developerField = element(by.model("role.developer"));
        this.testerField = element(by.model("role.tester"));
        this.storyPointsField = element(by.model("story.storyPoints"));
        this.priorityField = element(by.model("story.priority"));
        this.statusField = element(by.model("storyStatus"));

        this.saveButton = element(by.buttonText("Save"));
        this.cancelButton = element(by.buttonText("Cancel"));

        //Modal elements
        this.bootstrapDialog = $(".modal-dialog");
        this.bootstrapDialogHeader = $(".bootstrap-dialog-title");
        this.bootstrapDialogMessage = $(".bootstrap-dialog-message");
        this.bootstrapDialogOKButton = element(by.buttonText("OK"));

        //Error messages
        this.epicRequiredError = $('div[data-ng-show="hasValidationError && storyForm.epic.$error.required"]');
        this.storyDetailsRequiredError = $('div[data-ng-show="hasValidationError && storyForm.story.$error.required"]');
        this.storyPointsRequiredError = $('div[data-ng-show="hasValidationError && storyForm.points.$error.required"]');
        this.priorityRequiredError = $('div[data-ng-show="hasValidationError && storyForm.priority.$error.required"]');

    }

    SprintPlanFormPage.prototype.fillEpic = function (text) {
        this.epicField.clear().sendKeys(text);
    };

    SprintPlanFormPage.prototype.fillStoryDetails = function (text) {
        this.storyDetailsField.clear().sendKeys(text);
    };

    SprintPlanFormPage.prototype.fillTrelloLink = function (text) {
        this.trelloLinkField.clear().sendKeys(text);
    };

    SprintPlanFormPage.prototype.selectBusinessAnalyst = function (option) {
        this.businessAnalystField.$('[value="' + option + '"]').click();
    };

    SprintPlanFormPage.prototype.selectDeveloper = function (option) {
        this.developerField.$('[value="' + option + '"]').click();
    };

    SprintPlanFormPage.prototype.selectTester = function (option) {
        this.testerField.$('[value="' + option + '"]').click();
    };

    SprintPlanFormPage.prototype.fillStoryPoints = function (text) {
        this.storyPointsField.clear().sendKeys(text);
    };

    SprintPlanFormPage.prototype.fillPriority = function (text) {
        this.priorityField.clear().sendKeys(text);
    };

    SprintPlanFormPage.prototype.selectStatus = function (option) {
        this.statusField.$('[label="' + option + '"]').click();
    };

    SprintPlanFormPage.prototype.save = function () {
        this.saveButton.click();
    };

    SprintPlanFormPage.prototype.cancel = function () {
        this.cancelButton.click();
    };

    SprintPlanFormPage.prototype.isModalDialogDisplayed = function () {
        var EC = protractor.ExpectedConditions;
        return browser.wait(EC.visibilityOf(this.bootstrapDialog), 5000);
    };

    SprintPlanFormPage.prototype.getModalDialogMessageText = function () {
        return this.bootstrapDialogMessage.getText();
    };

    SprintPlanFormPage.prototype.modalDialogOkButtonClick = function () {
        return this.bootstrapDialogOKButton.click();
    };

    SprintPlanFormPage.prototype.getMembersCount = function (field) {
        return field.all(by.css('option')).count();
    };

    return SprintPlanFormPage;

})();