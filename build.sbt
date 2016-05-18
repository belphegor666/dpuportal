import Lib._

lazy val root = (project in file("."))
  .aggregate(testsetup, svc)
  .settings(libraryDependencies ++= Seq(
    jdbc
  ))

lazy val svc = (project in file("svc"))
  .enablePlugins(PlayJava, PlayEbean)
  .settings(jacoco.settings)
  .settings(
    Keys.fork in jacoco.Config := true
  )
  .settings(parallelExecution in jacoco.Config := false)
  .settings(jacoco.outputDirectory in jacoco.Config := file(baseDirectory.value.getAbsolutePath + "/target/jacoco"))
  .settings(jacoco.excludes in jacoco.Config := Seq("views*", "router*", "controllers*", "controllers*javascript*", "view.html*"))
  .settings(checkProcesses:= checkProcessesTask)
  .settings(stopProcesses:= stopProcessesTask)
  .settings(endToEndTestProtractorCI:= endToEndTestProtractorCITask)
  .settings(runProtractor:= runProtractorTask)
  .settings(clientTest:= clientTestTask)
  .settings(endToEndTest:= endToEndTestTask)
  .settings(startApp:= startAppTask)
  .settings(stopApp:= stopAppTask)
//  .settings(Keys.test:= customTestTask.value)
//  .settings(Keys.test in jacoco.Config:= customTestTask.value)
  .settings(Settings.basicSettings: _*)
  .settings(Settings.serviceSettings: _*)
  .settings(libraryDependencies ++= Seq(
    javaJpa, hibernate, cache, javaWs, evolutions, jdbc, mailer, commons_lang, jwt, ical4j, dumbster, mysqlconn, filters
  ) ++ Lib.test(
    junit, dbunit, mockito
  ))

lazy val testsetup = (project in file("testsetup"))
  .enablePlugins(PlayJava, PlayEbean)
  .settings(Settings.basicSettings: _*)
  .settings(Settings.serviceSettings: _*)
  .settings(libraryDependencies ++= Seq(
    javaJpa, hibernate, cache, javaWs, h2, selenium, mailer, commons_lang, mockito, ical4j, dumbster, mysqlconn
  ) ++ Lib.test(
    junit
  ))

ivyScala := ivyScala.value map {
  _.copy(overrideScalaVersion = true)
}

fork in run := true
