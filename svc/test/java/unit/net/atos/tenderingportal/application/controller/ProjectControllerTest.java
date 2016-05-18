package net.atos.tenderingportal.application.controller;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.EbeanServer;
import com.avaje.ebean.config.ServerConfig;
import com.avaje.ebean.config.dbplatform.MySqlPlatform;
import com.avaje.ebeaninternal.api.SpiEbeanServer;
import com.avaje.ebeaninternal.server.ddl.DdlGenerator;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.dbunit.IDatabaseTester;
import org.dbunit.JndiDatabaseTester;
import org.dbunit.dataset.IDataSet;
import org.dbunit.dataset.xml.FlatXmlDataSetBuilder;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import play.libs.Json;
import play.mvc.Http;
import play.mvc.Result;
import play.test.FakeApplication;
import play.test.Helpers;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.assertEquals;
import static play.test.Helpers.*;

/**
 * Functional tests for Project service operations in {@link ProjectController}.
 */
public class ProjectControllerTest {

    private static FakeApplication app;
    private static IDatabaseTester databaseTester;

    @BeforeClass
    public static void startApp() throws IOException {
        Map<String, String> settings = new HashMap<>();
        settings.put("db.default.driver", "org.h2.Driver");
        settings.put("db.default.url", "jdbc:h2:mem:test_db;MODE=MySQL;INIT=CREATE SCHEMA IF NOT EXISTS \"public\"\\;");
        settings.put("db.default.jndiName", "DefaultDS");
        settings.put("ebean.default", "net.atos.tenderingportal.domain.model.*");
        // Enable Play evolutions for the test environment (the default setting)
        settings.put("play.evolutions.enabled", "true");

        app = Helpers.fakeApplication(settings);
        Helpers.start(app);
    }

    @AfterClass
    public static void stopApp() throws Exception {
        Helpers.stop(app);
        databaseTester.onTearDown();
    }

    @Before
    public void dropCreateDb() throws Exception {
        String serverName = "default";

        EbeanServer server = Ebean.getServer(serverName);
        ServerConfig config = new ServerConfig();
        DdlGenerator ddl = new DdlGenerator();
        ddl.setup((SpiEbeanServer) server, new MySqlPlatform(), config);

        // Drop
        ddl.runScript(false, ddl.generateDropDdl());

        // Create
        ddl.runScript(false, ddl.generateCreateDdl());

        FlatXmlDataSetBuilder builder = new FlatXmlDataSetBuilder();
        // "Column sensing" enabled to avoid DbUnit missing some columns of the User table because the first record has
        // null values for these.
        builder.setColumnSensing(true);
        IDataSet initialDataSet = builder.build(app.resourceAsStream("/test-data.xml"));
        databaseTester = new JndiDatabaseTester("DefaultDS");
        databaseTester.setDataSet(initialDataSet);
        databaseTester.onSetup();
    }

    @Test
    public void projectUpdateNotPermittedByNonOwnerNonAdmin() {
        // Login to get an authentication token.
        String authToken = authenticateUser("delivery@example.com", "password1");

        // Build the request, submit it via the REST service and check the result. It should be HTTP 403 "Forbidden"
        // because the user is neither the Product Owner nor a System Administrator, so cannot update the project.
        ObjectNode projectData = Json.newObject().put("id", "1").put("title", "Test Project 100")
                .put("summary", "Test Summary 1").put("status", "draft").put("productOwner", "delivery@example.com");
        Http.RequestBuilder updateRequest = new Http.RequestBuilder().bodyJson(projectData)
                .header(AUTHORIZATION, "Bearer " + authToken).method(PUT).uri("/api/projects");
        Result updateResult = route(updateRequest);
        assertEquals(FORBIDDEN, updateResult.status());
    }

    @Test
    public void projectUpdatePermittedByProductOwner() {
        // Login to get an authentication token.
        String authToken = authenticateUser("approver@example.com", "password1");

        // Build the request, submit it via the REST service and check the result. It should be HTTP 200 "OK" because
        // the user is the Product Owner, so is permitted to update the project.
        ObjectNode projectData = Json.newObject().put("id", "1").put("title", "Test Project 100")
                .put("summary", "Test Summary 1").put("status", "draft").put("productOwner", "delivery@example.com");
        Http.RequestBuilder updateRequest = new Http.RequestBuilder().bodyJson(projectData)
                .header(AUTHORIZATION, "Bearer " + authToken).method(PUT).uri("/api/projects");
        Result updateResult = route(updateRequest);
        assertEquals(OK, updateResult.status());
    }

    @Test
    public void projectUpdatePermittedByAdminUser() {
        // Login to get an authentication token.
        String authToken = authenticateUser("admin@atos.net", "password1");

        // Build the request, submit it via the REST service and check the result. It should be HTTP 200 "OK" because
        // the user is a System Administrator, so is permitted to update the project.
        ObjectNode projectData = Json.newObject().put("id", "1").put("title", "Test Project 100")
                .put("summary", "Test Summary 1").put("status", "draft").put("productOwner", "delivery@example.com");
        Http.RequestBuilder updateRequest = new Http.RequestBuilder().bodyJson(projectData)
                .header(AUTHORIZATION, "Bearer " + authToken).method(PUT).uri("/api/projects");
        Result updateResult = route(updateRequest);
        assertEquals(OK, updateResult.status());
    }

    /**
     * Logs in with the given username to generate an authentication token.
     *
     * @param username The user's e-mail address as username
     * @param password The user's password
     * @return The authentication token from the Login response
     */
    private String authenticateUser(String username, String password) {
        ObjectNode loginData = Json.newObject().put("username", username).put("password", password);
        Http.RequestBuilder request = new Http.RequestBuilder().bodyJson(loginData).method(POST).uri("/api/account/login");
        Result result = route(request);
        assertEquals(OK, result.status());
        return Json.parse(contentAsString(result)).get("authToken").asText();
    }
}
