"use strict";

module.exports = (function () {
    function ReleaseHistoryPage() {
        this.releaseHistoryTab = $('[data-ng-click="navigateToReleaseHistory()"]');
    }

    ReleaseHistoryPage.prototype.clickReleaseHistoryTab = function () {
        return this.releaseHistoryTab.click();
    };

    return ReleaseHistoryPage;
})();