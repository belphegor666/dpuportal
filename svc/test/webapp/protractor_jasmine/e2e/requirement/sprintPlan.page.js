"use strict";

module.exports = (function () {
    function SprintPlanPage() {

        //List of my projects
        this.storiesList = element.all(by.repeater('story in stories'));

        this.addStoryButton = $('[data-ng-click="addStory()"]');

        this.amendButton = $('[data-ng-click="amend()"]');

        this.deleteButton = $('[data-ng-click="delete()"]');

        this.completeButton = $('[data-ng-click="complete()"]');

        this.cancelButton = $('[data-ng-click="delete()"]');

        this.requirementButton = $('[data-ng-click="navigateToRequirementDashboard()"]');

        //Modal elements
        this.bootstrapDialog = $(".modal-dialog");
        this.bootstrapDialogDeleteButton = element(by.css(".bootstrap-dialog-footer-buttons > .btn-warning"));
    }

    //Get Stories List
    SprintPlanPage.prototype.getStoriesForPlan = function () {
        return this.storiesList;
    };

    SprintPlanPage.prototype.getDeleteButtonOfStory = function (value) {
         var deleteButtonForStory = element.all(by.repeater('story in stories')).get(value).$('[data-ng-click="deleteStory(story)"]');
         return deleteButtonForStory;
    };

    SprintPlanPage.prototype.getUpdateButtonOfStory = function (value) {
         var amendButtonForStory = element.all(by.repeater('story in stories')).get(value).$('[data-ng-click="amendStory(story)"]');
         return amendButtonForStory;
    };

    SprintPlanPage.prototype.getCompleteButtonOfStory = function (value) {
         var completeButtonForStory = element.all(by.repeater('story in stories')).get(value).$('[data-ng-click="completeStory(story)"]');
         return completeButtonForStory;
    };

    SprintPlanPage.prototype.addStoryButtonClick = function () {
        this.addStoryButton.click();
    };

    //Test Add story button visibility
    SprintPlanPage.prototype.getAddStoryButton = function () {
        return this.storiesList;
    };

    //Return to requirements page
    SprintPlanPage.prototype.requirementButtonClick = function () {
        this.requirementButton.click();

    };

    SprintPlanPage.prototype.manageSprints = function (value) {
        var EC = protractor.ExpectedConditions;
        var manageSprintsButton = element.all(by.repeater('requirement in projects')).get(value).$("button[title='Manage Sprints for this project']");
        var isClickable = EC.elementToBeClickable(manageSprintsButton);
        browser.wait(isClickable, 5000); //wait for success dialog box to close
        manageSprintsButton.click();
        browser.waitForAngular();
    };

    SprintPlanPage.prototype.manageSprintPlans = function (value) {
        var EC = protractor.ExpectedConditions;
        var manageSprintPlansButton = element.all(by.repeater('sprint in sprints')).get(value).$("button[title='Manage Sprint Plans']");
        var isClickable = EC.elementToBeClickable(manageSprintPlansButton);
        browser.wait(isClickable, 5000); //wait for success dialog box to close
        manageSprintPlansButton.click();
        browser.waitForAngular();
    };

    SprintPlanPage.prototype.deleteStoryModalButtonClick = function() {
        this.bootstrapDialogDeleteButton.click();
    };

    SprintPlanPage.prototype.isModalDialogDisplayed = function () {
        var EC = protractor.ExpectedConditions;
        return browser.wait(EC.visibilityOf(this.bootstrapDialog), 5000);
    };

    return SprintPlanPage;

})();