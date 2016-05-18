package net.atos.tenderingportal.application.util;

import play.mvc.Http;

/**
 * Utilities around request handling
 */

public class RequestUtil {

    public static String getBaseUrl(Http.Request request){
        String baseUrl = "";

        if (request.secure()){
            baseUrl = "https://" + request.host();
        }else{
            baseUrl = "http://" + request.host();
        }
        return baseUrl;
    }
}
