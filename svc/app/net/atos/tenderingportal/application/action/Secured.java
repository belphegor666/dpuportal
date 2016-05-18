package net.atos.tenderingportal.application.action;

import play.mvc.With;

import java.lang.annotation.*;

@With(SecuredAction.class)
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD, ElementType.TYPE})
@Inherited
@Documented

/**
 * This annotation is used to protect a resource
 * It is implemented by SecuredAction
 */

public @interface Secured {
}
