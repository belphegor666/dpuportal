package net.atos.tenderingportal.infrastructure.security;

import com.google.inject.AbstractModule;
import com.google.inject.name.Names;
import net.atos.tenderingportal.domain.service.AuthenticationProvider;

public class SecurityModule extends AbstractModule {

    @Override
    protected void configure() {

        // Bind the AuthenticationProvider interface to a concrete implementation (in this case, there is only one).
        bind(AuthenticationProvider.class).to(DBAuthenticationProvider.class);
    }
}
