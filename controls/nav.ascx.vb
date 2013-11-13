
Partial Class controls_nav
    Inherits System.Web.UI.UserControl

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As EventArgs) Handles MyBase.Load
        If HttpContext.Current.User.Identity.IsAuthenticated Then
            liLogout.Visible = True
        Else
            liLogout.Visible = False
        End If
    End Sub

End Class
