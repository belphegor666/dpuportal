package net.atos.tenderingportal.domain.exception;

/**
 * Exception thrown when an attempt is made to register a user using an email domain that hasn't been whitelisted
 */
public class UserDomainException extends Exception {

    public UserDomainException(String message) {
        super(message);
    }

    public UserDomainException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserDomainException(Throwable cause) {
        super(cause);
    }
}
