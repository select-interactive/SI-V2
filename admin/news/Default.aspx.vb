
Partial Class admin_news_Default
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As EventArgs) Handles MyBase.Load
        Load_Entries()
        Load_Tags()
    End Sub

    Private Sub Load_Entries()
        ltrlEntries.Text = (New wsNews).loadNewsItemsAsHtml(-1, Nothing, Nothing, Nothing, False, 1, -1, 3)
    End Sub

    Private Sub Load_Tags()
        ltrlTags.Text = (New wsNews).loadTagsAsHtml(-1, -1, 1)
    End Sub

End Class
