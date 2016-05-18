"use strict";

module.exports = (function () {
    function DeveloperPage() {
        this.developerDropdown = $('[data-ng-class="{\'active\': isAtDeveloperDashboard() }"] > a');
        this.myAgileCvLink = $('[data-ng-click="navigateToAssignedProjects()"]');
        this.myTasksLink = $('[data-ng-click="navigateToAssignedTasks()"]');

        //List of my assigned stories
        this.taskList = element.all(by.repeater('story in assignedStories'));
    }

    DeveloperPage.prototype.goToMyTasks = function () {
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.elementToBeClickable(this.developerDropdown), 5000);

        this.developerDropdown.click();
        this.myTasksLink.click();
    };

    DeveloperPage.prototype.goToMyAgileCv = function () {
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.elementToBeClickable(this.developerDropdown), 5000);

        this.developerDropdown.click();
        this.myAgileCvLink.click();
    };



    //Get My Tasks List
    DeveloperPage.prototype.getMyTasks = function () {
        return this.taskList;
    };

    return DeveloperPage;
})();