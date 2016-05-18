
package views.html.mailtemplates

import play.twirl.api._
import play.twirl.api.TemplateMagic._


     object userAccountResetPassword_Scope0 {
import models._
import controllers._
import play.api.i18n._
import views.html._
import play.api.templates.PlayMagic._
import java.lang._
import java.util._
import scala.collection.JavaConversions._
import scala.collection.JavaConverters._
import play.core.j.PlayMagicForJava._
import play.mvc._
import play.data._
import play.api.data.Field
import play.mvc.Http.Context.Implicit._

     object userAccountResetPassword_Scope1 {
import net.atos.tenderingportal.domain.model.User

class userAccountResetPassword extends BaseScalaTemplate[play.twirl.api.HtmlFormat.Appendable,Format[play.twirl.api.HtmlFormat.Appendable]](play.twirl.api.HtmlFormat) with play.twirl.api.Template3[User,String,String,play.twirl.api.HtmlFormat.Appendable] {

  /**/
  def apply/*2.2*/(user: User, baseUrl: String, password: String):play.twirl.api.HtmlFormat.Appendable = {
    _display_ {
      {


Seq[Any](format.raw/*2.49*/("""

"""),format.raw/*4.1*/("""<!DOCTYPE html>

<html lang="en">
<head>
    <title>Atos Tendering Portal reset password</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>
<p>
    Dear """),_display_(/*13.11*/user/*13.15*/.getFirstName),format.raw/*13.28*/("""
"""),format.raw/*14.1*/("""</p>
<p>
    Your password has been reset. Your temporary password is:
</p>
<p>
    """),_display_(/*19.6*/password),format.raw/*19.14*/("""
"""),format.raw/*20.1*/("""</p>
<p>
    <a href=""""),_display_(/*22.15*/baseUrl),format.raw/*22.22*/("""/#/login">Click on this link to login</a>
</p>
<p>
    Please remember to change your password once you have logged in.
</p>
<p>
    <em>This automatic notification was sent by the Atos Tendering Portal. Please do not reply to this
        e-mail.</em>
</p>
</body>
</html>"""))
      }
    }
  }

  def render(user:User,baseUrl:String,password:String): play.twirl.api.HtmlFormat.Appendable = apply(user,baseUrl,password)

  def f:((User,String,String) => play.twirl.api.HtmlFormat.Appendable) = (user,baseUrl,password) => apply(user,baseUrl,password)

  def ref: this.type = this

}


}
}

/**/
object userAccountResetPassword extends userAccountResetPassword_Scope0.userAccountResetPassword_Scope1.userAccountResetPassword
              /*
                  -- GENERATED --
                  DATE: Wed Mar 30 19:44:22 BST 2016
                  SOURCE: /home/europa/play-workspace/ddutp/dpuportal/svc/app/views/mailtemplates/userAccountResetPassword.scala.html
                  HASH: a1fd42fdf1818df096b77c393c1eab48c0a4fbe1
                  MATRIX: 906->52|1048->99|1076->101|1303->301|1316->305|1350->318|1378->319|1489->404|1518->412|1546->413|1596->436|1624->443
                  LINES: 30->2|35->2|37->4|46->13|46->13|46->13|47->14|52->19|52->19|53->20|55->22|55->22
                  -- GENERATED --
              */
          