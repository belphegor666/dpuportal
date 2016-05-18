var app = angular.module("app", ["ui.router", "googlechart", "ui.bootstrap", "dal", "securityManager", "repository", "referenceData"]).run(
    function ($window, $rootScope, $log) {
        $log.debug("App Instantiated");

        $rootScope.$$refdata = $$refdata;
        $rootScope.$$errorText = $$errorText;

    });


/**
 * Configuration
 */
app.config(function ($httpProvider, $logProvider) {

    //Configure logging
    $logProvider.debugEnabled(false);
    if (!$httpProvider.defaults.headers.get){
        $httpProvider.defaults.headers.get = {};
    }
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

    //Http Interceptor
    $httpProvider.interceptors.push('httpInterceptor');
});
