package net.atos.tenderingportal.domain.service;

import org.junit.Test;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;

/**
 * Created by koolrich on 26/09/15.
 */
public class BCryptEncryptionServiceTest {

    @Test
    public void encryptAndMatchCorrectPassword(){
        BCryptEncryptionService encryptionService = new BCryptEncryptionService();
        String plainPassword = "joebloggs12";

        String encryptedPassword = encryptionService.encrypt(plainPassword);

        boolean valid = encryptionService.matches(plainPassword, encryptedPassword);

        assertThat(valid, equalTo(true));
    }

    @Test
    public void encryptAndMatchIncorrectPassword(){
        BCryptEncryptionService encryptionService = new BCryptEncryptionService();
        String plainPassword = "joebloggs12";

        String encryptedPassword = encryptionService.encrypt(plainPassword);

        boolean valid = encryptionService.matches("joebloggs123", encryptedPassword);

        assertThat(valid, equalTo(false));
    }
}
