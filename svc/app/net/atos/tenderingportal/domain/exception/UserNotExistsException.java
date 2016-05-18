package net.atos.tenderingportal.domain.exception;

/**
 * Exception thrown when an attempt is made to register a user that does not exist on the system.
 */
public class UserNotExistsException extends Exception {

    public UserNotExistsException(String message) {
        super(message);
    }

    public UserNotExistsException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserNotExistsException(Throwable cause) {
        super(cause);
    }
}
