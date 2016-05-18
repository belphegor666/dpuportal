import java.io.File
import java.util.Date

import sbt._
import scala.sys.process.Process
import java.io._

object AppStop extends ProcessRunner {
  lazy val stopApp = taskKey[Unit]("stopApp")

  def stopAppTask = {
    stopAsyncProcesses(AppConstants.PORTS)
  }

  def getResultsFolder() = {
    AppConstants.RESULTS_FOLDER
  }
}
