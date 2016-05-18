package net.atos.tenderingportal.infrastructure.persistence;


import net.atos.tenderingportal.domain.model.User;
import net.atos.tenderingportal.domain.repository.UserRepository;

import java.util.Optional;

/**
 * Created by koolrich on 21/09/15.
 */
public class EbeanUserRepository extends EbeanGenericRepository<Long, User> implements UserRepository {

    @Override
    Class<User> getTClass() {
        return User.class;
    }

    @Override
    public Optional<User> findByEmail(String email) {
        User user = FINDER.where()
                .eq("email", email)
                .findUnique();

        return Optional.ofNullable(user);
    }

    @Override
    public Optional<User> findByActivationKey(String activationKey) {
        User user = FINDER.where()
                .eq("activationKey", activationKey)
                .findUnique();

        return Optional.ofNullable(user);
    }

    @Override
    public Optional<User> findByResetPasswordKey(String resetPasswordKey) {
        User user = FINDER.where()
                .eq("resetPasswordKey", resetPasswordKey)
                .findUnique();

        return Optional.ofNullable(user);
    }
}
