Imports System.Web
Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.Collections.Generic
Imports System.Data.SqlTypes
Imports System.Data.SqlClient
Imports System.Text
Imports System.Xml
Imports System.IO
Imports SI_UTIL
Imports nsJSON

<System.Web.Script.Services.ScriptService()> _
<WebService(Namespace:="http://tempuri.org/")> _
<WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)> _
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Public Class wsNews
    Inherits System.Web.Services.WebService

#Region "News Entries"

    <WebMethod()> _
    Public Function saveEntry(ByVal newsId As Integer,
                              ByVal title As String,
                              ByVal body As String,
                              ByVal shortTitle As String,
                              ByVal summary As String,
                              ByVal primaryPic As String,
                              ByVal thumbPic As String,
                              ByVal projectUrl As String,
                              ByVal metadesc As String,
                              ByVal isActive As Boolean,
                              ByVal datePosted As String,
                              ByVal tags() As Integer) As String
        Dim rsp As String = ""
        Dim theNewsId As Integer = -1

        Try
            ' Generate the webUrl
            Dim webUrl As String = ""

            ' Rewrite the Title replacing characters with - to save as the webUrl
            Dim chars() As Char = title.ToLower.ToCharArray
            For i As Integer = 0 To chars.Length - 1
                Dim c As Char = chars(i)
                If c = "!" Or c = "/" Or c = "\" Or c = "?" Or c = "+" Or c = "=" Or c = ")" Or c = "(" Or c = "'" Or c = ";" Or c = ":" Or c = """" Or c = "," Or c = "." Or c = "@" Or c = "#" Or c = "$" Or c = "%" Or c = "^" Or c = "&" Or c = "*" Or c = "~" Or c = "`" Or c = " " Then
                    If i + 1 < chars.Length AndAlso Not webUrl.Chars(webUrl.Length - 1) = "-" AndAlso Not c = "'" Then
                        webUrl &= "-"
                    End If
                Else
                    webUrl &= c
                End If
            Next

            ' Make the webUrl like ".com/news/2012/11/awesome-news-title"
            If datePosted = "" Then
                datePosted = Now
            End If

            Dim theDate As DateTime = datePosted
            Dim year As String = theDate.Year
            Dim month As String = theDate.Month
            If CInt(month) < 10 Then
                month = "0" & month
            End If

            webUrl = year & "/" & month & "/" & webUrl

            ' Save the entry
            Dim ta As New dsNewsTableAdapters.NewsTableAdapter
            ta.Update(newsId, title, body, shortTitle, summary, primaryPic, thumbPic, webUrl, projectUrl, metadesc, isActive, theNewsId)

            ' Save the tags
            Dim taTags As New dsNewsTableAdapters.QueriesTableAdapter
            For i As Integer = 0 To tags.Length - 1
                taTags.SI_News_Tags_Lookup_Save(theNewsId, tags(i))
            Next

            ' Update the RSS File
            buildRSSFile()

            rsp = "{""status"":""success"",""newsId"":""" & theNewsId & """}"
        Catch ex As Exception
            rsp = "{""status"":""error"",""msg"":""" & ex.ToString & """}"
        End Try

        Return rsp
    End Function

    Private Function loadNewsItems(ByVal newsId As Integer,
                                   ByVal search As String,
                                   ByVal webUrl As String,
                                   ByVal tagUrl As String,
                                   ByVal isActive As Boolean,
                                   ByVal start As Integer,
                                   ByVal max As Integer) As dsNews

        Dim ta As New dsNewsTableAdapters.NewsTableAdapter
        Dim ds As New dsNews

        Try
            If Not search Is Nothing AndAlso search.Length = 0 Then
                search = Nothing
            End If

            If Not webUrl Is Nothing AndAlso webUrl.Length = 0 Then
                webUrl = Nothing
            End If

            If Not tagUrl Is Nothing AndAlso tagUrl.Length = 0 Then
                tagUrl = Nothing
            End If

            If max = -1 Then
                max = 99999
            End If

            ta.Fill(ds.News, newsId, search, webUrl, tagUrl, isActive, start, max)
        Catch ex As Exception
            ds = Nothing
        End Try

        Return ds
    End Function

    <WebMethod()> _
    Public Function loadNewsItemsAsJson(ByVal newsId As Integer,
                                        ByVal search As String,
                                        ByVal webUrl As String,
                                        ByVal tagUrl As String,
                                        ByVal isActive As Boolean,
                                        ByVal start As Integer,
                                        ByVal max As Integer) As List(Of RowClass)

        Dim ds As dsNews = loadNewsItems(newsId, search, webUrl, tagUrl, isActive, start, max)
        Return New DataSetToListClass(ds.News).ReturnDS

    End Function

    <WebMethod(EnableSession:=True)> _
    Public Function loadNewsItemsAsHtml(ByVal newsId As Integer,
                                        ByVal search As String,
                                        ByVal webUrl As String,
                                        ByVal tagUrl As String,
                                        ByVal isActive As Boolean,
                                        ByVal start As Integer,
                                        ByVal max As Integer,
                                        ByVal displayMode As Integer) As String
        Dim html As String = ""

        Const VIEW_SUMMARY As Integer = 1
        Const VIEW_FULL_ENTRY As Integer = 2
        Const VIEW_OPTIONS As Integer = 3

        Dim ds As dsNews = loadNewsItems(newsId, search, webUrl, tagUrl, isActive, start, max)

        If displayMode = VIEW_SUMMARY Then
            html = getNewsItemSummary(ds.News)
        ElseIf displayMode = VIEW_FULL_ENTRY Then
            html = getNewsItemFull(ds.News)
        ElseIf displayMode = VIEW_OPTIONS Then
            html = getNewsItemsOptions(ds.News)
        End If

        Return html
    End Function

    Private Function getNewsItemSummary(ByVal items As dsNews.NewsDataTable) As String
        Dim html As New StringBuilder

        Try
            Dim tmpl As String = File.ReadAllText(Server.MapPath("~/templates/news-item-summary.html"))
            Dim util As New SI_UTIL

            For i As Integer = 0 To items.Rows.Count - 1
                Dim row As dsNews.NewsRow = items.Rows(i)
                Dim item As String = util.getTmplItem(tmpl)

                Dim img As String = IIf(IsDBNull(row.Item("thumbPic")), "si.v1.png", row.Item("thumbPic"))
                If img.Length = 0 Then
                    img = "si.v1.png"
                End If

                Dim imgType As String = IIf(IsDBNull(row.Item("thumbPicType")), "", row.Item("thumbPicType"))
                img = util.getImg("news/t/" & img, imgType)

                item = item.Replace("{{thumbPic}}", img)
                item = item.Replace("{{shortTitle}}", row.Item("shortTitle"))
                item = item.Replace("{{summary}}", row.Item("summary"))
                item = item.Replace("{{webUrl}}", row.Item("webUrl"))

                If i = 0 Or i Mod 4 = 0 Then
                    html.Append("<div class=""row cols-4-half"">")
                End If

                html.Append(item)

                If (i + 1) Mod 4 = 0 Or i + 1 = items.Rows.Count Then
                    html.Append("</div>")
                End If
            Next
        Catch ex As Exception
            Return ex.ToString()
        End Try

        Return html.ToString
    End Function

    Private Function getNewsItemFull(ByVal items As dsNews.NewsDataTable) As String
        Dim html As New StringBuilder

        Try
            Dim tmpl As String = File.ReadAllText(Server.MapPath("~/templates/news-item-full.html"))
            Dim util As New SI_UTIL

            For i As Integer = 0 To items.Rows.Count - 1
                Dim row As dsNews.NewsRow = items.Rows(i)
                Dim item As String = util.getTmplItem(tmpl)

                Dim img As String = IIf(IsDBNull(row.Item("primaryPic")), "si.v1.png", row.Item("primaryPic"))
                If img.Length = 0 Then
                    img = "si.v1.png"
                End If

                Dim datePosted As DateTime = row.Item("datePosted")

                Dim projectUrl As String = IIf(IsDBNull(row.Item("projectUrl")), "", row.Item("projectUrl"))
                Dim theProjectUrl As String = ""
                If projectUrl.Length > 0 Then
                    theProjectUrl = "<p>View the project: <a href=""http://" & projectUrl & """ target=""_blank"">" & projectUrl & "</a></p>"
                End If

                Dim imgType As String = IIf(IsDBNull(row.Item("primaryPicType")), "", row.Item("primaryPicType"))

                item = item.Replace("{{metadesc}}", row.Item("metadesc"))
                item = item.Replace("{{primaryPic}}", img)
                item = item.Replace("{{imgType}}", imgType)
                item = item.Replace("{{title}}", row.Item("title"))
                item = item.Replace("{{datePosted}}", datePosted.ToString("MMMM dd, yyyy") & "&nbsp;&nbsp;" & datePosted.ToString("h:mm tt"))
                item = item.Replace("{{body}}", row.Item("body"))
                item = item.Replace("{{webUrl}}", row.Item("webUrl"))
                item = item.Replace("{{projectUrl}}", theProjectUrl)

                ' Load the tags
                item = item.Replace("{{tags}}", loadTagsAsHtml(-1, row.Item("newsId"), 2))

                html.Append(item)
            Next
        Catch ex As Exception
            html.Append(ex.ToString)
        End Try

        Return html.ToString
    End Function

    Private Function getNewsItemsOptions(ByVal items As dsNews.NewsDataTable) As String
        Dim html As New StringBuilder

        Try
            html.Append("<option value=""-1"">-- Select an Entry --</option>")

            For i As Integer = 0 To items.Rows.Count - 1
                Dim row As dsNews.NewsRow = items.Rows(i)
                html.Append("<option value=""" & row.Item("newsId") & """>" & row.Item("title") & "</option>")
            Next
        Catch ex As Exception
            html.Append("<option value=""-1"">-- Unable to Load Entries --</option>")
        End Try

        Return html.ToString
    End Function

    <WebMethod()> _
    Public Function deleteEntry(ByVal newsId As Integer) As String
        Dim rsp As String = ""

        Try
            Dim ta As New dsNewsTableAdapters.NewsTableAdapter
            ta.Delete(newsId)
            rsp = "{""status"":""success""}"
        Catch ex As Exception
            rsp = "{""status"":""error"",""msg"":""" & ex.ToString & """}"
        End Try

        Return rsp
    End Function

#End Region

#Region "Tags"

    <WebMethod()> _
    Private Function loadTags(ByVal tagId As Integer,
                              ByVal newsId As Integer) As dsNews
        Dim ta As New dsNewsTableAdapters.TagsTableAdapter
        Dim ds As New dsNews

        Try
            ta.Fill(ds.Tags, tagId, newsId)
        Catch ex As Exception
            ds = Nothing
        End Try

        Return ds
    End Function

    <WebMethod()> _
    Public Function loadTagsAsJson(ByVal tagId As Integer,
                                   ByVal newsId As Integer) As List(Of RowClass)
        Dim ds As dsNews = loadTags(tagId, newsId)
        Return New DataSetToListClass(ds.Tags).ReturnDS
    End Function

    <WebMethod()> _
    Public Function loadTagsAsHtml(ByVal tagId As Integer,
                                   ByVal newsId As Integer,
                                   ByVal displayMode As Integer) As String
        Dim html As String = ""

        Const VIEW_OPTIONS As Integer = 1
        Const VIEW_FOR_ENTRY As Integer = 2

        Try
            Dim ds As dsNews = loadTags(tagId, newsId)

            If displayMode = VIEW_OPTIONS Then
                html = loadTagsAsOptions(ds.Tags)
            ElseIf displayMode = VIEW_FOR_ENTRY Then
                html = loadTagsForEntryHtml(ds.Tags)
            End If
        Catch ex As Exception

        End Try

        Return html
    End Function

    Private Function loadTagsAsOptions(ByVal items As dsNews.TagsDataTable) As String
        Dim html As New StringBuilder

        Try
            html.Append("<option value=""-1"">-- Select a Tag --</option>")

            For i As Integer = 0 To items.Rows.Count - 1
                Dim row As dsNews.TagsRow = items.Rows(i)
                html.Append("<option value=""" & row.Item("tagId") & """>" & row.Item("tag") & "</option>")
            Next
        Catch ex As Exception
            html.Clear().Append("<option value=""-1"">Unable to load tags</option>")
        End Try

        Return html.ToString
    End Function

    Private Function loadTagsForEntryHtml(ByVal items As dsNews.TagsDataTable) As String
        Dim html As New StringBuilder("Tags:")

        Try
            For i As Integer = 0 To items.Rows.Count - 1
                Dim row As dsNews.TagsRow = items.Rows(i)
                html.Append("<a href=""/news/tag/" & row.Item("tagUrl") & """>" & row.Item("tag") & "</a>")

                If i + 1 < items.Rows.Count Then
                    html.Append("//")
                End If
            Next
        Catch ex As Exception
            html.Clear()
        End Try

        Return html.ToString
    End Function

#End Region

#Region "RSS Feed"

    Private Function buildRSSFile() As Boolean
        Dim isProduction As Boolean = False
        If HttpContext.Current.Request.Url.Host.Contains("select-interactive.com") Then
            isProduction = True
        End If

        ' Development
        Dim objX As XmlTextWriter


        If isProduction = True Then
            ' Production
            objX = New XmlTextWriter("D:\Webcustomers\Select Interactive\www.select-interactive.com\wwwroot\feed\rssfeed.xml", System.Text.Encoding.UTF8)
        Else
            ' Development
            objX = New XmlTextWriter("C:\inetpub\wwwroot\SI-V2\feed\rssfeed.xml", System.Text.Encoding.UTF8)
        End If

        objX.WriteStartDocument()
        objX.WriteStartElement("rss")
        objX.WriteAttributeString("version", "2.0")
        objX.WriteStartElement("channel")
        objX.WriteElementString("title", "News from Select Interactive")
        If isProduction = True Then
            objX.WriteElementString("link", "http://select-interactive.com/news/")
        Else
            objX.WriteElementString("link", "http://select/news/")
        End If
        objX.WriteElementString("description", "The latest news, projects, thoughts, ideas and announcements from Select Interactive.")
        objX.WriteElementString("ttl", "5")

        Dim objConnection As New SqlConnection("Server=216.62.58.25;Initial Catalog=Select Interactive;Persist Security Info=True;User ID=sa;Password=danh4741")
        objConnection.Open()
        Dim sql As String = "select top 10 newsId, title, body, datePosted, isActive, webUrl, metadesc from SI_News where isActive = 1 order by datePosted desc"
        Dim objCommand As New SqlCommand(sql, objConnection)
        Dim objReader As SqlDataReader = objCommand.ExecuteReader()
        While objReader.Read()
            objX.WriteStartElement("item")
            objX.WriteElementString("title", objReader.GetString(1))
            'If objReader.GetString(2).Length > 500 Then
            'objX.WriteElementString("description", objReader.GetString(2).Substring(0, 500) + " ...read more...")
            'Else
            objX.WriteElementString("description", objReader.GetString(2))
            'End If

            If isProduction = True Then
                objX.WriteElementString("link", "http://select-interactive.com/news/" + objReader.GetString(5))
            Else
                objX.WriteElementString("link", "http://select/news/" + objReader.GetString(5))
            End If


            objX.WriteElementString("pubDate", FormatDateTime(objReader.GetDateTime(3), DateFormat.GeneralDate))
            objX.WriteEndElement()
        End While
        objReader.Close()
        objConnection.Close()

        objX.WriteEndElement()
        objX.WriteEndElement()
        objX.WriteEndDocument()
        objX.Flush()
        objX.Close()

        Return True
    End Function

#End Region

End Class