
Partial Class controls_footer
    Inherits System.Web.UI.UserControl

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As EventArgs) Handles MyBase.Load
        ltrlCopyYear.Text = Year(Now)
    End Sub

End Class
