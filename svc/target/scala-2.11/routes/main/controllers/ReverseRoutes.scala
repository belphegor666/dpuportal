
// @GENERATOR:play-routes-compiler
// @SOURCE:/home/europa/play-workspace/ddutp/dpuportal/svc/conf/routes
// @DATE:Wed Mar 30 19:44:21 BST 2016

import play.api.mvc.{ QueryStringBindable, PathBindable, Call, JavascriptLiteral }
import play.core.routing.{ HandlerDef, ReverseRouteContext, queryString, dynamicString }


import _root_.controllers.Assets.Asset
import _root_.play.libs.F

// @LINE:42
package controllers {

  // @LINE:42
  class ReverseAssets(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:42
    def at(): Call = {
      implicit val _rrc = new ReverseRouteContext(Map(("path", "/public/webapp"), ("file", "index.html")))
      Call("GET", _prefix)
    }
  
    // @LINE:45
    def versioned(file:Asset): Call = {
      implicit val _rrc = new ReverseRouteContext(Map(("path", "/public/webapp")))
      Call("GET", _prefix + { _defaultPrefix } + implicitly[PathBindable[Asset]].unbind("file", file))
    }
  
  }


}