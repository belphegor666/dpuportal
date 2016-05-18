package net.atos.tenderingportal.infrastructure.persistence;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.EbeanServer;
import com.avaje.ebean.config.ServerConfig;
import com.avaje.ebean.config.dbplatform.MySqlPlatform;
import com.avaje.ebeaninternal.api.SpiEbeanServer;
import com.avaje.ebeaninternal.server.ddl.DdlGenerator;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import play.Logger;
import play.Logger.ALogger;
import play.test.FakeApplication;
import play.test.Helpers;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by koolrich on 22/09/15.
 */
public class BaseRepositoryTest
{

    private static final ALogger logger = Logger.of(BaseRepositoryTest.class);

    public static FakeApplication app;

    @BeforeClass public static void startApp() throws IOException
    {

        Map<String, String> settings = new HashMap<>();
        settings.put("db.default.driver", "org.h2.Driver");
        settings.put("db.default.url", "jdbc:h2:mem:test_db;MODE=MySQL;INIT=CREATE SCHEMA IF NOT EXISTS \"public\"\\;");
        settings.put("ebean.default", "net.atos.tenderingportal.domain.model.*");
        // Disable Play evolutions for the test environment
        settings.put("play.evolutions.enabled", "false");

        app = Helpers.fakeApplication(settings);
        Helpers.start(app);
    }

    @AfterClass public static void stopApp()
    {
        Helpers.stop(app);
    }

    @Before public void createDatabase() throws IOException
    {

        String serverName = "default";

        logger.info("Create DB Server name: " + serverName);

        EbeanServer server = Ebean.getServer(serverName);
        ServerConfig config = new ServerConfig();
        DdlGenerator ddl = new DdlGenerator();
        ddl.setup((SpiEbeanServer) server, new MySqlPlatform(), config);

        // Create
        try
        {
            ddl.runScript(false, ddl.generateCreateDdl());
        }
        catch (Exception e)
        {
            logger.info("Exception creating database: " + e.getMessage());
        }
    }

    @After public void dropDatabase() throws IOException
    {

        String serverName = "default";

        logger.info("Dropping DB Server name: " + serverName);

        EbeanServer server = Ebean.getServer(serverName);
        ServerConfig config = new ServerConfig();
        DdlGenerator ddl = new DdlGenerator();
        ddl.setup((SpiEbeanServer) server, new MySqlPlatform(), config);

        // Drop
        try
        {
            ddl.runScript(false, ddl.generateDropDdl());
        }
        catch (Exception e)
        {
            logger.info("Exception dropping database: " + e.getMessage());
        }
    }
}
