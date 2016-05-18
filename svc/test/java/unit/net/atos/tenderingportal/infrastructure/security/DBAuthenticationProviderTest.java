package net.atos.tenderingportal.infrastructure.security;

import net.atos.tenderingportal.domain.enums.HomePagePreference;
import net.atos.tenderingportal.domain.enums.Role;
import net.atos.tenderingportal.domain.enums.SystemRole;
import net.atos.tenderingportal.domain.model.Authentication;
import net.atos.tenderingportal.domain.model.User;
import net.atos.tenderingportal.domain.repository.UserRepository;
import net.atos.tenderingportal.domain.service.BCryptEncryptionService;
import org.junit.Before;
import org.junit.Test;

import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

/**
 * Unit tests for {@link DBAuthenticationProvider}.
 */
public class DBAuthenticationProviderTest {

    private BCryptEncryptionService bCryptEncryptionService = new BCryptEncryptionService();
    private String password;
    private User user;
    private DBAuthenticationProvider dbAuthenticationProviderSpy;

    @Before
    public void initialize() {
        password = bCryptEncryptionService.encrypt("password");
        user = new User("John", "Doe", "johndoe@test.com", password);
        user.setUserId(Long.valueOf(1));
        user.setActivated(true);
        user.setRole(SystemRole.USER);
        user.setHomePagePreference(HomePagePreference.REQUIREMENT);
        user.setTelephone("01234567890");
        user.setJobTitle("Job title");

        dbAuthenticationProviderSpy = spy(new DBAuthenticationProvider());

        // Use the doReturn/when syntax instead of when/thenReturn because the spy object would invoke the real method
        // and throw a NullPointerException due to uninitialized attributes.
        doReturn("secretKey").when(dbAuthenticationProviderSpy).getSecretKey();

        dbAuthenticationProviderSpy.setEncryptionService(bCryptEncryptionService);
    }

    @Test
    public void userIsAuthenticatedWithCorrectPassword() {
        Authentication authentication = authenticateUser(user, "password");
        assertTrue(authentication.isAuthenticated());
        assertEquals(user.getUserId(), authentication.getSubject());
        assertNotNull(authentication.getAuthToken());
    }

//    @Test
//    public void userIsNotAuthenticatedWithIncorrectPassword() {
//        Authentication authentication = authenticateUser(user, "passw0rd");
//        assertFalse(authentication.isAuthenticated());
//        assertEquals(null, authentication.getSubject());
//        assertNull(authentication.getAuthToken());
//    }
//
//    @Test
//    public void validUserTokenIsValidated() {
//        Authentication authentication = authenticateUser(user, "password");
//        Authentication tokenAuth = dbAuthenticationProviderSpy.validateToken(authentication.getAuthToken());
//        assertTrue(tokenAuth.isAuthenticated());
//        assertFalse(tokenAuth.isTokenExpired());
//    }
//
//    @Test
//    public void invalidUserTokenIsNotValidated() {
//        Authentication authentication = authenticateUser(user, "password");
//        Authentication tokenAuth = dbAuthenticationProviderSpy.validateToken(authentication.getAuthToken() + "tampered");
//        assertFalse(tokenAuth.isAuthenticated());
//    }
//
//    @Test
//    public void inactivatedUserIsNotAuthenticated() {
//        user.setActivated(false);
//        Authentication authentication = authenticateUser(user, "password");
//        assertFalse(authentication.isAuthenticated());
//        assertEquals(null, authentication.getSubject());
//        assertNull(authentication.getAuthToken());
//    }
//
//    @Test
//    public void unrecognisedUserIsNotAuthenticated() {
//        user.setActivated(false);
//        UserRepository userRepositoryMock = mock(UserRepository.class);
//        when(userRepositoryMock.findByEmail(user.getEmail())).thenReturn(Optional.<User>empty());
//        dbAuthenticationProviderSpy.setUserRepository(userRepositoryMock);
//
//        Authentication authentication = dbAuthenticationProviderSpy.authenticate(user.getEmail(), password);
//        assertFalse(authentication.isAuthenticated());
//        assertEquals(null, authentication.getSubject());
//        assertNull(authentication.getAuthToken());
//    }

    private Authentication authenticateUser(User user, String password) {
        UserRepository userRepositoryMock = mock(UserRepository.class);
        when(userRepositoryMock.findByEmail(user.getEmail())).thenReturn(Optional.of(user));
        dbAuthenticationProviderSpy.setUserRepository(userRepositoryMock);

        return dbAuthenticationProviderSpy.authenticate(user.getEmail(), password);
    }
}
