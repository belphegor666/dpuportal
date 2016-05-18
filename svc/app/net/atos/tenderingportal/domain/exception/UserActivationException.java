package net.atos.tenderingportal.domain.exception;

/**
 * Exception thrown when an attempt is made to activate an account with an unrecognised activation key.
 */
public class UserActivationException extends Exception {

    public UserActivationException(String message) {
        super(message);
    }

    public UserActivationException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserActivationException(Throwable cause) {
        super(cause);
    }
}
