"use strict";

// "Sprint" Page Object containing functions to perform actions on the Add New Sprint page.

// Node.js 'export', which exposes this Page Object module (a psuedo-class) as a constructor, for use by the tests.
module.exports = (function () {
    function SprintPage() {
        this.requirementsTab = $('[data-ng-click="navigateToRequirementDashboard()"]');

        // Locate the first "Manage Sprints" button
        this.manageSprintsButton = $$('button[title="Manage Sprints for this project"]').first();

        this.addNewSprintButton = element(by.buttonText("Add New Sprint"));

        this.sprintNumberField = element(by.model("sprint.sprintNo"));
        this.sprintTitleField = element(by.model("sprint.title"));
        this.sprintDescriptionField = element(by.model("sprint.description"));
        this.saveButton = element(by.buttonText("Save"));
        this.cancelButton = element(by.buttonText("Cancel"));
        this.openStartDateCalendarButton = $('button[data-ng-click="openStartDate($event)"]');
        this.openEndDateCalendarButton = $('button[data-ng-click="openEndDate($event)"]');

        // Locate the currently selected date on the calendar grid (there will be only one with an "active" button)
        // and get the parent 'td' element
        this.currentStartDate = $$('button[ng-click="select(dt.date)"]').filter(function (elem) {
            // Filter only for buttons with the "active" CSS class
            return elem.getAttribute('class').then(function (classes) {
                return ~classes.indexOf("active");
            });
        }).first().element(by.xpath('..'));

        // Use the parent 'td' element to obtain its parent row ('tr') element
        this.currentWeekRow = this.currentStartDate.element(by.xpath('..'));

        // Get all working days of the current week (these can be referenced by indices 0 to 4)
        this.workingDaysOfCurrentWeek = this.currentWeekRow.$$('button').filter(function (day) {
            // Filter out weekend days, which are disabled in the calendar
            return day.isEnabled();
        });

        // Error messages
        this.sprintTitleRequiredError = $('div[data-ng-show="hasValidationError && sprintForm.title.$error.required"]');
        this.sprintDescriptionRequiredError = $('div[data-ng-show="hasValidationError && sprintForm.description.$error.required"]');
        this.sprintStartDateRequiredError = $('div[data-ng-show="hasValidationError && sprintForm.startDate.$error.required"]');
        this.sprintEndDateRequiredError = $('div[data-ng-show="hasValidationError && sprintForm.endDate.$error.required"]');
        this.sprintEndDateBeforeStartDateError = $('div[data-ng-show="hasValidationError && sprint.endDate <= sprint.startDate"]');
        this.jobRoleRequiredError = $('div[data-ng-show="hasValidationError && jobRoleForm.role.$error.required"]');

        this.bootstrapDialog = $(".modal-dialog");
        this.bootstrapDialogOKButton = element(by.buttonText("OK"));
        this.bootstrapDialogNewSprintButton = element(by.buttonText("New Sprint"));

        // Sprint list
        this.sprintList = element.all(by.repeater('sprint in sprints'));

        this.joinButton = element.all(by.repeater('sprint in sprints')).first().$('button[title="Join Project"]');
        this.leaveButton = element.all(by.repeater('sprint in sprints')).first().$('button[title="Leave Project"]');
        this.jobRoleForm = element(by.name("jobRoleForm"));
        this.jobRoleField = element(by.model("role"));
        this.firstJobRoleOption = element.all(by.repeater('role in jobRoles')).first().$('a[ng-click="changeRole(role)"]');
        this.joinSprintButton = element(by.buttonText("Join Sprint"));
    }

    SprintPage.prototype.requirementsTabClick = function () {
        return this.requirementsTab.click();
    };

    SprintPage.prototype.manageSprintsButtonClick = function () {
        return this.manageSprintsButton.click();
    };

    SprintPage.prototype.addNewSprintButtonClick = function () {
        return this.addNewSprintButton.click();
    };

    SprintPage.prototype.openStartDateCalendarButtonClick = function () {
        return this.openStartDateCalendarButton.click();
    };

    SprintPage.prototype.openEndDateCalendarButtonClick = function () {
        return this.openEndDateCalendarButton.click();
    };

    SprintPage.prototype.workingDayOfCurrentWeekSelect = function (day) {
        return this.workingDaysOfCurrentWeek.get(day).click();
    };

    SprintPage.prototype.saveButtonClick = function () {
        return this.saveButton.click();
    };

    SprintPage.prototype.cancelButtonClick = function () {
        return this.cancelButton.click();
    };

    SprintPage.prototype.getSprintNumber = function () {
        return this.sprintNumberField.getAttribute('value');
    };

    SprintPage.prototype.fillTitle = function (keys) {
        return this.sprintTitleField.clear().sendKeys(keys);
    };

    SprintPage.prototype.fillDescription = function (keys) {
        return this.sprintDescriptionField.clear().sendKeys(keys);
    };

    SprintPage.prototype.isModalDialogDisplayed = function () {
        var EC = protractor.ExpectedConditions;
        return browser.wait(EC.visibilityOf(this.bootstrapDialog), 5000);
    };

    SprintPage.prototype.modalDialogOkButtonClick = function () {
        return this.bootstrapDialogOKButton.click();
    };

    SprintPage.prototype.modalDialogNewSprintButtonClick = function () {
        return this.bootstrapDialogNewSprintButton.click();
    };

    SprintPage.prototype.getSprintList = function () {
        return this.sprintList;
    };

    SprintPage.prototype.getSprintTableValues = function (rowIndex, colIndex) {
        var row = this.sprintList.get(rowIndex);
        return row.$$('td').get(colIndex).getText();
    };

    SprintPage.prototype.joinButtonClick = function () {
        return this.joinButton.click();
    };

    SprintPage.prototype.leaveButtonClick = function () {
        return this.leaveButton.click();
    };

    SprintPage.prototype.isJobRoleFormDisplayed = function () {
        var EC = protractor.ExpectedConditions;
        return browser.wait(EC.visibilityOf(this.jobRoleForm), 5000);
    };

    SprintPage.prototype.jobRoleFieldClick = function () {
        return this.jobRoleField.click();
    };

    SprintPage.prototype.firstJobRoleOptionClick = function () {
        return this.firstJobRoleOption.click();
    };

    SprintPage.prototype.joinSprintButtonClick = function () {
        return this.joinSprintButton.click();
    };

    return SprintPage;
})();