
Partial Class _Default
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As EventArgs) Handles MyBase.Load
        ltrlNews.Text = (New wsNews).loadNewsItemsAsHtml(-1, Nothing, Nothing, Nothing, True, 1, 4, 1)
    End Sub

End Class
