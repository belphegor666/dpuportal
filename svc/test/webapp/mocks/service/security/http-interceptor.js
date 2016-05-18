angular.module("securityManager").service('httpInterceptor', ['securityStore', '$q', function(securityStore, $q) {

    //Request Success
    this.request = function(config) {

        var securityToken = securityStore.getToken();
        var subject = securityStore.getSubject();

        //Add token to header if existing
        if (securityToken) {
            config.headers.From = subject;
            config.headers.Authorization = 'Bearer ' + securityToken;
        }
        return config || $q.when(config);
    };

    //Request Error
    this.requestError = function(rejection) {

        console.log(rejection);
        //Timeout stub, needs proper implementation
        if(rejection.timeout || (rejection.status == '401')) {
            securityStore.setToken(undefined);
        }

        //500 Error stub. Use Regex to match any 500 error perhaps?
        if(rejection.status == '500') {

        }

        return $q.reject(rejection);

    };

    //Response success
    this.response = function(response) {

        return response || $q.when(response);

    };

    //Response Error
    this.responseError = function(rejection) {

        return $q.reject(rejection);

    };

}]);