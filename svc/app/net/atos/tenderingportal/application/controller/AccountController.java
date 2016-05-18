package net.atos.tenderingportal.application.controller;

import com.fasterxml.jackson.databind.JsonNode;
import net.atos.tenderingportal.domain.exception.*;
import net.atos.tenderingportal.domain.model.Authentication;
import net.atos.tenderingportal.domain.model.User;
import net.atos.tenderingportal.domain.service.AuthenticationProvider;
import net.atos.tenderingportal.domain.service.UserService;
import play.Logger;
import play.data.validation.Constraints;
import play.db.ebean.Transactional;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;

/**
 * Controller class providing REST services for user account management.
 */
public class AccountController extends Controller {

    @Inject
    private AuthenticationProvider authenticationProvider;

    private UserService userService;

    @Inject
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    /**
     * Authenticates a registered user.
     *
     * @return The authentication result
     */
    public Result login() {
        // Parse the request body as JSON and read it as a Login object.
        Login loginRequest = Json.fromJson(request().body().asJson(), Login.class);

        // Attempt the authentication and return the result.
        Authentication authentication = authenticationProvider.authenticate(loginRequest.username, loginRequest.password);

        return (authentication.isAuthenticated()) ? ok(Json.toJson(authentication)) : unauthorized();
    }

    /**
     * Registers a new user.
     *
     * @return The registration result
     */
    @Transactional
    public Result registerUser() {
        // Parse the request body as JSON and read it as a User object.
        User newUserRequest = Json.fromJson(request().body().asJson(), User.class);

        // Attempt to register the new user.
        try {
            userService.registerUser(newUserRequest);
            return created("New user registered successfully.");
        } catch (UserExistsException e) {
            return badRequest(e.getMessage());
        } catch (UserDomainException e) {
            return badRequest(e.getMessage());
        }
    }

    /**
     * Activates a new user's account.
     *
     * @param activationKey The unique activation key associated with the account
     * @return The account activation result
     */
    public Result activateUser(String activationKey) {
        // Attempt to activate the user's account.
        try {
            userService.activateUser(activationKey);
            return ok("User account activated.");
        } catch (UserActivationException e) {
            return badRequest(e.getMessage());
        }
    }

    /**
     * Sends a reset password request to user email.
     *
     * @return The forgot password result
     */
    public Result forgotPassword() {
        JsonNode json = request().body().asJson();
        String email = json.findPath("email").textValue();
        try {
            if(email != null) {
                userService.forgotPassword(email);
            }
            else {
                return badRequest("Missing Parameter [email]");
            }
        } catch(UserActivationException e) {
            return badRequest(e.getMessage());
        } catch(UserNotExistsException e) {
            return badRequest(e.getMessage());
        }
        return ok("If email is registered, reset password email will be sent");
    }

    /**
     * Change a user's password
     *
     * @return The change password result
     */
    public Result changePassword() {
        UserPassword changePasswordRequest = Json.fromJson(request().body().asJson(), UserPassword.class);
        try {
            userService.changePassword(changePasswordRequest.userId, changePasswordRequest.currentPassword, changePasswordRequest.password);
            return ok("Password changed");
        } catch(UserWrongPasswordException e) {
            return badRequest(e.getMessage());
        }
    }

    /**
     * Simple class to encapsulate a Login object. Both fields are required for this to be a well-formed object.
     */
    public static class Login {
        @Constraints.Required
        public String username;

        @Constraints.Required
        public String password;
    }

    /**
     * Simple class to get the current, and new passwords
     */
    public static class UserPassword {
        @Constraints.Required
        public Long userId;

        @Constraints.Required
        public String currentPassword;

        @Constraints.Required
        public String password;
    }
}
