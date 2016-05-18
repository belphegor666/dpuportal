package net.atos.tenderingportal.infrastructure.persistence;

import net.atos.tenderingportal.domain.model.User;
import net.atos.tenderingportal.domain.repository.UserRepository;
import org.junit.Before;
import org.junit.Test;

import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

/**
 * Unit tests for {@link UserRepository}.
 */
public class UserRepositoryTest extends BaseRepositoryTest {

    private UserRepository userRepository;

    @Before
    public void initialize() {
        userRepository = new EbeanUserRepository();
        User user = new User("Origi", "Nator", "originator@example.com", "password");
        user.setActivationKey("abc123");
        userRepository.save(user);

        user = new User("Deli", "Very", "delivery@example.com", "password");
        user.setActivationKey("xyz789");
        userRepository.save(user);
    }

    @Test
    public void userIsFoundByEmail() {
        Optional<User> thisUser = userRepository.findByEmail("originator@example.com");
        assertTrue(thisUser.isPresent());

        User user = thisUser.get();
        assertEquals("Origi", user.getFirstName());
    }

    @Test
    public void userIsFoundByActivationKey() {
        Optional<User> thisUser = userRepository.findByActivationKey("xyz789");
        assertTrue(thisUser.isPresent());

        User user = thisUser.get();
        assertEquals("Deli", user.getFirstName());
    }
}
