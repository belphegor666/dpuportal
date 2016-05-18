"use strict";

// "Projects" Page Object containing functions to perform actions on the Current Projects page.

// Node.js 'export', which exposes this Page Object module (a psuedo-class) as a constructor, for use by the tests.
module.exports = (function () {
    function ProjectsPage() {
        this.projectsTab = $('[data-ng-click="navigateToJoinAProjectThisWeek()"]');
        this.developerTabDropdown = element(by.cssContainingText('.dropdown-toggle', 'Developer '));
        this.myAgileCVMenuItem = $('[data-ng-click="navigateToAssignedProjects()"]');
        this.assignedProjects = element.all(by.repeater("project in assignedProjects"));

        // Data rows
        this.priorityOneProjects = element.all(by.repeater('project in projects | filter: {priority: 1}'));
        this.priorityTwoProjects = element.all(by.repeater('project in projects | filter: {priority: 2}'));
        this.priorityThreeProjects = element.all(by.repeater('project in projects | filter: {priority: 3}'));

        this.priorityTwoProjectJoinButton = element.all(by.repeater('project in projects | filter: {priority: 2}')).first().$('button[title="Join Project"]');
        this.priorityTwoProjectLeaveButton = element.all(by.repeater('project in projects | filter: {priority: 2}')).first().$('button[title="Leave Project"]');
    }

    ProjectsPage.prototype.projectsTabClick = function () {
        return this.projectsTab.click();
    };

    ProjectsPage.prototype.developerTabDropdownClick = function () {
        return this.developerTabDropdown.click();
    };

    ProjectsPage.prototype.myAgileCVMenuItemClick = function () {
        return this.myAgileCVMenuItem.click();
    };

    ProjectsPage.prototype.getAssignedProjects = function () {
        return this.assignedProjects;
    };

    ProjectsPage.prototype.getPriorityOneRowValues = function (rowIndex, colIndex) {
        var row = this.priorityOneProjects.get(rowIndex);
        return row.$$('td').get(colIndex).getText();
    };

    ProjectsPage.prototype.getPriorityTwoRowValues = function (rowIndex, colIndex) {
        var row = this.priorityTwoProjects.get(rowIndex);
        return row.$$('td').get(colIndex).getText();
    };

    ProjectsPage.prototype.getPriorityThreeRowValues = function (rowIndex, colIndex) {
        var row = this.priorityThreeProjects.get(rowIndex);
        return row.$$('td').get(colIndex).getText();
    };

    ProjectsPage.prototype.priorityTwoProjectJoinButtonClick = function () {
        return this.priorityTwoProjectJoinButton.click();
    };

    ProjectsPage.prototype.priorityTwoProjectLeaveButtonClick = function () {
        return this.priorityTwoProjectLeaveButton.click();
    };

    return ProjectsPage;
})();