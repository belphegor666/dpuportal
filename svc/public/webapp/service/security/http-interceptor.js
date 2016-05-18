angular.module("securityManager").service('httpInterceptor', ['securityStore', '$q', '$log', '$injector', function(securityStore, $q, $log, $injector) {

    //Request Success
    this.request = function(config) {

        var securityToken = securityStore.getToken();
        var subject = securityStore.getSubject();

        //Add token to header if existing
        if (securityToken) {
            config.headers.Authorization = 'Bearer ' + securityToken;
        }
        return config || $q.when(config);
    };

    //Request Error
    this.requestError = function(rejection) {

        return $q.reject(rejection);

    };

    //Response success
    this.response = function(response) {

        return response || $q.when(response);

    };

    //Response Error
    this.responseError = function(rejection) {

       //Unauthorized error
       if(rejection.status == '401') {
            $log.debug(rejection.data);
            securityStore.setToken(undefined);
            //Inject the $state service to use the go method with. Needed to prevent circular dependency between $state and $http
            $injector.get('$state').go('login');
        }

        //Internal Server Error
        if(rejection.status == '500') {

        }

        return $q.reject(rejection);

    };

}]);