package net.atos.tenderingportal.domain.exception;

/**
 * Exception thrown when an attempt is made to execute an operation that is not permitted for the current user.
 */
public class OperationNotPermittedException extends Exception {

    public OperationNotPermittedException(String message) {
        super(message);
    }

    public OperationNotPermittedException(String message, Throwable cause) {
        super(message, cause);
    }

    public OperationNotPermittedException(Throwable cause) {
        super(cause);
    }
}
