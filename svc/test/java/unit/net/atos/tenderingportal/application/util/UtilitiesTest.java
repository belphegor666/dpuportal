package net.atos.tenderingportal.application.util;

import org.junit.Test;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;

/**
 * Created by koolrich on 26/09/15.
 */
public class UtilitiesTest {

    @Test
    public void shouldExtractDomainFromEmail(){
        String email = "joebloggs@email.com";
        String domain = Utilities.getDomainFromEmail(email);

        assertThat(domain, equalTo("email.com"));
    }
}
