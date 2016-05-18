package net.atos.tenderingportal.domain.service;

import net.atos.tenderingportal.domain.util.BCrypt;
import play.Logger;

import java.util.regex.Pattern;

/**
 * Created by koolrich on 26/09/15.
 */
public class BCryptEncryptionService {

    private Pattern BCRYPT_PATTERN = Pattern
            .compile("\\A\\$2a?\\$\\d\\d\\$[./0-9A-Za-z]{53}");

    public String encrypt(CharSequence rawPassword) {
        String salt;
        salt = BCrypt.gensalt();

        return BCrypt.hashpw(rawPassword.toString(), salt);
    }

    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        if (encodedPassword == null || encodedPassword.length() == 0) {
            Logger.warn("Empty encoded password");
            return false;
        }

        if (!BCRYPT_PATTERN.matcher(encodedPassword).matches()) {
            Logger.warn("Encoded password does not look like BCrypt");
            return false;
        }

        return BCrypt.checkpw(rawPassword.toString(), encodedPassword);
    }
}
