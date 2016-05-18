package net.atos.tenderingportal.infrastructure.notification;


import net.atos.tenderingportal.domain.model.User;
import play.libs.mailer.Email;
import play.libs.mailer.MailerClient;

import javax.inject.Inject;

/**
 * Service providing e-mail capabilities.
 */
public class MailService {

    @Inject
    MailerClient mailerClient;

    /**
     * Sends an e-mail with the specified subject and message text to the specified recipient.
     *
     * @param toEmail The recipient's e-mail address
     * @param subject The subject line
     * @param emailBody The message text
     * @param isHtml True if the e-mail is in HTML format; false otherwise
     */
    public void send(String toEmail, String subject, String emailBody, boolean isHtml) {
        Email email = new Email();

        email.setSubject(subject);
        email.addTo(toEmail);

        if (isHtml) {
            email.setBodyHtml(emailBody);
        } else {
            email.setBodyText(emailBody);
        }

        email.setFrom("noReply@atos.net");

        mailerClient.send(email);
    }

    /**
     * Sends an account activation e-mail containing an activation link.
     *
     * @param user The recipient
     * @param baseUrl The base URL of the activation link
     */
    public void sendActivationMail(User user, String baseUrl) {
        String emailBody = views.html.mailtemplates.userAccountActivation.render(user, baseUrl).toString();
        String subject = "Atos Tendering Portal account activation";
        send(user.getEmail(), subject, emailBody, true);
    }

    /**
     * Sends an forgot password e-mail with link for confirmation
     *
     * @param user The recipient
     * @param baseUrl The base URL of the activation link
     */
    public void sendForgotPasswordMail(User user, String baseUrl) {
        String emailBody = views.html.mailtemplates.userAccountForgotPassword.render(user, baseUrl).toString();
        String subject = "Atos Tendering Portal reset password";
        send(user.getEmail(), subject, emailBody, true);
    }

    /**
     * Sends an reset e-mail containing a temporary password.
     *
     * @param user The recipient
     * @param baseUrl The base URL of the activation link
     * @param password The temporary password for the user
     */
    public void sendResetPasswordMail(User user, String baseUrl, String password) {
        String emailBody = views.html.mailtemplates.userAccountResetPassword.render(user, baseUrl, password).toString();
        String subject = "Atos Tendering Portal reset password";
        send(user.getEmail(), subject, emailBody, true);
    }
}
