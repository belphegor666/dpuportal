import java.io.File
import java.util.Date

import sbt._
import scala.sys.process.Process
import java.io._

object AppStart extends ProcessRunner {
  lazy val startApp = taskKey[Unit]("startApp")

  def startAppTask = {
    if (!checkAsyncProcessesRunning(AppConstants.PORTS, AppConstants.LOGICAL_OR, false)) {
      startAsyncProcesses(AppConstants.ASYNC_PROCESS_SCRIPTS)
    }
    else {
      System.out.println(AppConstants.PORTS_IN_USE_ERROR);
    }
  }

  def getResultsFolder() = {
    AppConstants.RESULTS_FOLDER
  }
}
