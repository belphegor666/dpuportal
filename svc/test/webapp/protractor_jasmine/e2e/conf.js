exports.config = {
    // The location of the selenium standalone server .jar file, relative
    // to the location of this config. If no other method of starting selenium
    // is found, this will default to
    // node_modules/protractor/selenium/selenium-server...
//
//    seleniumServerJar: '../../../node_modules/protractor/selenium/selenium-server-standalone-2.48.2.jar',
//    seleniumPort: '4444',

    seleniumAddress: 'http://localhost:4444/wd/hub',

    specs: [
        "login/login.spec.js",
        "logout/logout.spec.js",
        "register/register.spec.js",
        "forgot-password/forgot-password.spec.js",
        "user/user-homepage-preference.spec.js",
        "requirement/requirement.list.projects.spec.js",
        "requirement/executive.list.projects.spec.js",
        "requirement/create.requirement.spec.js",
        "requirement/amend.requirement.spec.js",
        "requirement/requirement.documentsLink.spec.js",
        "requirement/sprintPlan.list.stories.spec.js",
        "requirement/sprintPlan.stories.spec.js",
        "my-details/my-details.spec.js",
        "activate/activate.spec.js",
        "teams/teams.spec.js",
        "joinProject/current-projects.spec.js",
        "sprint/sprint.spec.js",
        "welcome/welcome.spec.js",
        "developer/developer.spec.js",
        "certification/certification.spec.js"
    ],

    // Change this to test server; for end-to-end integration tests, this should be the local Play server on port 9000
    baseUrl: "http://localhost:9000/",

    params: {
        testSetupUrl: "http://localhost:9001/"
    },

    onPrepare: function () {
        browser.driver.manage().window().setPosition(0, 0);
        browser.driver.manage().window().setSize(1280, 720);
    },

    capabilities: {
      'browserName': 'chrome'
    },

    framework: "jasmine2",

    jasmineNodeOpts: {
        onComplete: null,
        isVerbose: true,
        showColors: true,
        includeStackTrace: false
    }
};
