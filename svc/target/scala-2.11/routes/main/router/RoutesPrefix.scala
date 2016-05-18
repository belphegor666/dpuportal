
// @GENERATOR:play-routes-compiler
// @SOURCE:/home/europa/play-workspace/ddutp/dpuportal/svc/conf/routes
// @DATE:Wed Mar 30 19:44:21 BST 2016


package router {
  object RoutesPrefix {
    private var _prefix: String = "/"
    def setPrefix(p: String): Unit = {
      _prefix = p
    }
    def prefix: String = _prefix
    val byNamePrefix: Function0[String] = { () => prefix }
  }
}
