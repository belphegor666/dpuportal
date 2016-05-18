
package views.html.mailtemplates

import play.twirl.api._
import play.twirl.api.TemplateMagic._


     object userAccountActivation_Scope0 {
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

     object userAccountActivation_Scope1 {
import net.atos.tenderingportal.domain.model.User

class userAccountActivation extends BaseScalaTemplate[play.twirl.api.HtmlFormat.Appendable,Format[play.twirl.api.HtmlFormat.Appendable]](play.twirl.api.HtmlFormat) with play.twirl.api.Template2[User,String,play.twirl.api.HtmlFormat.Appendable] {

  /**/
  def apply/*2.2*/(user: User, baseUrl: String):play.twirl.api.HtmlFormat.Appendable = {
    _display_ {
      {


Seq[Any](format.raw/*2.31*/("""

"""),format.raw/*4.1*/("""<!DOCTYPE html>

<html lang="en">
    <head>
        <title>Atos Tendering Portal account activation</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    </head>
    <body>
        <p>
            Dear """),_display_(/*13.19*/user/*13.23*/.getFirstName),format.raw/*13.36*/("""
        """),format.raw/*14.9*/("""</p>
        <p>
            Your account has been created, please click on the URL below to activate it:
        </p>
        <p>
            <a href=""""),_display_(/*19.23*/baseUrl),format.raw/*19.30*/("""/#/activate?key="""),_display_(/*19.47*/user/*19.51*/.getActivationKey),format.raw/*19.68*/("""">Activation Link</a>
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
object userAccountActivation extends userAccountActivation_Scope0.userAccountActivation_Scope1.userAccountActivation
              /*
                  -- GENERATED --
                  DATE: Wed Mar 30 19:44:22 BST 2016
                  SOURCE: /home/europa/play-workspace/ddutp/dpuportal/svc/app/views/mailtemplates/userAccountActivation.scala.html
                  HASH: 083a44362f185ccf0beaa2eee418ee7abf92ed1f
                  MATRIX: 890->52|1014->81|1042->83|1309->323|1322->327|1356->340|1392->349|1572->502|1600->509|1644->526|1657->530|1695->547
                  LINES: 30->2|35->2|37->4|46->13|46->13|46->13|47->14|52->19|52->19|52->19|52->19|52->19
                  -- GENERATED --
              */
          