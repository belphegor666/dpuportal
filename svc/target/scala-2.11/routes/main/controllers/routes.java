
// @GENERATOR:play-routes-compiler
// @SOURCE:/home/europa/play-workspace/ddutp/dpuportal/svc/conf/routes
// @DATE:Wed Mar 30 19:44:21 BST 2016

package controllers;

import router.RoutesPrefix;

public class routes {
  
  public static final controllers.ReverseAssets Assets = new controllers.ReverseAssets(RoutesPrefix.byNamePrefix());

  public static class javascript {
    
    public static final controllers.javascript.ReverseAssets Assets = new controllers.javascript.ReverseAssets(RoutesPrefix.byNamePrefix());
  }

}
