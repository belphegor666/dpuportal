package net.atos.tenderingportal.domain.exception;

/**
 * Exception thrown when an attempt is made to register a user that already exists on the system.
 */
public class UserExistsException extends Exception {

    public UserExistsException(String message) {
        super(message);
    }

    public UserExistsException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserExistsException(Throwable cause) {
        super(cause);
    }
}
