"use strict";

/**
 * Fake module decorator for the Data Access Layer (DAL) module, extending it with a mock function for registering a user.
 */
angular.module("dal").decorator("dal", ["$delegate", "$q", "$log", "$http", function ($delegate, $q, $log) {
    var mockUsers =
        [{
            id: 1,
            title: 'Mr',
            first_name: 'Atos',
            last_name: 'User',
            email: 'atos@atos.net',
            username: 'atos@atos.net',
            telephone: '0123456789',
            password: 'AbCdEfGhIjKlMnOpQrStUvWxYz',
            activated: 1,
            activation_key: -1234567890,
            domain_domain_id: null
        },{
            id: 2,
            title: 'Mrs',
            first_name: 'Atos',
            last_name: 'Nonverified',
            email: 'atos@atos.net',
            username: 'atos@atos.net',
            telephone: '0123456789',
            password: 'AbCdEfGhIjKlMnOpQrStUvWxYz',
            activated: 0,
            activation_key: -2345678901,
            domain_domain_id: null
        }];

    /**
     * This is where the $http REST service call goes but is mocked in this instance.
     * @param credentials
     * @returns {*}
     */
    $delegate.register = function(credentials) {
        var deferred = $q.defer();

        var findEmail = _.find(mockUsers, function(users) { return users.email == credentials.email });

        if (credentials.email == (undefined || null)) {
            deferred.reject("Invalid Email");
        } // Checks to see if email already exists in mock users
        else if (findEmail != undefined && credentials.email == findEmail.email) {
            deferred.reject("Email already exists");
        }
        else {
            deferred.resolve();
        }

        return deferred.promise;
    };

    return $delegate;
}]);
