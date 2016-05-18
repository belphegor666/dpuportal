
// @GENERATOR:play-routes-compiler
// @SOURCE:/home/europa/play-workspace/ddutp/dpuportal/svc/conf/routes
// @DATE:Wed Mar 30 19:44:21 BST 2016

import play.api.mvc.{ QueryStringBindable, PathBindable, Call, JavascriptLiteral }
import play.core.routing.{ HandlerDef, ReverseRouteContext, queryString, dynamicString }


import _root_.controllers.Assets.Asset
import _root_.play.libs.F

// @LINE:6
package net.atos.tenderingportal.application.controller {

  // @LINE:13
  class ReverseProjectController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:14
    def getProjects(currentSprint:java.lang.Boolean = null, productOwner:java.lang.Boolean = null): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "api/projects" + queryString(List(if(currentSprint == null) None else Some(implicitly[QueryStringBindable[java.lang.Boolean]].unbind("currentSprint", currentSprint)), if(productOwner == null) None else Some(implicitly[QueryStringBindable[java.lang.Boolean]].unbind("productOwner", productOwner)))))
    }
  
    // @LINE:33
    def generateProjectTeamCSV(selectedDate:Long): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "api/teamCsvDownload/" + implicitly[PathBindable[Long]].unbind("selectedDate", selectedDate))
    }
  
    // @LINE:13
    def createProject(): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "api/projects")
    }
  
    // @LINE:17
    def updateProject(): Call = {
      import ReverseRouteContext.empty
      Call("PUT", _prefix + { _defaultPrefix } + "api/projects")
    }
  
    // @LINE:16
    def cancelProject(id:Long): Call = {
      import ReverseRouteContext.empty
      Call("DELETE", _prefix + { _defaultPrefix } + "api/projects/" + implicitly[PathBindable[Long]].unbind("id", id))
    }
  
    // @LINE:15
    def getProjectsWithTeams(selectedDate:Long): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "api/projects/" + implicitly[PathBindable[Long]].unbind("selectedDate", selectedDate))
    }
  
  }

  // @LINE:27
  class ReverseStoryController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:29
    def updateStory(sprintId:Long): Call = {
      import ReverseRouteContext.empty
      Call("PUT", _prefix + { _defaultPrefix } + "api/sprints/" + implicitly[PathBindable[Long]].unbind("sprintId", sprintId) + "/stories")
    }
  
    // @LINE:28
    def createStory(sprintId:Long): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "api/sprints/" + implicitly[PathBindable[Long]].unbind("sprintId", sprintId) + "/stories")
    }
  
    // @LINE:27
    def getAllStoriesForSprint(sprintId:Long): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "api/sprints/" + implicitly[PathBindable[Long]].unbind("sprintId", sprintId) + "/stories")
    }
  
    // @LINE:30
    def deleteStory(storyId:Long): Call = {
      import ReverseRouteContext.empty
      Call("DELETE", _prefix + { _defaultPrefix } + "api/stories/" + implicitly[PathBindable[Long]].unbind("storyId", storyId))
    }
  
  }

  // @LINE:34
  class ReverseReferenceDataController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:34
    def getCodeBook(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "api/reference-data/codebook")
    }
  
  }

  // @LINE:18
  class ReverseSprintController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:19
    def getAllSprintsForProject(projectId:Long): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "api/projects/" + implicitly[PathBindable[Long]].unbind("projectId", projectId) + "/sprints")
    }
  
    // @LINE:20
    def updateSprint(): Call = {
      import ReverseRouteContext.empty
      Call("PUT", _prefix + { _defaultPrefix } + "api/sprints")
    }
  
    // @LINE:22
    def removeMemberFromSprint(sprintId:Long): Call = {
      import ReverseRouteContext.empty
      Call("DELETE", _prefix + { _defaultPrefix } + "api/sprints/" + implicitly[PathBindable[Long]].unbind("sprintId", sprintId) + "/members")
    }
  
    // @LINE:18
    def createSprintForProject(projectId:Long): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "api/projects/" + implicitly[PathBindable[Long]].unbind("projectId", projectId) + "/sprints")
    }
  
    // @LINE:21
    def addMemberToSprint(sprintId:Long): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "api/sprints/" + implicitly[PathBindable[Long]].unbind("sprintId", sprintId) + "/members")
    }
  
  }

  // @LINE:11
  class ReverseUserController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:25
    def findStoriesAssignedToUser(userId:Long): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "api/users/" + implicitly[PathBindable[Long]].unbind("userId", userId) + "/stories")
    }
  
    // @LINE:24
    def findProjectsAssignedToUser(userId:Long): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "api/users/" + implicitly[PathBindable[Long]].unbind("userId", userId) + "/projects")
    }
  
    // @LINE:38
    def findUserCertifications(userId:Long): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "api/users/" + implicitly[PathBindable[Long]].unbind("userId", userId) + "/certifications")
    }
  
    // @LINE:39
    def createUserCertification(userId:Long): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "api/users/" + implicitly[PathBindable[Long]].unbind("userId", userId) + "/certifications")
    }
  
    // @LINE:11
    def saveUserPreference(): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "api/account/user-preference")
    }
  
    // @LINE:12
    def editAccountDetails(): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "api/account/user-details")
    }
  
  }

  // @LINE:32
  class ReverseReleaseHistoryController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:32
    def listAll(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "api/release-history")
    }
  
  }

  // @LINE:36
  class ReverseShowcaseController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:36
    def getAllShowcases(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "api/showcase")
    }
  
  }

  // @LINE:6
  class ReverseAccountController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:7
    def activateUser(key:String): Call = {
      import ReverseRouteContext.empty
      Call("PUT", _prefix + { _defaultPrefix } + "api/account/activate" + queryString(List(Some(implicitly[QueryStringBindable[String]].unbind("key", key)))))
    }
  
    // @LINE:6
    def registerUser(): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "api/account/register")
    }
  
    // @LINE:9
    def forgotPassword(): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "api/account/forgot-password")
    }
  
    // @LINE:10
    def changePassword(): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "api/account/change-password")
    }
  
    // @LINE:8
    def login(): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "api/account/login")
    }
  
  }


}