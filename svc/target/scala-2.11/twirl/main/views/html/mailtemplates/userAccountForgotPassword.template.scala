
package views.html.mailtemplates

import play.twirl.api._
import play.twirl.api.TemplateMagic._


     object userAccountForgotPassword_Scope0 {
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

     object userAccountForgotPassword_Scope1 {
import net.atos.tenderingportal.domain.model.User

class userAccountForgotPassword extends BaseScalaTemplate[play.twirl.api.HtmlFormat.Appendable,Format[play.twirl.api.HtmlFormat.Appendable]](play.twirl.api.HtmlFormat) with play.twirl.api.Template2[User,String,play.twirl.api.HtmlFormat.Appendable] {

  /**/
  def apply/*2.2*/(user: User, baseUrl: String):play.twirl.api.HtmlFormat.Appendable = {
    _display_ {
      {


Seq[Any](format.raw/*2.31*/("""

"""),format.raw/*4.1*/("""<!DOCTYPE html>

<html lang="en">
<head>
    <title>Atos Tendering Portal forgotten password confirmation</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>
<p>
    Dear """),_display_(/*13.11*/user/*13.15*/.getFirstName),format.raw/*13.28*/("""
"""),format.raw/*14.1*/("""</p>
<p>
    A request to reset the password has been made for this email. If this was you, please click the link below to reset your password
</p>
<p>
    <a href=""""),_display_(/*19.15*/baseUrl),format.raw/*19.22*/("""/#/reset-password?key="""),_display_(/*19.45*/user/*19.49*/.getResetPasswordKey),format.raw/*19.69*/("""">Reset Password</a>
</p>
<p>
    If you did not make such a request, please ignore this email. This link will invalidate after 2 hours.
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

  def render(user:User,baseUrl:String): play.twirl.api.HtmlFormat.Appendable = apply(user,baseUrl)

  def f:((User,String) => play.twirl.api.HtmlFormat.Appendable) = (user,baseUrl) => apply(user,baseUrl)

  def ref: this.type = this

}


}
}

/**/
object userAccountForgotPassword extends userAccountForgotPassword_Scope0.userAccountForgotPassword_Scope1.userAccountForgotPassword
              /*
                  -- GENERATED --
                  DATE: Wed Mar 30 19:44:22 BST 2016
                  SOURCE: /home/europa/play-workspace/ddutp/dpuportal/svc/app/views/mailtemplates/userAccountForgotPassword.scala.html
                  HASH: 32bf617aefb64f12ae18bf2375cc9127d599975b
                  MATRIX: 902->52|1026->81|1054->83|1298->300|1311->304|1345->317|1373->318|1566->484|1594->491|1644->514|1657->518|1698->538
                  LINES: 30->2|35->2|37->4|46->13|46->13|46->13|47->14|52->19|52->19|52->19|52->19|52->19
                  -- GENERATED --
              */
          