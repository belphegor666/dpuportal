
// @GENERATOR:play-routes-compiler
// @SOURCE:/home/europa/play-workspace/ddutp/dpuportal/svc/conf/routes
// @DATE:Wed Mar 30 19:44:21 BST 2016

package router

import play.core.routing._
import play.core.routing.HandlerInvokerFactory._
import play.core.j._

import play.api.mvc._

import _root_.controllers.Assets.Asset
import _root_.play.libs.F

class Routes(
  override val errorHandler: play.api.http.HttpErrorHandler, 
  // @LINE:6
  AccountController_0: javax.inject.Provider[net.atos.tenderingportal.application.controller.AccountController],
  // @LINE:11
  UserController_6: javax.inject.Provider[net.atos.tenderingportal.application.controller.UserController],
  // @LINE:13
  ProjectController_4: javax.inject.Provider[net.atos.tenderingportal.application.controller.ProjectController],
  // @LINE:18
  SprintController_2: javax.inject.Provider[net.atos.tenderingportal.application.controller.SprintController],
  // @LINE:27
  StoryController_8: javax.inject.Provider[net.atos.tenderingportal.application.controller.StoryController],
  // @LINE:32
  ReleaseHistoryController_3: javax.inject.Provider[net.atos.tenderingportal.application.controller.ReleaseHistoryController],
  // @LINE:34
  ReferenceDataController_5: javax.inject.Provider[net.atos.tenderingportal.application.controller.ReferenceDataController],
  // @LINE:36
  ShowcaseController_1: javax.inject.Provider[net.atos.tenderingportal.application.controller.ShowcaseController],
  // @LINE:42
  Assets_7: controllers.Assets,
  val prefix: String
) extends GeneratedRouter {

   @javax.inject.Inject()
   def this(errorHandler: play.api.http.HttpErrorHandler,
    // @LINE:6
    AccountController_0: javax.inject.Provider[net.atos.tenderingportal.application.controller.AccountController],
    // @LINE:11
    UserController_6: javax.inject.Provider[net.atos.tenderingportal.application.controller.UserController],
    // @LINE:13
    ProjectController_4: javax.inject.Provider[net.atos.tenderingportal.application.controller.ProjectController],
    // @LINE:18
    SprintController_2: javax.inject.Provider[net.atos.tenderingportal.application.controller.SprintController],
    // @LINE:27
    StoryController_8: javax.inject.Provider[net.atos.tenderingportal.application.controller.StoryController],
    // @LINE:32
    ReleaseHistoryController_3: javax.inject.Provider[net.atos.tenderingportal.application.controller.ReleaseHistoryController],
    // @LINE:34
    ReferenceDataController_5: javax.inject.Provider[net.atos.tenderingportal.application.controller.ReferenceDataController],
    // @LINE:36
    ShowcaseController_1: javax.inject.Provider[net.atos.tenderingportal.application.controller.ShowcaseController],
    // @LINE:42
    Assets_7: controllers.Assets
  ) = this(errorHandler, AccountController_0, UserController_6, ProjectController_4, SprintController_2, StoryController_8, ReleaseHistoryController_3, ReferenceDataController_5, ShowcaseController_1, Assets_7, "/")

  import ReverseRouteContext.empty

  def withPrefix(prefix: String): Routes = {
    router.RoutesPrefix.setPrefix(prefix)
    new Routes(errorHandler, AccountController_0, UserController_6, ProjectController_4, SprintController_2, StoryController_8, ReleaseHistoryController_3, ReferenceDataController_5, ShowcaseController_1, Assets_7, prefix)
  }

  private[this] val defaultPrefix: String = {
    if (this.prefix.endsWith("/")) "" else "/"
  }

  def documentation = List(
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/account/register""", """@net.atos.tenderingportal.application.controller.AccountController@.registerUser"""),
    ("""PUT""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/account/activate""", """@net.atos.tenderingportal.application.controller.AccountController@.activateUser(key:String)"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/account/login""", """@net.atos.tenderingportal.application.controller.AccountController@.login"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/account/forgot-password""", """@net.atos.tenderingportal.application.controller.AccountController@.forgotPassword"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/account/change-password""", """@net.atos.tenderingportal.application.controller.AccountController@.changePassword"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/account/user-preference""", """@net.atos.tenderingportal.application.controller.UserController@.saveUserPreference"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/account/user-details""", """@net.atos.tenderingportal.application.controller.UserController@.editAccountDetails"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/projects""", """@net.atos.tenderingportal.application.controller.ProjectController@.createProject"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/projects""", """@net.atos.tenderingportal.application.controller.ProjectController@.getProjects(currentSprint:java.lang.Boolean ?= null, productOwner:java.lang.Boolean ?= null)"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/projects/$selectedDate<[^/]+>""", """@net.atos.tenderingportal.application.controller.ProjectController@.getProjectsWithTeams(selectedDate:Long)"""),
    ("""DELETE""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/projects/$id<[^/]+>""", """@net.atos.tenderingportal.application.controller.ProjectController@.cancelProject(id:Long)"""),
    ("""PUT""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/projects""", """@net.atos.tenderingportal.application.controller.ProjectController@.updateProject"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/projects/$projectId<[^/]+>/sprints""", """@net.atos.tenderingportal.application.controller.SprintController@.createSprintForProject(projectId:Long)"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/projects/$projectId<[^/]+>/sprints""", """@net.atos.tenderingportal.application.controller.SprintController@.getAllSprintsForProject(projectId:Long)"""),
    ("""PUT""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/sprints""", """@net.atos.tenderingportal.application.controller.SprintController@.updateSprint"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/sprints/$sprintId<[^/]+>/members""", """@net.atos.tenderingportal.application.controller.SprintController@.addMemberToSprint(sprintId:Long)"""),
    ("""DELETE""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/sprints/$sprintId<[^/]+>/members""", """@net.atos.tenderingportal.application.controller.SprintController@.removeMemberFromSprint(sprintId:Long)"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/users/$userId<[^/]+>/projects""", """@net.atos.tenderingportal.application.controller.UserController@.findProjectsAssignedToUser(userId:Long)"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/users/$userId<[^/]+>/stories""", """@net.atos.tenderingportal.application.controller.UserController@.findStoriesAssignedToUser(userId:Long)"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/sprints/$sprintId<[^/]+>/stories""", """@net.atos.tenderingportal.application.controller.StoryController@.getAllStoriesForSprint(sprintId:Long)"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/sprints/$sprintId<[^/]+>/stories""", """@net.atos.tenderingportal.application.controller.StoryController@.createStory(sprintId:Long)"""),
    ("""PUT""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/sprints/$sprintId<[^/]+>/stories""", """@net.atos.tenderingportal.application.controller.StoryController@.updateStory(sprintId:Long)"""),
    ("""DELETE""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/stories/$storyId<[^/]+>""", """@net.atos.tenderingportal.application.controller.StoryController@.deleteStory(storyId:Long)"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/release-history""", """@net.atos.tenderingportal.application.controller.ReleaseHistoryController@.listAll"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/teamCsvDownload/$selectedDate<[^/]+>""", """@net.atos.tenderingportal.application.controller.ProjectController@.generateProjectTeamCSV(selectedDate:Long)"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/reference-data/codebook""", """@net.atos.tenderingportal.application.controller.ReferenceDataController@.getCodeBook"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/showcase""", """@net.atos.tenderingportal.application.controller.ShowcaseController@.getAllShowcases"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/users/$userId<[^/]+>/certifications""", """@net.atos.tenderingportal.application.controller.UserController@.findUserCertifications(userId:Long)"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/users/$userId<[^/]+>/certifications""", """@net.atos.tenderingportal.application.controller.UserController@.createUserCertification(userId:Long)"""),
    ("""GET""", this.prefix, """controllers.Assets.at(path:String = "/public/webapp", file:String = "index.html")"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """$file<.+>""", """controllers.Assets.versioned(path:String = "/public/webapp", file:Asset)"""),
    Nil
  ).foldLeft(List.empty[(String,String,String)]) { (s,e) => e.asInstanceOf[Any] match {
    case r @ (_,_,_) => s :+ r.asInstanceOf[(String,String,String)]
    case l => s ++ l.asInstanceOf[List[(String,String,String)]]
  }}


  // @LINE:6
  private[this] lazy val net_atos_tenderingportal_application_controller_AccountController_registerUser0_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/account/register")))
  )
  private[this] lazy val net_atos_tenderingportal_application_controller_AccountController_registerUser0_invoker = createInvoker(
    AccountController_0.get.registerUser,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "net.atos.tenderingportal.application.controller.AccountController",
      "registerUser",
      Nil,
      "POST",
      """ Home page""",
      this.prefix + """api/account/register"""
    )
  )

  // @LINE:7
  private[this] lazy val net_atos_tenderingportal_application_controller_AccountController_activateUser1_route = Route("PUT",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/account/activate")))
  )
  private[this] lazy val net_atos_tenderingportal_application_controller_AccountController_activateUser1_invoker = createInvoker(
    AccountController_0.get.activateUser(fakeValue[String]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "net.atos.tenderingportal.application.controller.AccountController",
      "activateUser",
      Seq(classOf[String]),
      "PUT",
      """""",
      this.prefix + """api/account/activate"""
    )
  )

  // @LINE:8
  private[this] lazy val net_atos_tenderingportal_application_controller_AccountController_login2_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/account/login")))
  )
  private[this] lazy val net_atos_tenderingportal_application_controller_AccountController_login2_invoker = createInvoker(
    AccountController_0.get.login,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "net.atos.tenderingportal.application.controller.AccountController",
      "login",
      Nil,
      "POST",
      """""",
      this.prefix + """api/account/login"""
    )
  )

  // @LINE:9
  private[this] lazy val net_atos_tenderingportal_application_controller_AccountController_forgotPassword3_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/account/forgot-password")))
  )
  private[this] lazy val net_atos_tenderingportal_application_controller_AccountController_forgotPassword3_invoker = createInvoker(
    AccountController_0.get.forgotPassword,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "net.atos.tenderingportal.application.controller.AccountController",
      "forgotPassword",
      Nil,
      "POST",
      """""",
      this.prefix + """api/account/forgot-password"""
    )
  )

  // @LINE:10
  private[this] lazy val net_atos_tenderingportal_application_controller_AccountController_changePassword4_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/account/change-password")))
  )
  private[this] lazy val net_atos_tenderingportal_application_controller_AccountController_changePassword4_invoker = createInvoker(
    AccountController_0.get.changePassword,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "net.atos.tenderingportal.application.controller.AccountController",
      "changePassword",
      Nil,
      "POST",
      """""",
      this.prefix + """api/account/change-password"""
    )
  )

  // @LINE:11
  private[this] lazy val net_atos_tenderingportal_application_controller_UserController_saveUserPreference5_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/account/user-preference")))
  )
  private[this] lazy val net_atos_tenderingportal_application_controller_UserController_saveUserPreference5_invoker = createInvoker(
    UserController_6.get.saveUserPreference,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "net.atos.tenderingportal.application.controller.UserController",
      "saveUserPreference",
      Nil,
      "POST",
      """""",
      this.prefix + """api/account/user-preference"""
    )
  )

  // @LINE:12
  private[this] lazy val net_atos_tenderingportal_application_controller_UserController_editAccountDetails6_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/account/user-details")))
  )
  private[this] lazy val net_atos_tenderingportal_application_controller_UserController_editAccountDetails6_invoker = createInvoker(
    UserController_6.get.editAccountDetails,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "net.atos.tenderingportal.application.controller.UserController",
      "editAccountDetails",
      Nil,
      "POST",
      """""",
      this.prefix + """api/account/user-details"""
    )
  )

  // @LINE:13
  private[this] lazy val net_atos_tenderingportal_application_controller_ProjectController_createProject7_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/projects")))
  )
  private[this] lazy val net_atos_tenderingportal_application_controller_ProjectController_createProject7_invoker = createInvoker(
    ProjectController_4.get.createProject,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "net.atos.tenderingportal.application.controller.ProjectController",
      "createProject",
      Nil,
      "POST",
      """""",
      this.prefix + """api/projects"""
    )
  )

  // @LINE:14
  private[this] lazy val net_atos_tenderingportal_application_controller_ProjectController_getProjects8_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/projects")))
  )
  private[this] lazy val net_atos_tenderingportal_application_controller_ProjectController_getProjects8_invoker = createInvoker(
    ProjectController_4.get.getProjects(fakeValue[java.lang.Boolean], fakeValue[java.lang.Boolean]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "net.atos.tenderingportal.application.controller.ProjectController",
      "getProjects",
      Seq(classOf[java.lang.Boolean], classOf[java.lang.Boolean]),
      "GET",
      """""",
      this.prefix + """api/projects"""
    )
  )

  // @LINE:15
  private[this] lazy val net_atos_tenderingportal_application_controller_ProjectController_getProjectsWithTeams9_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/projects/"), DynamicPart("selectedDate", """[^/]+""",true)))
  )
  private[this] lazy val net_atos_tenderingportal_application_controller_ProjectController_getProjectsWithTeams9_invoker = createInvoker(
    ProjectController_4.get.getProjectsWithTeams(fakeValue[Long]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "net.atos.tenderingportal.application.controller.ProjectController",
      "getProjectsWithTeams",
      Seq(classOf[Long]),
      "GET",
      """""",
      this.prefix + """api/projects/$selectedDate<[^/]+>"""
    )
  )

  // @LINE:16
  private[this] lazy val net_atos_tenderingportal_application_controller_ProjectController_cancelProject10_route = Route("DELETE",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/projects/"), DynamicPart("id", """[^/]+""",true)))
  )
  private[this] lazy val net_atos_tenderingportal_application_controller_ProjectController_cancelProject10_invoker = createInvoker(
    ProjectController_4.get.cancelProject(fakeValue[Long]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "net.atos.tenderingportal.application.controller.ProjectController",
      "cancelProject",
      Seq(classOf[Long]),
      "DELETE",
      """""",
      this.prefix + """api/projects/$id<[^/]+>"""
    )
  )

  // @LINE:17
  private[this] lazy val net_atos_tenderingportal_application_controller_ProjectController_updateProject11_route = Route("PUT",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/projects")))
  )
  private[this] lazy val net_atos_tenderingportal_application_controller_ProjectController_updateProject11_invoker = createInvoker(
    ProjectController_4.get.updateProject,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "net.atos.tenderingportal.application.controller.ProjectController",
      "updateProject",
      Nil,
      "PUT",
      """""",
      this.prefix + """api/projects"""
    )
  )

  // @LINE:18
  private[this] lazy val net_atos_tenderingportal_application_controller_SprintController_createSprintForProject12_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/projects/"), DynamicPart("projectId", """[^/]+""",true), StaticPart("/sprints")))
  )
  private[this] lazy val net_atos_tenderingportal_application_controller_SprintController_createSprintForProject12_invoker = createInvoker(
    SprintController_2.get.createSprintForProject(fakeValue[Long]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "net.atos.tenderingportal.application.controller.SprintController",
      "createSprintForProject",
      Seq(classOf[Long]),
      "POST",
      """""",
      this.prefix + """api/projects/$projectId<[^/]+>/sprints"""
    )
  )

  // @LINE:19
  private[this] lazy val net_atos_tenderingportal_application_controller_SprintController_getAllSprintsForProject13_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/projects/"), DynamicPart("projectId", """[^/]+""",true), StaticPart("/sprints")))
  )
  private[this] lazy val net_atos_tenderingportal_application_controller_SprintController_getAllSprintsForProject13_invoker = createInvoker(
    SprintController_2.get.getAllSprintsForProject(fakeValue[Long]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "net.atos.tenderingportal.application.controller.SprintController",
      "getAllSprintsForProject",
      Seq(classOf[Long]),
      "GET",
      """""",
      this.prefix + """api/projects/$projectId<[^/]+>/sprints"""
    )
  )

  // @LINE:20
  private[this] lazy val net_atos_tenderingportal_application_controller_SprintController_updateSprint14_route = Route("PUT",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/sprints")))
  )
  private[this] lazy val net_atos_tenderingportal_application_controller_SprintController_updateSprint14_invoker = createInvoker(
    SprintController_2.get.updateSprint,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "net.atos.tenderingportal.application.controller.SprintController",
      "updateSprint",
      Nil,
      "PUT",
      """""",
      this.prefix + """api/sprints"""
    )
  )

  // @LINE:21
  private[this] lazy val net_atos_tenderingportal_application_controller_SprintController_addMemberToSprint15_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/sprints/"), DynamicPart("sprintId", """[^/]+""",true), StaticPart("/members")))
  )
  private[this] lazy val net_atos_tenderingportal_application_controller_SprintController_addMemberToSprint15_invoker = createInvoker(
    SprintController_2.get.addMemberToSprint(fakeValue[Long]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "net.atos.tenderingportal.application.controller.SprintController",
      "addMemberToSprint",
      Seq(classOf[Long]),
      "POST",
      """""",
      this.prefix + """api/sprints/$sprintId<[^/]+>/members"""
    )
  )

  // @LINE:22
  private[this] lazy val net_atos_tenderingportal_application_controller_SprintController_removeMemberFromSprint16_route = Route("DELETE",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/sprints/"), DynamicPart("sprintId", """[^/]+""",true), StaticPart("/members")))
  )
  private[this] lazy val net_atos_tenderingportal_application_controller_SprintController_removeMemberFromSprint16_invoker = createInvoker(
    SprintController_2.get.removeMemberFromSprint(fakeValue[Long]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "net.atos.tenderingportal.application.controller.SprintController",
      "removeMemberFromSprint",
      Seq(classOf[Long]),
      "DELETE",
      """""",
      this.prefix + """api/sprints/$sprintId<[^/]+>/members"""
    )
  )

  // @LINE:24
  private[this] lazy val net_atos_tenderingportal_application_controller_UserController_findProjectsAssignedToUser17_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/users/"), DynamicPart("userId", """[^/]+""",true), StaticPart("/projects")))
  )
  private[this] lazy val net_atos_tenderingportal_application_controller_UserController_findProjectsAssignedToUser17_invoker = createInvoker(
    UserController_6.get.findProjectsAssignedToUser(fakeValue[Long]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "net.atos.tenderingportal.application.controller.UserController",
      "findProjectsAssignedToUser",
      Seq(classOf[Long]),
      "GET",
      """""",
      this.prefix + """api/users/$userId<[^/]+>/projects"""
    )
  )

  // @LINE:25
  private[this] lazy val net_atos_tenderingportal_application_controller_UserController_findStoriesAssignedToUser18_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/users/"), DynamicPart("userId", """[^/]+""",true), StaticPart("/stories")))
  )
  private[this] lazy val net_atos_tenderingportal_application_controller_UserController_findStoriesAssignedToUser18_invoker = createInvoker(
    UserController_6.get.findStoriesAssignedToUser(fakeValue[Long]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "net.atos.tenderingportal.application.controller.UserController",
      "findStoriesAssignedToUser",
      Seq(classOf[Long]),
      "GET",
      """""",
      this.prefix + """api/users/$userId<[^/]+>/stories"""
    )
  )

  // @LINE:27
  private[this] lazy val net_atos_tenderingportal_application_controller_StoryController_getAllStoriesForSprint19_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/sprints/"), DynamicPart("sprintId", """[^/]+""",true), StaticPart("/stories")))
  )
  private[this] lazy val net_atos_tenderingportal_application_controller_StoryController_getAllStoriesForSprint19_invoker = createInvoker(
    StoryController_8.get.getAllStoriesForSprint(fakeValue[Long]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "net.atos.tenderingportal.application.controller.StoryController",
      "getAllStoriesForSprint",
      Seq(classOf[Long]),
      "GET",
      """""",
      this.prefix + """api/sprints/$sprintId<[^/]+>/stories"""
    )
  )

  // @LINE:28
  private[this] lazy val net_atos_tenderingportal_application_controller_StoryController_createStory20_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/sprints/"), DynamicPart("sprintId", """[^/]+""",true), StaticPart("/stories")))
  )
  private[this] lazy val net_atos_tenderingportal_application_controller_StoryController_createStory20_invoker = createInvoker(
    StoryController_8.get.createStory(fakeValue[Long]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "net.atos.tenderingportal.application.controller.StoryController",
      "createStory",
      Seq(classOf[Long]),
      "POST",
      """""",
      this.prefix + """api/sprints/$sprintId<[^/]+>/stories"""
    )
  )

  // @LINE:29
  private[this] lazy val net_atos_tenderingportal_application_controller_StoryController_updateStory21_route = Route("PUT",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/sprints/"), DynamicPart("sprintId", """[^/]+""",true), StaticPart("/stories")))
  )
  private[this] lazy val net_atos_tenderingportal_application_controller_StoryController_updateStory21_invoker = createInvoker(
    StoryController_8.get.updateStory(fakeValue[Long]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "net.atos.tenderingportal.application.controller.StoryController",
      "updateStory",
      Seq(classOf[Long]),
      "PUT",
      """""",
      this.prefix + """api/sprints/$sprintId<[^/]+>/stories"""
    )
  )

  // @LINE:30
  private[this] lazy val net_atos_tenderingportal_application_controller_StoryController_deleteStory22_route = Route("DELETE",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/stories/"), DynamicPart("storyId", """[^/]+""",true)))
  )
  private[this] lazy val net_atos_tenderingportal_application_controller_StoryController_deleteStory22_invoker = createInvoker(
    StoryController_8.get.deleteStory(fakeValue[Long]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "net.atos.tenderingportal.application.controller.StoryController",
      "deleteStory",
      Seq(classOf[Long]),
      "DELETE",
      """""",
      this.prefix + """api/stories/$storyId<[^/]+>"""
    )
  )

  // @LINE:32
  private[this] lazy val net_atos_tenderingportal_application_controller_ReleaseHistoryController_listAll23_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/release-history")))
  )
  private[this] lazy val net_atos_tenderingportal_application_controller_ReleaseHistoryController_listAll23_invoker = createInvoker(
    ReleaseHistoryController_3.get.listAll,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "net.atos.tenderingportal.application.controller.ReleaseHistoryController",
      "listAll",
      Nil,
      "GET",
      """""",
      this.prefix + """api/release-history"""
    )
  )

  // @LINE:33
  private[this] lazy val net_atos_tenderingportal_application_controller_ProjectController_generateProjectTeamCSV24_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/teamCsvDownload/"), DynamicPart("selectedDate", """[^/]+""",true)))
  )
  private[this] lazy val net_atos_tenderingportal_application_controller_ProjectController_generateProjectTeamCSV24_invoker = createInvoker(
    ProjectController_4.get.generateProjectTeamCSV(fakeValue[Long]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "net.atos.tenderingportal.application.controller.ProjectController",
      "generateProjectTeamCSV",
      Seq(classOf[Long]),
      "GET",
      """""",
      this.prefix + """api/teamCsvDownload/$selectedDate<[^/]+>"""
    )
  )

  // @LINE:34
  private[this] lazy val net_atos_tenderingportal_application_controller_ReferenceDataController_getCodeBook25_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/reference-data/codebook")))
  )
  private[this] lazy val net_atos_tenderingportal_application_controller_ReferenceDataController_getCodeBook25_invoker = createInvoker(
    ReferenceDataController_5.get.getCodeBook,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "net.atos.tenderingportal.application.controller.ReferenceDataController",
      "getCodeBook",
      Nil,
      "GET",
      """""",
      this.prefix + """api/reference-data/codebook"""
    )
  )

  // @LINE:36
  private[this] lazy val net_atos_tenderingportal_application_controller_ShowcaseController_getAllShowcases26_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/showcase")))
  )
  private[this] lazy val net_atos_tenderingportal_application_controller_ShowcaseController_getAllShowcases26_invoker = createInvoker(
    ShowcaseController_1.get.getAllShowcases,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "net.atos.tenderingportal.application.controller.ShowcaseController",
      "getAllShowcases",
      Nil,
      "GET",
      """""",
      this.prefix + """api/showcase"""
    )
  )

  // @LINE:38
  private[this] lazy val net_atos_tenderingportal_application_controller_UserController_findUserCertifications27_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/users/"), DynamicPart("userId", """[^/]+""",true), StaticPart("/certifications")))
  )
  private[this] lazy val net_atos_tenderingportal_application_controller_UserController_findUserCertifications27_invoker = createInvoker(
    UserController_6.get.findUserCertifications(fakeValue[Long]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "net.atos.tenderingportal.application.controller.UserController",
      "findUserCertifications",
      Seq(classOf[Long]),
      "GET",
      """""",
      this.prefix + """api/users/$userId<[^/]+>/certifications"""
    )
  )

  // @LINE:39
  private[this] lazy val net_atos_tenderingportal_application_controller_UserController_createUserCertification28_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/users/"), DynamicPart("userId", """[^/]+""",true), StaticPart("/certifications")))
  )
  private[this] lazy val net_atos_tenderingportal_application_controller_UserController_createUserCertification28_invoker = createInvoker(
    UserController_6.get.createUserCertification(fakeValue[Long]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "net.atos.tenderingportal.application.controller.UserController",
      "createUserCertification",
      Seq(classOf[Long]),
      "POST",
      """""",
      this.prefix + """api/users/$userId<[^/]+>/certifications"""
    )
  )

  // @LINE:42
  private[this] lazy val controllers_Assets_at29_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix)))
  )
  private[this] lazy val controllers_Assets_at29_invoker = createInvoker(
    Assets_7.at(fakeValue[String], fakeValue[String]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.Assets",
      "at",
      Seq(classOf[String], classOf[String]),
      "GET",
      """""",
      this.prefix + """"""
    )
  )

  // @LINE:45
  private[this] lazy val controllers_Assets_versioned30_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), DynamicPart("file", """.+""",false)))
  )
  private[this] lazy val controllers_Assets_versioned30_invoker = createInvoker(
    Assets_7.versioned(fakeValue[String], fakeValue[Asset]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.Assets",
      "versioned",
      Seq(classOf[String], classOf[Asset]),
      "GET",
      """ Map static resources from the /public folder to the /assets URL path""",
      this.prefix + """$file<.+>"""
    )
  )


  def routes: PartialFunction[RequestHeader, Handler] = {
  
    // @LINE:6
    case net_atos_tenderingportal_application_controller_AccountController_registerUser0_route(params) =>
      call { 
        net_atos_tenderingportal_application_controller_AccountController_registerUser0_invoker.call(AccountController_0.get.registerUser)
      }
  
    // @LINE:7
    case net_atos_tenderingportal_application_controller_AccountController_activateUser1_route(params) =>
      call(params.fromQuery[String]("key", None)) { (key) =>
        net_atos_tenderingportal_application_controller_AccountController_activateUser1_invoker.call(AccountController_0.get.activateUser(key))
      }
  
    // @LINE:8
    case net_atos_tenderingportal_application_controller_AccountController_login2_route(params) =>
      call { 
        net_atos_tenderingportal_application_controller_AccountController_login2_invoker.call(AccountController_0.get.login)
      }
  
    // @LINE:9
    case net_atos_tenderingportal_application_controller_AccountController_forgotPassword3_route(params) =>
      call { 
        net_atos_tenderingportal_application_controller_AccountController_forgotPassword3_invoker.call(AccountController_0.get.forgotPassword)
      }
  
    // @LINE:10
    case net_atos_tenderingportal_application_controller_AccountController_changePassword4_route(params) =>
      call { 
        net_atos_tenderingportal_application_controller_AccountController_changePassword4_invoker.call(AccountController_0.get.changePassword)
      }
  
    // @LINE:11
    case net_atos_tenderingportal_application_controller_UserController_saveUserPreference5_route(params) =>
      call { 
        net_atos_tenderingportal_application_controller_UserController_saveUserPreference5_invoker.call(UserController_6.get.saveUserPreference)
      }
  
    // @LINE:12
    case net_atos_tenderingportal_application_controller_UserController_editAccountDetails6_route(params) =>
      call { 
        net_atos_tenderingportal_application_controller_UserController_editAccountDetails6_invoker.call(UserController_6.get.editAccountDetails)
      }
  
    // @LINE:13
    case net_atos_tenderingportal_application_controller_ProjectController_createProject7_route(params) =>
      call { 
        net_atos_tenderingportal_application_controller_ProjectController_createProject7_invoker.call(ProjectController_4.get.createProject)
      }
  
    // @LINE:14
    case net_atos_tenderingportal_application_controller_ProjectController_getProjects8_route(params) =>
      call(params.fromQuery[java.lang.Boolean]("currentSprint", Some(null)), params.fromQuery[java.lang.Boolean]("productOwner", Some(null))) { (currentSprint, productOwner) =>
        net_atos_tenderingportal_application_controller_ProjectController_getProjects8_invoker.call(ProjectController_4.get.getProjects(currentSprint, productOwner))
      }
  
    // @LINE:15
    case net_atos_tenderingportal_application_controller_ProjectController_getProjectsWithTeams9_route(params) =>
      call(params.fromPath[Long]("selectedDate", None)) { (selectedDate) =>
        net_atos_tenderingportal_application_controller_ProjectController_getProjectsWithTeams9_invoker.call(ProjectController_4.get.getProjectsWithTeams(selectedDate))
      }
  
    // @LINE:16
    case net_atos_tenderingportal_application_controller_ProjectController_cancelProject10_route(params) =>
      call(params.fromPath[Long]("id", None)) { (id) =>
        net_atos_tenderingportal_application_controller_ProjectController_cancelProject10_invoker.call(ProjectController_4.get.cancelProject(id))
      }
  
    // @LINE:17
    case net_atos_tenderingportal_application_controller_ProjectController_updateProject11_route(params) =>
      call { 
        net_atos_tenderingportal_application_controller_ProjectController_updateProject11_invoker.call(ProjectController_4.get.updateProject)
      }
  
    // @LINE:18
    case net_atos_tenderingportal_application_controller_SprintController_createSprintForProject12_route(params) =>
      call(params.fromPath[Long]("projectId", None)) { (projectId) =>
        net_atos_tenderingportal_application_controller_SprintController_createSprintForProject12_invoker.call(SprintController_2.get.createSprintForProject(projectId))
      }
  
    // @LINE:19
    case net_atos_tenderingportal_application_controller_SprintController_getAllSprintsForProject13_route(params) =>
      call(params.fromPath[Long]("projectId", None)) { (projectId) =>
        net_atos_tenderingportal_application_controller_SprintController_getAllSprintsForProject13_invoker.call(SprintController_2.get.getAllSprintsForProject(projectId))
      }
  
    // @LINE:20
    case net_atos_tenderingportal_application_controller_SprintController_updateSprint14_route(params) =>
      call { 
        net_atos_tenderingportal_application_controller_SprintController_updateSprint14_invoker.call(SprintController_2.get.updateSprint)
      }
  
    // @LINE:21
    case net_atos_tenderingportal_application_controller_SprintController_addMemberToSprint15_route(params) =>
      call(params.fromPath[Long]("sprintId", None)) { (sprintId) =>
        net_atos_tenderingportal_application_controller_SprintController_addMemberToSprint15_invoker.call(SprintController_2.get.addMemberToSprint(sprintId))
      }
  
    // @LINE:22
    case net_atos_tenderingportal_application_controller_SprintController_removeMemberFromSprint16_route(params) =>
      call(params.fromPath[Long]("sprintId", None)) { (sprintId) =>
        net_atos_tenderingportal_application_controller_SprintController_removeMemberFromSprint16_invoker.call(SprintController_2.get.removeMemberFromSprint(sprintId))
      }
  
    // @LINE:24
    case net_atos_tenderingportal_application_controller_UserController_findProjectsAssignedToUser17_route(params) =>
      call(params.fromPath[Long]("userId", None)) { (userId) =>
        net_atos_tenderingportal_application_controller_UserController_findProjectsAssignedToUser17_invoker.call(UserController_6.get.findProjectsAssignedToUser(userId))
      }
  
    // @LINE:25
    case net_atos_tenderingportal_application_controller_UserController_findStoriesAssignedToUser18_route(params) =>
      call(params.fromPath[Long]("userId", None)) { (userId) =>
        net_atos_tenderingportal_application_controller_UserController_findStoriesAssignedToUser18_invoker.call(UserController_6.get.findStoriesAssignedToUser(userId))
      }
  
    // @LINE:27
    case net_atos_tenderingportal_application_controller_StoryController_getAllStoriesForSprint19_route(params) =>
      call(params.fromPath[Long]("sprintId", None)) { (sprintId) =>
        net_atos_tenderingportal_application_controller_StoryController_getAllStoriesForSprint19_invoker.call(StoryController_8.get.getAllStoriesForSprint(sprintId))
      }
  
    // @LINE:28
    case net_atos_tenderingportal_application_controller_StoryController_createStory20_route(params) =>
      call(params.fromPath[Long]("sprintId", None)) { (sprintId) =>
        net_atos_tenderingportal_application_controller_StoryController_createStory20_invoker.call(StoryController_8.get.createStory(sprintId))
      }
  
    // @LINE:29
    case net_atos_tenderingportal_application_controller_StoryController_updateStory21_route(params) =>
      call(params.fromPath[Long]("sprintId", None)) { (sprintId) =>
        net_atos_tenderingportal_application_controller_StoryController_updateStory21_invoker.call(StoryController_8.get.updateStory(sprintId))
      }
  
    // @LINE:30
    case net_atos_tenderingportal_application_controller_StoryController_deleteStory22_route(params) =>
      call(params.fromPath[Long]("storyId", None)) { (storyId) =>
        net_atos_tenderingportal_application_controller_StoryController_deleteStory22_invoker.call(StoryController_8.get.deleteStory(storyId))
      }
  
    // @LINE:32
    case net_atos_tenderingportal_application_controller_ReleaseHistoryController_listAll23_route(params) =>
      call { 
        net_atos_tenderingportal_application_controller_ReleaseHistoryController_listAll23_invoker.call(ReleaseHistoryController_3.get.listAll)
      }
  
    // @LINE:33
    case net_atos_tenderingportal_application_controller_ProjectController_generateProjectTeamCSV24_route(params) =>
      call(params.fromPath[Long]("selectedDate", None)) { (selectedDate) =>
        net_atos_tenderingportal_application_controller_ProjectController_generateProjectTeamCSV24_invoker.call(ProjectController_4.get.generateProjectTeamCSV(selectedDate))
      }
  
    // @LINE:34
    case net_atos_tenderingportal_application_controller_ReferenceDataController_getCodeBook25_route(params) =>
      call { 
        net_atos_tenderingportal_application_controller_ReferenceDataController_getCodeBook25_invoker.call(ReferenceDataController_5.get.getCodeBook)
      }
  
    // @LINE:36
    case net_atos_tenderingportal_application_controller_ShowcaseController_getAllShowcases26_route(params) =>
      call { 
        net_atos_tenderingportal_application_controller_ShowcaseController_getAllShowcases26_invoker.call(ShowcaseController_1.get.getAllShowcases)
      }
  
    // @LINE:38
    case net_atos_tenderingportal_application_controller_UserController_findUserCertifications27_route(params) =>
      call(params.fromPath[Long]("userId", None)) { (userId) =>
        net_atos_tenderingportal_application_controller_UserController_findUserCertifications27_invoker.call(UserController_6.get.findUserCertifications(userId))
      }
  
    // @LINE:39
    case net_atos_tenderingportal_application_controller_UserController_createUserCertification28_route(params) =>
      call(params.fromPath[Long]("userId", None)) { (userId) =>
        net_atos_tenderingportal_application_controller_UserController_createUserCertification28_invoker.call(UserController_6.get.createUserCertification(userId))
      }
  
    // @LINE:42
    case controllers_Assets_at29_route(params) =>
      call(Param[String]("path", Right("/public/webapp")), Param[String]("file", Right("index.html"))) { (path, file) =>
        controllers_Assets_at29_invoker.call(Assets_7.at(path, file))
      }
  
    // @LINE:45
    case controllers_Assets_versioned30_route(params) =>
      call(Param[String]("path", Right("/public/webapp")), params.fromPath[Asset]("file", None)) { (path, file) =>
        controllers_Assets_versioned30_invoker.call(Assets_7.versioned(path, file))
      }
  }
}