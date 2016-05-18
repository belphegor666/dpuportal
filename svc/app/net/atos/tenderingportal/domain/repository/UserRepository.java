package net.atos.tenderingportal.domain.repository;


import net.atos.tenderingportal.domain.model.User;

import java.util.Optional;

public interface UserRepository extends GenericRepository<Long, User> {

    Optional<User> findByEmail(String email);

    Optional<User> findByActivationKey(String activationKey);

    Optional<User> findByResetPasswordKey(String resetPasswordKey);
}
