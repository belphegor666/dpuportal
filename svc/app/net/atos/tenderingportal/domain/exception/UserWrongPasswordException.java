package net.atos.tenderingportal.domain.exception;

/**
 * Exception thrown when an attempt is made to change password when the current password is wrong
 */
public class UserWrongPasswordException extends Exception {

    public UserWrongPasswordException(String message) {
        super(message);
    }

    public UserWrongPasswordException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserWrongPasswordException(Throwable cause) {
        super(cause);
    }
}
