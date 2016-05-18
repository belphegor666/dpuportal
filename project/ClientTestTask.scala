import sbt._

object ClientTestTask extends Build {

  lazy val clientTest = taskKey[Int]("clientTest")

  def clientTestTask() = {
    val operatingSystem = System.getProperty("os.name")
    if (operatingSystem.contains(ProcessRunnerConstants.WINDOWS_OS)) {
      "./node_modules/.bin/karma.cmd start ./svc/test/webapp/unit/karma.conf.js" !
    }
    else {
      "./node_modules/.bin/karma start ./svc/test/webapp/unit/karma.conf.js" !
    }
  }

  def customTestTask = Def.taskDyn {
    val exitCode = (clientTest in Test).value
    if (exitCode == 0) {
      Def.task {
        (Keys.test in Test).value
      }
    }
    else {
      sys.error("Karma exited with invalid exit code " + exitCode)
      //throw new Exception("Karma exited with invalid exit code " + exitCode)
    }
  }
}
