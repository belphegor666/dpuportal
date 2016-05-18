"use strict";

// "Teams" Page Object containing functions to perform actions on the Project Teams page.

// Node.js 'export', which exposes this Page Object module (a psuedo-class) as a constructor, for use by the tests.
module.exports = (function () {
    function TeamsPage() {
        this.teamsTab = $('[data-ng-click="navigateToTeams()"]');
        this.dateHeader = element(by.name('dateHeader'));
        this.previousButton = $('button[data-ng-click="previousWeek()"]');
        this.nextButton = $('button[data-ng-click="nextWeek()"]');
        this.todayButton = $('button[data-ng-click="today()"]');

        // Data rows
        this.projectTeams = element.all(by.repeater('project in projects'));

        // Summary total row
        this.summaryTotalRow = $('tfoot').$('tr').$('td');
    }

    TeamsPage.prototype.clickTeamsTab = function () {
        return this.teamsTab.click();
    };

    TeamsPage.prototype.getDateHeaderText = function () {
        return this.dateHeader.getText();
    };

    TeamsPage.prototype.clickPrevious = function () {
        return this.previousButton.click();
    };

    TeamsPage.prototype.clickNext = function () {
        return this.nextButton.click();
    };

    TeamsPage.prototype.clickToday = function () {
        return this.todayButton.click();
    };

    TeamsPage.prototype.getRowValues = function (rowIndex, colIndex) {
        var row = this.projectTeams.get(rowIndex);
        return row.$$('td').get(colIndex).getText();
    };

    TeamsPage.prototype.getTeamMembersInfo = function (rowIndex, memberIndex) {
        return this.projectTeams.get(rowIndex).$$('td').get(5).element(by.repeater('teamMember in project.sprints[0].members')
            .row(memberIndex)).getText();
    };

    TeamsPage.prototype.getTeamMemberCertifications = function (rowIndex, memberIndex) {
        return this.projectTeams.get(rowIndex).$$('td').get(5).element(by.repeater('teamMember in project.sprints[0].members')
            .row(memberIndex)).all(by.repeater('certification in teamMember.certifications')).map(function (certification) {
            return {
                cert: certification.getText(),
                class: certification.getAttribute('class')
            };
        });
    };

    TeamsPage.prototype.getSummaryTotal = function () {
        return this.summaryTotalRow.getText();
    };

    return TeamsPage;
})();