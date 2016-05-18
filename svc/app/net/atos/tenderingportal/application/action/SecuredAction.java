package net.atos.tenderingportal.application.action;

import net.atos.tenderingportal.domain.model.Authentication;
import net.atos.tenderingportal.domain.service.AuthenticationProvider;
import play.libs.F;
import play.mvc.Action;
import play.mvc.Http;
import play.mvc.Result;

import javax.inject.Inject;
import javax.inject.Named;

/**
 * This filter protects a resource (authentication) by validating the token passed in
 * The token must be valid and not expired
 * Resources can be protected using the @Secured annotation
 */

public class SecuredAction extends Action<Result> {

    private static final String AUTHORIZATION = "Authorization";
    private static final String BEARER = "Bearer";

    @Inject
    private AuthenticationProvider authenticationProvider;

    @Override
    public F.Promise<Result> call(Http.Context context) throws Throwable {

        String token = extractToken(context);

        if (token == null){
            return F.Promise.pure(unauthorized());
        }

        Authentication authentication = authenticationProvider.validateToken(token);

        if (authentication.isAuthenticated()) {
            if (authentication.isTokenExpired()){
                return F.Promise.pure(unauthorized("token expired"));
            }
            Long userId = authentication.getSubject();
            if (userId != null){
                context.args.put("userId", userId);
            }
            return delegate.call(context);
        }

        return F.Promise.pure(unauthorized("invalid token"));
    }

    private String extractToken(Http.Context context){
        String token = null;
        String authHeader = context.request().getHeader(AUTHORIZATION);
        if (authHeader != null) {
            token = authHeader.substring(BEARER.length()).trim();
        }
        return token;
    }

}
