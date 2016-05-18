package net.atos.tenderingportal.application.util;

/**
 * Created by koolrich on 26/09/15.
 */
public class Utilities {

    public static String getDomainFromEmail(String email){
        String [] parts = email.split("@");
        return parts[1];
    }
}
