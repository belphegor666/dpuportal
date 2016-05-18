package net.atos.tenderingportal.infrastructure.notification;

/**
 * Created by koolrich on 24/09/15.
 */
public class MailServiceTest {


    public void shouldSendEmailToReceipient(){
        MailService mailService = new MailService();
        mailService.send("koolrich@gmail.com", "Activation Email", "You have been spammed", true);
    }
}
