"use script"

var request = require('request');

module.exports = (function () {

    function TestDataLoader(){
    }

    TestDataLoader.prototype.loadTestData = function(){
        var jar = request.jar();
        var req = request.defaults({
            jar : jar
        });

        return req.post(browser.params.testSetupUrl + "api/load-test-data");
    };

    return TestDataLoader;
})();
