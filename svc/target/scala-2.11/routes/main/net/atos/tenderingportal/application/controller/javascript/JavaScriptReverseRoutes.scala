
// @GENERATOR:play-routes-compiler
// @SOURCE:/home/europa/play-workspace/ddutp/dpuportal/svc/conf/routes
// @DATE:Wed Mar 30 19:44:21 BST 2016

import play.api.routing.JavaScriptReverseRoute
import play.api.mvc.{ QueryStringBindable, PathBindable, Call, JavascriptLiteral }
import play.core.routing.{ HandlerDef, ReverseRouteContext, queryString, dynamicString }


import _root_.controllers.Assets.Asset
import _root_.play.libs.F

// @LINE:6
package net.atos.tenderingportal.application.controller.javascript {
  import ReverseRouteContext.empty

  // @LINE:13
  class ReverseProjectController(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:14
    def getProjects: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "net.atos.tenderingportal.application.controller.ProjectController.getProjects",
      """
        function(currentSprint,productOwner) {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "api/projects" + _qS([(currentSprint == null ? null : (""" + implicitly[QueryStringBindable[java.lang.Boolean]].javascriptUnbind + """)("currentSprint", currentSprint)), (productOwner == null ? null : (""" + implicitly[QueryStringBindable[java.lang.Boolean]].javascriptUnbind + """)("productOwner", productOwner))])})
        }
      """
    )
  
    // @LINE:33
    def generateProjectTeamCSV: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "net.atos.tenderingportal.application.controller.ProjectController.generateProjectTeamCSV",
      """
        function(selectedDate) {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "api/teamCsvDownload/" + (""" + implicitly[PathBindable[Long]].javascriptUnbind + """)("selectedDate", selectedDate)})
        }
      """
    )
  
    // @LINE:13
    def createProject: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "net.atos.tenderingportal.application.controller.ProjectController.createProject",
      """
        function() {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + "api/projects"})
        }
      """
    )
  
    // @LINE:17
    def updateProject: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "net.atos.tenderingportal.application.controller.ProjectController.updateProject",
      """
        function() {
          return _wA({method:"PUT", url:"""" + _prefix + { _defaultPrefix } + """" + "api/projects"})
        }
      """
    )
  
    // @LINE:16
    def cancelProject: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "net.atos.tenderingportal.application.controller.ProjectController.cancelProject",
      """
        function(id) {
          return _wA({method:"DELETE", url:"""" + _prefix + { _defaultPrefix } + """" + "api/projects/" + (""" + implicitly[PathBindable[Long]].javascriptUnbind + """)("id", id)})
        }
      """
    )
  
    // @LINE:15
    def getProjectsWithTeams: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "net.atos.tenderingportal.application.controller.ProjectController.getProjectsWithTeams",
      """
        function(selectedDate) {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "api/projects/" + (""" + implicitly[PathBindable[Long]].javascriptUnbind + """)("selectedDate", selectedDate)})
        }
      """
    )
  
  }

  // @LINE:27
  class ReverseStoryController(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:29
    def updateStory: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "net.atos.tenderingportal.application.controller.StoryController.updateStory",
      """
        function(sprintId) {
          return _wA({method:"PUT", url:"""" + _prefix + { _defaultPrefix } + """" + "api/sprints/" + (""" + implicitly[PathBindable[Long]].javascriptUnbind + """)("sprintId", sprintId) + "/stories"})
        }
      """
    )
  
    // @LINE:28
    def createStory: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "net.atos.tenderingportal.application.controller.StoryController.createStory",
      """
        function(sprintId) {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + "api/sprints/" + (""" + implicitly[PathBindable[Long]].javascriptUnbind + """)("sprintId", sprintId) + "/stories"})
        }
      """
    )
  
    // @LINE:27
    def getAllStoriesForSprint: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "net.atos.tenderingportal.application.controller.StoryController.getAllStoriesForSprint",
      """
        function(sprintId) {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "api/sprints/" + (""" + implicitly[PathBindable[Long]].javascriptUnbind + """)("sprintId", sprintId) + "/stories"})
        }
      """
    )
  
    // @LINE:30
    def deleteStory: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "net.atos.tenderingportal.application.controller.StoryController.deleteStory",
      """
        function(storyId) {
          return _wA({method:"DELETE", url:"""" + _prefix + { _defaultPrefix } + """" + "api/stories/" + (""" + implicitly[PathBindable[Long]].javascriptUnbind + """)("storyId", storyId)})
        }
      """
    )
  
  }

  // @LINE:34
  class ReverseReferenceDataController(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:34
    def getCodeBook: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "net.atos.tenderingportal.application.controller.ReferenceDataController.getCodeBook",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "api/reference-data/codebook"})
        }
      """
    )
  
  }

  // @LINE:18
  class ReverseSprintController(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:19
    def getAllSprintsForProject: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "net.atos.tenderingportal.application.controller.SprintController.getAllSprintsForProject",
      """
        function(projectId) {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "api/projects/" + (""" + implicitly[PathBindable[Long]].javascriptUnbind + """)("projectId", projectId) + "/sprints"})
        }
      """
    )
  
    // @LINE:20
    def updateSprint: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "net.atos.tenderingportal.application.controller.SprintController.updateSprint",
      """
        function() {
          return _wA({method:"PUT", url:"""" + _prefix + { _defaultPrefix } + """" + "api/sprints"})
        }
      """
    )
  
    // @LINE:22
    def removeMemberFromSprint: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "net.atos.tenderingportal.application.controller.SprintController.removeMemberFromSprint",
      """
        function(sprintId) {
          return _wA({method:"DELETE", url:"""" + _prefix + { _defaultPrefix } + """" + "api/sprints/" + (""" + implicitly[PathBindable[Long]].javascriptUnbind + """)("sprintId", sprintId) + "/members"})
        }
      """
    )
  
    // @LINE:18
    def createSprintForProject: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "net.atos.tenderingportal.application.controller.SprintController.createSprintForProject",
      """
        function(projectId) {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + "api/projects/" + (""" + implicitly[PathBindable[Long]].javascriptUnbind + """)("projectId", projectId) + "/sprints"})
        }
      """
    )
  
    // @LINE:21
    def addMemberToSprint: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "net.atos.tenderingportal.application.controller.SprintController.addMemberToSprint",
      """
        function(sprintId) {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + "api/sprints/" + (""" + implicitly[PathBindable[Long]].javascriptUnbind + """)("sprintId", sprintId) + "/members"})
        }
      """
    )
  
  }

  // @LINE:11
  class ReverseUserController(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:25
    def findStoriesAssignedToUser: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "net.atos.tenderingportal.application.controller.UserController.findStoriesAssignedToUser",
      """
        function(userId) {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "api/users/" + (""" + implicitly[PathBindable[Long]].javascriptUnbind + """)("userId", userId) + "/stories"})
        }
      """
    )
  
    // @LINE:24
    def findProjectsAssignedToUser: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "net.atos.tenderingportal.application.controller.UserController.findProjectsAssignedToUser",
      """
        function(userId) {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "api/users/" + (""" + implicitly[PathBindable[Long]].javascriptUnbind + """)("userId", userId) + "/projects"})
        }
      """
    )
  
    // @LINE:38
    def findUserCertifications: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "net.atos.tenderingportal.application.controller.UserController.findUserCertifications",
      """
        function(userId) {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "api/users/" + (""" + implicitly[PathBindable[Long]].javascriptUnbind + """)("userId", userId) + "/certifications"})
        }
      """
    )
  
    // @LINE:39
    def createUserCertification: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "net.atos.tenderingportal.application.controller.UserController.createUserCertification",
      """
        function(userId) {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + "api/users/" + (""" + implicitly[PathBindable[Long]].javascriptUnbind + """)("userId", userId) + "/certifications"})
        }
      """
    )
  
    // @LINE:11
    def saveUserPreference: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "net.atos.tenderingportal.application.controller.UserController.saveUserPreference",
      """
        function() {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + "api/account/user-preference"})
        }
      """
    )
  
    // @LINE:12
    def editAccountDetails: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "net.atos.tenderingportal.application.controller.UserController.editAccountDetails",
      """
        function() {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + "api/account/user-details"})
        }
      """
    )
  
  }

  // @LINE:32
  class ReverseReleaseHistoryController(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:32
    def listAll: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "net.atos.tenderingportal.application.controller.ReleaseHistoryController.listAll",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "api/release-history"})
        }
      """
    )
  
  }

  // @LINE:36
  class ReverseShowcaseController(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:36
    def getAllShowcases: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "net.atos.tenderingportal.application.controller.ShowcaseController.getAllShowcases",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "api/showcase"})
        }
      """
    )
  
  }

  // @LINE:6
  class ReverseAccountController(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:7
    def activateUser: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "net.atos.tenderingportal.application.controller.AccountController.activateUser",
      """
        function(key) {
          return _wA({method:"PUT", url:"""" + _prefix + { _defaultPrefix } + """" + "api/account/activate" + _qS([(""" + implicitly[QueryStringBindable[String]].javascriptUnbind + """)("key", key)])})
        }
      """
    )
  
    // @LINE:6
    def registerUser: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "net.atos.tenderingportal.application.controller.AccountController.registerUser",
      """
        function() {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + "api/account/register"})
        }
      """
    )
  
    // @LINE:9
    def forgotPassword: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "net.atos.tenderingportal.application.controller.AccountController.forgotPassword",
      """
        function() {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + "api/account/forgot-password"})
        }
      """
    )
  
    // @LINE:10
    def changePassword: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "net.atos.tenderingportal.application.controller.AccountController.changePassword",
      """
        function() {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + "api/account/change-password"})
        }
      """
    )
  
    // @LINE:8
    def login: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "net.atos.tenderingportal.application.controller.AccountController.login",
      """
        function() {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + "api/account/login"})
        }
      """
    )
  
  }


}