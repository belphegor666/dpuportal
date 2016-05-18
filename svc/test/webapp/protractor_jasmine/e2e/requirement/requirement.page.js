"use strict";

module.exports = (function () {
    function RequirementPage() {

        //Test of clickable links
        this.sprintLink = element(by.linkText("Sprints"));

        //List of my projects
        this.projectList = element.all(by.repeater('requirement in projects'));

        this.draftValues = element(by.css("div.panel.panel-red > div > div > div.col-xs-9.text-right"));

        this.submittedValues = element(by.css("div.panel.panel-primary > div > div > div.col-xs-9.text-right"));

        this.inDevelopmentValues = element(by.css("div.panel.panel-yellow > div > div > div.col-xs-9.text-right"));

        this.completedValues = element(by.css("div.panel.panel-green > div > div > div.col-xs-9.text-right"));

        this.createRequirementButton = $('[data-ng-click="createRequirement()"]');

        this.amendButton = $('[data-ng-click="amend()"]');

        this.cancelButton = $('[data-ng-click="delete()"]');

        this.sprintButton = $('[data-ng-click="manageSprints()"]');

        this.requirementButton = $('[data-ng-click="navigateToRequirementDashboard()"]');

        this.executiveButton = $('[data-ng-click="navigateToExecutiveDashboard()"]');

        this.formFieldSet = element(by.css('fieldset'));

        this.draftStatusLink =  $('[data-ng-click="filterByStatus($$refdata.PROJECT_STATUS.DRAFT)"]');
        this.submittedStatusLink =  $('[data-ng-click="filterByStatus($$refdata.PROJECT_STATUS.SUBMITTED)"]');
        this.inDevelopmentStatusLink =  $('[data-ng-click="filterByStatus($$refdata.PROJECT_STATUS.IN_DEVELOPMENT)"]');
        this.completedOkStatusLink =  $('[data-ng-click="filterByStatus($$refdata.PROJECT_STATUS.CLOSED_OK)"]');
    }


    RequirementPage.prototype.draftStatusLinkClick = function () {
        this.draftStatusLink.click();

    };

    RequirementPage.prototype.submittedStatusLinkClick = function () {
        this.submittedStatusLink.click();

    };

    RequirementPage.prototype.inDevelopmentStatusLinkClick = function () {
        this.inDevelopmentStatusLink.click();

    };

    RequirementPage.prototype.completedOkStatusLinkClick = function () {
        this.completedOkStatusLink.click();

    };

    //Get My Projects List
    RequirementPage.prototype.getMyProjects = function () {
        return this.projectList;
    };

    //Test create requirement button click
    RequirementPage.prototype.createRequirementButtonClick = function () {
        this.createRequirementButton.click();

    };

    //Test amend button click
    RequirementPage.prototype.amendButtonClick = function () {
        this.amendButton.click();

    };


    //Test sprint button click
    RequirementPage.prototype.navigateToSprints = function () {
        this.sprintButton.click();

    };

    //Return to requirements page
    RequirementPage.prototype.requirementButtonClick = function () {
        this.requirementButton.click();

    };

    //Return to executive page
    RequirementPage.prototype.executiveButtonClick = function () {
        this.executiveButton.click();

    };


    RequirementPage.prototype.amendRequirement = function (value) {
        var EC = protractor.ExpectedConditions;
        var amendButton = element.all(by.repeater('requirement in projects')).get(value).$("button[title='Amend this Requirement']");
        var isClickable = EC.elementToBeClickable(amendButton);
        browser.wait(isClickable, 5000); //wait for success dialog box to close
        amendButton.click();
        browser.waitForAngular();
    };

    return RequirementPage;

})();