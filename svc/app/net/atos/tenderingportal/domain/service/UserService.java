package net.atos.tenderingportal.domain.service;

import com.typesafe.config.ConfigFactory;
import net.atos.tenderingportal.domain.dto.ProjectDto;
import net.atos.tenderingportal.domain.dto.StoryDto;
import net.atos.tenderingportal.domain.enums.HomePagePreference;
import net.atos.tenderingportal.domain.enums.SystemRole;
import net.atos.tenderingportal.domain.exception.*;
import net.atos.tenderingportal.domain.model.User;
import net.atos.tenderingportal.domain.model.Whitelist;
import net.atos.tenderingportal.domain.repository.*;
import net.atos.tenderingportal.domain.util.RandomUtil;
import net.atos.tenderingportal.infrastructure.notification.MailService;
import play.Logger;

import javax.inject.Inject;
import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * Business service implementation for operations related to a {@link User}.
 */
public class UserService {

    private UserRepository userRepository;
    private WhitelistRepository whitelistRepository;
    private SprintUserRepository sprintUserRepository;
    private StoryRepository storyRepository;
    private BCryptEncryptionService encryptionService;
    private MailService mailService;

    @Inject
    public UserService(UserRepository userRepository, WhitelistRepository whitelistRepository,
                       SprintUserRepository sprintUserRepository,
                       BCryptEncryptionService encryptionService,
                       StoryRepository storyRepository,
                       MailService mailService) {
        this.userRepository = userRepository;
        this.whitelistRepository = whitelistRepository;
        this.sprintUserRepository = sprintUserRepository;
        this.encryptionService = encryptionService;
        this.storyRepository = storyRepository;
        this.mailService = mailService;
    }

    /**
     * Registers a new user and sends an account activation e-mail to the individual.
     *
     * @param user The user to register
     * @throws UserExistsException If the user already exists
     * @throws UserDomainException If user is not part of whitelisted domains
     */
    public void registerUser(User user) throws UserExistsException, UserDomainException {
        String[] tempEmailArray = user.getEmail().split("@");
        String userDomain = tempEmailArray[tempEmailArray.length - 1].toUpperCase();

        Whitelist whitelist = whitelistRepository.findByDomain(userDomain);

        // Check if the user already exists; register them only if they do not.

        if(whitelist != null) {
            Optional<User> thisUser = userRepository.findByEmail(user.getEmail());

            if (thisUser.isPresent()) {
                throw new UserExistsException("User already exists and cannot be registered again. Please login.");
            } else {
                user.setRole(SystemRole.USER);
                user.setHomePagePreference(HomePagePreference.WELCOME);
                user.setPassword(encryptionService.encrypt(user.getPassword()));
                user.setActivationKey(RandomUtil.generateActivationKey());
                user.setResetPasswordKey(null);
                user.setCreatedDate(new Date());
                userRepository.save(user);

                // Send account activation e-mail.
                mailService.sendActivationMail(user, ConfigFactory.load().getString("play.base.url"));
            }
        } else {
            throw new UserDomainException("Your email domain is not allowed at this moment in time. Please check back later");
        }
    }

    /**
     * Activates a new user's account.
     *
     * @param activationKey The unique activation key associated with the account
     * @throws UserActivationException If the activation key does not exist
     */
    public void activateUser(final String activationKey) throws UserActivationException {
        Logger.debug("Activating user account with activation key {}", activationKey);

        // Check if there is a user account with the specified activation key.
        Optional<User> thisUser = userRepository.findByActivationKey(activationKey);

        if (thisUser.isPresent()) {
            User existingUser = thisUser.get();
            existingUser.setActivated(true);
            userRepository.save(existingUser);
        } else {
            throw new UserActivationException("Could not activate user account - invalid activation key.");
        }
    }

    /**
     * Resets users password
     */
    public void forgotPassword(String email) throws UserActivationException, UserNotExistsException {
        Logger.debug("Forgot user password needs email to be sent in order to reset");

        // Check if there is a user account with the email.
        Optional<User> thisUser = userRepository.findByEmail(email);

        if (thisUser.isPresent()) {
            User existingUser = thisUser.get();
            if(existingUser.isActivated() == true) {
                existingUser.setResetPasswordKey(RandomUtil.generateResetKey());
                String newPassword = RandomUtil.generatePassword();
                existingUser.setPassword(encryptionService.encrypt(newPassword));
                userRepository.save(existingUser);
                //mailService.sendForgotPasswordMail(existingUser, ConfigFactory.load().getString("play.base.url"));
                mailService.sendResetPasswordMail(existingUser, ConfigFactory.load().getString("play.base.url"), newPassword);
            } else {
                throw new UserActivationException("You have not yet activated your registered email");
            }
        } else {
            throw new UserNotExistsException("You have not yet registered");
        }
        //Else do nothing for now. Add else block if non-existing email error must be returned to front end.
    }

    /**
     * Changes the user's current password
     */
    public void changePassword(Long userId, String currentPassword, String password) throws UserWrongPasswordException {
        Logger.debug("Changing user's password");

        User user = userRepository.findById(userId);
        if(encryptionService.matches(currentPassword, user.getPassword())) {
            user.setPassword(encryptionService.encrypt(password));
            user.setResetPasswordKey(null);
            userRepository.save(user);
        } else {
            throw new UserWrongPasswordException("Your have entered an incorrect current password");
        }
    }

    /**
     * Sets the users homepage
     */
    public void saveHomePagePreference(HomePagePreference homePagePreference, Long userId) {
        Logger.debug("Saving user's homepage preference");

        User user = userRepository.findById(userId);
        user.setHomePagePreference(homePagePreference);
        userRepository.save(user);
    }

    /**
     * Changes the users account details
     */
    public void editAccountDetails(User user) {
        Logger.debug("Changing User Account Details");

        User thisUser = userRepository.findByEmail(user.getEmail()).get();

        thisUser.setFirstName(user.getFirstName());
        thisUser.setLastName(user.getLastName());
        thisUser.setTwitterUrl(user.getTwitterUrl());
        thisUser.setLinkedInUrl(user.getLinkedInUrl());

        userRepository.save(thisUser);
    }

    public List<ProjectDto> findProjectsAssignedToUser(Long userId){
        return sprintUserRepository.findProjectsAssignedToUser(userId);
    }

    public List<StoryDto> findStoriesAssignedToUser(Long userId){
        User persistedUser = userRepository.findById(userId);
        return storyRepository.findCurrentStoriesAssignedToUser(persistedUser.getEmail());
    }
}
