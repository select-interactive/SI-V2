
Partial Class news_Default
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As EventArgs) Handles MyBase.Load
        Load_Entries()
    End Sub

    Private Sub Load_Entries()
        Dim webUrl As String = Page.Request.QueryString("webUrl")
        Dim tagUrl As String = Page.Request.QueryString("tagUrl")

        Dim html As String = ""
        Dim title As String = ""
        Dim meta As String = ""
        Dim ws As New wsNews

        If Not webUrl Is Nothing AndAlso webUrl.Length > 0 Then
            html = ws.loadNewsItemsAsHtml(-1, Nothing, webUrl, Nothing, False, 1, 1, 2)

            title = html.Substring(html.IndexOf("<h2 class=""news-headline news-headline-large"">") + 46)
            title = title.Substring(0, title.IndexOf("</h2>"))

            meta = html.Substring(html.IndexOf("<div id=""meta-desc"" class=""visuallyhidden"">") + 43)
            meta = meta.Substring(0, meta.IndexOf("</div>"))

            ltrlJS.Text = "<script>window.SI=window.SI || {};SI.isEntry=true;</script>"
        ElseIf Not tagUrl Is Nothing AndAlso tagUrl.Length > 0 Then
            Dim theTitle() As String = tagUrl.Split("-")

            For i As Integer = 0 To theTitle.Length - 1
                title &= theTitle(i).Chars(0).ToString.ToUpper
                title &= theTitle(i).Substring(1)

                If i + 1 < theTitle.Length Then
                    title &= " "
                End If
            Next

            meta = title & " news entries, projects, and blog posts from Select Interactive."
            title = Check_Tag_Page_Titles(title)

            Dim endIndex As Integer = title.IndexOf(" |")
            If endIndex = -1 Then
                endIndex = title.Length
            End If

            html = "<h2 class=""headline headline-large"">" & title.Substring(0, endIndex) & "</h2>"
            html &= ws.loadNewsItemsAsHtml(-1, Nothing, Nothing, tagUrl, True, 1, 8, 1)

            ltrlJS.Text = "<script>window.SI=window.SI || {};SI.tagUrl=""" & tagUrl & """;</script>"
        Else
            title = "Web Development News and Projects from Select Interactive"
            meta = "News, Projects, and web development, web performance, web strategy, and web design blog posts from Select Interactive."
            html = "<h2 class=""headline headline-large"">News and Thoughts from Our Team</h2>"
            html &= ws.loadNewsItemsAsHtml(-1, Nothing, Nothing, Nothing, True, 1, 8, 1)
        End If

        Page.Title = title
        Page.MetaDescription = meta
        ltrlNews.Text = html
    End Sub

    Private Function Check_Tag_Page_Titles(ByVal title As String) As String
        Dim temp As String = title.ToLower

        If temp = "website" Or temp = "project" Or temp = "completed project" Then
            title = title & "s Developed by Select Interactive | Fort Worth Web Design and Development"
        ElseIf temp = "conference" Then
            title = "Web and Technology Conferences Attended"
        End If

        Return title
    End Function

End Class
