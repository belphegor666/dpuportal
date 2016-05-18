angular.module("securityManager")
    .decorator("securityManager", function ($delegate) {

        // Create local variable equal to untouched login function
        var login = $delegate.login;

        // Extends the securityManager login function (Appends to the beginning of the function)
        $delegate.login = function (username, password) {
            //console.log("Extended");
            return login(username, password);
        };

        // Create local variable equal to untouched setToken function
        var setToken = $delegate.setToken;

        // Extends the setToken function (Appends to beginning)
        $delegate.setToken = function(token) {
            console.log(token);
            return setToken(token);
        };

        // Return whatever decorations have been done on the original service
        return $delegate;

    });