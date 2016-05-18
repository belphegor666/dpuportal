package net.atos.tenderingportal.domain.service;

import net.atos.tenderingportal.domain.model.Authentication;

/**
 * Describes a service providing user authentication.
 */
public interface AuthenticationProvider {

    /**
     * Attempts to authenticate the user with the given username and password.
     * @param username The account username
     * @param password The user's password
     * @return The result of the authentication
     */
    public Authentication authenticate(final String username, final String password);

    /**
     * Validates the security token to ensure it is valid (not tampered with) and not expired.
     * @param token The security token
     * @return The result of the token validation
     */
    public Authentication validateToken(final String token);
}
