package net.atos.tenderingportal.application.controller;

import net.atos.tenderingportal.application.action.Secured;
import play.mvc.Controller;
import play.mvc.Http;

/**
 * Created by a149635 on 13/10/2015.
 */

@Secured
public class BaseSecurityController extends Controller {

    protected Long getUserId() {
        Long userId = (Long) Http.Context.current().args.get("userId");
        if(userId == null) {
            return null;
        }
        return userId;
    }


}
