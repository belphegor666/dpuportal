module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],

        basePath: '../../../',

        preprocessors: {
            "public/webapp/feature/**/*.js": ['coverage'],
            "public/webapp/service/**/*.js": ['coverage'],
            "public/webapp/constant/**/*.js": ['coverage'],
            "public/webapp/directive/**/*.js": ['coverage'],
            "public/webapp/*.js": ['coverage']
        },

        files: [
            // Main libriaries dependencies
            "public/webapp/lib/lodash/lodash.min.js",
            "public/webapp/lib/jquery/jquery.min.js",
            "public/webapp/lib/angular/angular.min.js",
            "public/webapp/lib/angular-ui/angular-ui-router.js",
            "public/webapp/lib/bootstrap/js/bootstrap.min.js",
            "public/webapp/lib/bootstrap3-dialog/js/bootstrap-dialog.min.js",

            <!-- Test Libraries (note angular-mocks.js needs to be loaded after real angular) -->
            "test/webapp/unit/lib/angular-1.4.4/angular-mocks.js",

             "test/webapp/unit/app.js",
             "test/webapp/mocks/service/security/security-manager.js",

             <!-- app dependencies required to run tests-->
             "public/webapp/service/security/security-store.js",
             "public/webapp/service/dal/dal.js",
             "public/webapp/service/repository/repository.js",
             "public/webapp/service/repository/project.js",
             "public/webapp/service/repository/sprint.js",

             "public/webapp/refdata/refdata.js",

             <!-- Mocks-->
             "test/webapp/mocks/service/dal/register.js",
             "test/webapp/mocks/service/dal/project.js",
             "test/webapp/mocks/service/dal/sprint.js",

             <!-- Features being tested -->
             "public/webapp/component/dashboard/bar-chart-requirement-users/bar-chart-requirement-users-controller.js",
             "public/webapp/component/dashboard/combo-chart-revenue-cost/combo-chart-revenue-cost-controller.js",
             "public/webapp/component/dashboard/pie-chart-requirement-status/pie-chart-requirement-status-controller.js",
             "public/webapp/component/dashboard/pie-chart-sprint-status/pie-chart-sprint-status-controller.js",
             "public/webapp/component/dashboard/stepped-area-progress/stepped-area-progress-controller.js",


             <!--tests-->
             "test/webapp/unit/component/bar-chart-requirement-users.spec.js",
             "test/webapp/unit/component/combo-chart-revenue-cost.spec.js",
             "test/webapp/unit/component/pie-chart-requirement-status.spec.js",
             "test/webapp/unit/component/pie-chart-sprint-status.spec.js",
             "test/webapp/unit/component/stepped-area-progress.spec.js"

        ],
        // list of files to exclude
        exclude: [],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers when tests are launched
        browsers: ['Chrome'],

        // test results reporter to use
        reporters: ['progress', 'coverage'],

        coverageReporter: {
            type: 'html',
            dir: 'test/webapp/unit/reports/karma/coverage/'
        },

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};
