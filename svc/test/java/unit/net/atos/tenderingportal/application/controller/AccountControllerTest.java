package net.atos.tenderingportal.application.controller;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.EbeanServer;
import com.avaje.ebean.config.ServerConfig;
import com.avaje.ebean.config.dbplatform.MySqlPlatform;
import com.avaje.ebeaninternal.api.SpiEbeanServer;
import com.avaje.ebeaninternal.server.ddl.DdlGenerator;
import com.dumbster.smtp.MailMessage;
import com.dumbster.smtp.ServerOptions;
import com.dumbster.smtp.SmtpServer;
import com.dumbster.smtp.SmtpServerFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.dbunit.IDatabaseTester;
import org.dbunit.JndiDatabaseTester;
import org.dbunit.dataset.IDataSet;
import org.dbunit.dataset.xml.FlatXmlDataSetBuilder;
import org.junit.*;
import play.Logger;
import play.libs.Json;
import play.mvc.Http;
import play.mvc.Result;
import play.test.FakeApplication;
import play.test.Helpers;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.assertEquals;
import static play.mvc.Http.Status.BAD_REQUEST;
import static play.mvc.Http.Status.CREATED;
import static play.mvc.Http.Status.OK;
import static play.test.Helpers.POST;
import static play.test.Helpers.PUT;
import static play.test.Helpers.route;

/**
 * Functional tests for registration and user activation services in {@link AccountController}.
 */
public class AccountControllerTest {

    private static final Logger.ALogger logger = Logger.of(AccountControllerTest.class);
    private static FakeApplication app;
    private static SmtpServer smtpServer;
    private static IDatabaseTester databaseTester;

    @BeforeClass
    public static void startApp() throws IOException {

        Map<String, String> settings = new HashMap<>();
        settings.put("db.default.driver", "org.h2.Driver");
        settings.put("db.default.url", "jdbc:h2:mem:test_db;MODE=MySQL;INIT=CREATE SCHEMA IF NOT EXISTS \"public\"\\;");
        settings.put("db.default.jndiName", "DefaultDS");
        settings.put("db.default.username", "sa");
        settings.put("db.default.password", "");
        settings.put("ebean.default", "net.atos.tenderingportal.domain.model.*");
        settings.put("play.mailer.host", "localhost");
        settings.put("play.mailer.port", "9025");
        settings.put("play.mailer.ssl", "no");
        settings.put("play.mailer.tls", "no");
        // Disable Play evolutions for the test environment
        settings.put("play.evolutions.enabled", "false");

        app = Helpers.fakeApplication(settings);
        Helpers.start(app);

        smtpServer = SmtpServerFactory.startServer(new ServerOptions(new String[]{"9025"}));
    }

    @AfterClass
    public static void stopApp() throws Exception {
        Helpers.stop(app);
        smtpServer.stop();
        databaseTester.onTearDown();
    }

    @Before
    public void createDatabase() throws IOException {
        String serverName = "default";

        logger.info("Creating DB for Server name: " + serverName);

        EbeanServer server = Ebean.getServer(serverName);
        ServerConfig config = new ServerConfig();
        DdlGenerator ddl = new DdlGenerator();
        ddl.setup((SpiEbeanServer) server, new MySqlPlatform(), config);

        // Create
        try {
            ddl.runScript(false, ddl.generateCreateDdl());
            logger.info("Created DDL");

            // Load XML test data
            IDataSet initialDataSet = new FlatXmlDataSetBuilder().build(app.resourceAsStream("/test-data.xml"));
            databaseTester = new JndiDatabaseTester("DefaultDS");
            databaseTester.setDataSet(initialDataSet);
            databaseTester.onSetup();
        } catch (Exception e) {
            logger.info("Exception creating database: " + e.getMessage());
        }
    }

    @After
    public void dropDatabase() throws IOException {
        String serverName = "default";

        logger.info("Dropping DB for Server name: " + serverName);

        EbeanServer server = Ebean.getServer(serverName);
        ServerConfig config = new ServerConfig();
        DdlGenerator ddl = new DdlGenerator();
        ddl.setup((SpiEbeanServer) server, new MySqlPlatform(), config);

        // Drop
        try {
            ddl.runScript(false, ddl.generateDropDdl());
        } catch (Exception e) {
            logger.info("Exception dropping database: " + e.getMessage());
        }
    }

    @Test
    public void newUserIsRegistered() {
        // Create a new JSON object node and populate with required values needed to register a user.
        ObjectNode newUserRegistrationData = Json.newObject().put("email", "originator@example.com").put("password", "password1");

        // Build the request, submit it via the REST service and check the result.
        Http.RequestBuilder request = new Http.RequestBuilder().bodyJson(newUserRegistrationData).method(POST).uri("/api/account/register");
        Result result = route(request);
        assertEquals(CREATED, result.status());

        // Check that the activation e-mail is sent to the recipient.
        MailMessage message = smtpServer.getMessage(0);
        assertEquals("originator@example.com", message.getFirstHeaderValue("To"));
        assertEquals("Atos Tendering Portal account activation", message.getFirstHeaderValue("Subject"));
    }

    @Test
    public void existingUserIsNotRegistered() {
        // Create a new JSON object node and populate with required values needed to register a user.
        ObjectNode existingUserRegistrationData = Json.newObject().put("email", "approver@example.com").put("password", "password1");

        // Build the request, submit it via the REST service and check the result.
        Http.RequestBuilder request = new Http.RequestBuilder().bodyJson(existingUserRegistrationData).method(POST).uri("/api/account/register");
        Result result = route(request);
        assertEquals(BAD_REQUEST, result.status());

        // Check that no activation e-mail is sent to the recipient.
        assertEquals(0, smtpServer.getEmailCount());
    }

    @Test
    public void nonWhitelistedDomainUserIsNotRegistered() {
        // Create a new JSON object node and populate with required values needed to register a user.
        ObjectNode existingUserRegistrationData = Json.newObject().put("email", "approver@notexample.com").put("password", "password1");

        int numEmails = smtpServer.getEmailCount();

        // Build the request, submit it via the REST service and check the result.
        Http.RequestBuilder request = new Http.RequestBuilder().bodyJson(existingUserRegistrationData).method(POST).uri("/api/account/register");
        Result result = route(request);
        assertEquals(BAD_REQUEST, result.status());

        // Check that no activation e-mail is sent to the recipient.
        assertEquals(numEmails, smtpServer.getEmailCount());
    }

    @Test
    public void unactivatedUserIsActivated() {
        Http.RequestBuilder request = new Http.RequestBuilder().method(PUT).uri("/api/account/activate?key=abc123");
        Result result = route(request);
        assertEquals(OK, result.status());
    }

    @Test
    public void activationWithInvalidKeyFails() {
        Http.RequestBuilder request = new Http.RequestBuilder().method(PUT).uri("/api/account/activate?key=xyz789");
        Result result = route(request);
        assertEquals(BAD_REQUEST, result.status());
    }
}
