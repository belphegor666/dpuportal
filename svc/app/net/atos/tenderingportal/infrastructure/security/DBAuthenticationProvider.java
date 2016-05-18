package net.atos.tenderingportal.infrastructure.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.impl.TextCodec;
import net.atos.tenderingportal.domain.model.User;
import net.atos.tenderingportal.domain.repository.UserRepository;
import org.apache.commons.lang.RandomStringUtils;
import org.apache.commons.lang.time.DateUtils;
import play.Configuration;
import play.Logger;
import net.atos.tenderingportal.domain.model.Authentication;
import net.atos.tenderingportal.domain.service.AuthenticationProvider;
import net.atos.tenderingportal.domain.service.BCryptEncryptionService;

import javax.inject.Inject;
import java.util.Date;
import java.util.Optional;

/**
 * An AuthenticationProvider implementation that authenticates against the database.
 */
public class DBAuthenticationProvider implements AuthenticationProvider {

    private UserRepository userRepository;
    private BCryptEncryptionService encryptionService;

    private Configuration configuration;

    @Inject
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Inject
    public void setEncryptionService(BCryptEncryptionService encryptionService) {
        this.encryptionService = encryptionService;
    }

    @Inject
    public void setConfiguration(Configuration configuration) {
        this.configuration = configuration;
    }

    /**
     * Performs authentication against the database.
     *
     * @param username The account username
     * @param password The user's password
     * @return An Authentication populated with a security token and the user's details if successful, or an empty Authentication otherwise
     */
    @Override
    public Authentication authenticate(String username, String password) {
        Logger.debug("Authenticating user: " + username);

        Optional<User> activatedUser = userRepository.findByEmail(username).filter(user -> user.isActivated());

        if (activatedUser.isPresent()) {
            User user = activatedUser.get();

            if (!encryptionService.matches(password, user.getPassword())) {
                return new Authentication(null, null, false);
            }

            String token = generateJwtTokenForPerson(user);
            Authentication authentication = new Authentication(token, user.getUserId(), true);
            try {
                authentication.setFirstName(user.getFirstName());
                authentication.setLastName(user.getLastName());
                authentication.setEmail(user.getEmail());
                authentication.setTelephone(user.getTelephone());
                authentication.setJobTitle(user.getJobTitle());
                authentication.setRole(user.getRole().getValue());
                authentication.setResetPasswordKey(user.getResetPasswordKey());
                authentication.setHomePagePreference(user.getHomePagePreference().getValue());
                authentication.setTwitterUrl(user.getTwitterUrl());
                authentication.setLinkedInUrl(user.getLinkedInUrl());
            } catch (NullPointerException e) {
                Logger.debug("Error setting authentication details", e);
            }

            return authentication;
        }

        return new Authentication(null, null, false);
    }

    /**
     * Validates the JWT token to ensure it is valid (not tampered with) and not expired
     * @param token The security token
     * @return An Authentication containing the token and its expiry status, or an empty Authentication if the token is invalid
     */
    @Override
    public Authentication validateToken(String token) {

        Authentication authentication;

        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(TextCodec.BASE64.encode(getSecretKey()))
                    .parseClaimsJws(token).getBody();

            authentication = new Authentication(token, Long.parseLong(claims.getId()), true);
            authentication.setTokenExpired(false);

        } catch(ExpiredJwtException expiredJwtException){
            authentication = new Authentication(token, null, true);
            authentication.setTokenExpired(true);
        } catch (SignatureException signatureException){
            authentication = new Authentication(token, null, false);
        }

        return authentication;
    }

    String getSecretKey() {
        return configuration.getString("play.crypto.secret");
    }

    /**
     * Generates a JWT token for a user
     * @param user
     * @return
     */
    private String generateJwtTokenForPerson(User user) {

        String name = user.getFirstName() + " " +user.getLastName();
        Date issueDate = new Date();

        String token = Jwts.builder()
                .setId(user.getUserId().toString())
                .setSubject(name)
                .setIssuedAt(issueDate)
                .setExpiration(DateUtils.addHours(issueDate, 1))
                .signWith(SignatureAlgorithm.HS256, TextCodec.BASE64.encode(getSecretKey()))
                .compact();

        return token;
    }

}
