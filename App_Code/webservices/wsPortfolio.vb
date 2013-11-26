Imports System.Web
Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.Collections.Generic
Imports System.IO
Imports SI_UTIL
Imports nsJSON

<System.Web.Script.Services.ScriptService()> _
<WebService(Namespace:="http://tempuri.org/")> _
<WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)> _
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Public Class wsPortfolio
    Inherits System.Web.Services.WebService

    <WebMethod()> _
    Public Function saveProject(ByVal projectId As Integer,
                                ByVal name As String,
                                ByVal url As String,
                                ByVal isHTTPS As Boolean,
                                ByVal blogUrl As String,
                                ByVal primaryPic As String,
                                ByVal logo As String,
                                ByVal summary As String,
                                ByVal sortOrder As Integer,
                                ByVal isActive As Boolean) As String
        Dim rsp As String = ""
        Dim theProjectId As Integer = -1

        Try
            Dim ta As New dsPortfolioTableAdapters.PortfolioTableAdapter
            ta.Update(projectId, name, url, isHTTPS, blogUrl, primaryPic, logo, summary, sortOrder, isActive, theProjectId)
            rsp = "{""status"":""success"",""projectId"":""" & theProjectId & """}"
        Catch ex As Exception
            rsp = "{""status"":""error"",""msg"":""" & ex.ToString() & """}"
        End Try

        Return rsp
    End Function

    <WebMethod()> _
    Public Function loadPortfolioItems(ByVal projectId As Integer,
                                       ByVal isActive As Boolean) As dsPortfolio
        Dim ta As New dsPortfolioTableAdapters.PortfolioTableAdapter
        Dim ds As New dsPortfolio

        Try
            ta.Fill(ds.Portfolio, projectId, isActive)
        Catch ex As Exception

        End Try

        Return ds
    End Function

    <WebMethod()> _
    Public Function loadPortfolioItemsAsJson(ByVal projectId As Integer,
                                             ByVal isActive As Boolean) As List(Of RowClass)
        Dim ds As dsPortfolio = loadPortfolioItems(projectId, isActive)
        Return New DataSetToListClass(ds.Portfolio).ReturnDS
    End Function

    <WebMethod()> _
    Public Function loadPortfolioItemsAsHtml(ByVal projectId As Integer,
                                             ByVal isActive As Boolean,
                                             ByVal displayMode As Integer) As String
        Dim html As String = ""

        Const VIEW_FULL As Integer = 1
        Const VIEW_OPTIONS As Integer = 2

        Dim ds As dsPortfolio = loadPortfolioItems(projectId, isActive)

        If displayMode = VIEW_FULL Then
            html = getPortfolioItemFull(ds.Portfolio)
        ElseIf displayMode = VIEW_OPTIONS Then
            html = getPortfolioItemsAsOptions(ds.Portfolio)
        End If

        Return html
    End Function

    Private Function getPortfolioItemFull(ByVal items As dsPortfolio.PortfolioDataTable) As String
        Dim html As New StringBuilder

        Try
            Dim tmpl As String = File.ReadAllText(Server.MapPath("~/templates/project.html"))
            Dim util As New SI_UTIL

            For i As Integer = 0 To items.Rows.Count - 1
                Dim row As dsPortfolio.PortfolioRow = items.Rows(i)
                Dim item As String = util.getTmplItem(tmpl)

                Dim url As String = row.Item("url")
                Dim theLink As String = url
                If row.Item("isHTTPS") = True Then
                    theLink = "https://" & theLink
                Else
                    theLink = "http://" & theLink
                End If

                Dim blogUrl As String = IIf(IsDBNull(row.Item("blogUrl")), "", row.Item("blogUrl"))
                Dim theBlogUrl As String = ""

                If blogUrl Is Nothing Or blogUrl = "" Then
                    blogUrl = ""
                Else
                    theBlogUrl = blogUrl
                    blogUrl = "<a href=""/news/" & blogUrl & """>Project Details</a>&nbsp;&nbsp;//&nbsp;&nbsp;"
                End If

                Dim img As String = row.Item("primaryPic")
                If Not Session("webP") Is Nothing AndAlso Session("webP") = False AndAlso img.ToLower.IndexOf(".webp") > 0 Then
                    img = img.Replace(".webp", ".jpg")
                End If

                item = item.Replace("{{name}}", row.Item("name"))
                item = item.Replace("{{primaryPic}}", img)
                item = item.Replace("{{theLink}}", theLink)
                item = item.Replace("{{url}}", "View Site")
                item = item.Replace("{{summary}}", row.Item("summary"))
                item = item.Replace("{{blogUrl}}", blogUrl)
                item = item.Replace("{{theBlogUrl}}", theBlogUrl)

                If i = 0 Then 'Or i Mod 4 = 0 Then
                    'html.Append("<div class=""row cols-3-2"">")
                End If

                html.Append(item)

                'If (i + 1) Mod 4 = 0 Or i + 1 = items.Rows.Count Then
                '    html.Append("</div>")
                'End If

                If i + 1 = items.Rows.Count Then
                    'html.Append("</div>")
                End If
            Next

        Catch ex As Exception
            html.Clear.Append(ex.ToString)
        End Try

        Return html.ToString
    End Function

    Private Function getPortfolioItemsAsOptions(ByVal items As dsPortfolio.PortfolioDataTable) As String
        Dim html As New StringBuilder

        Try
            html.Append("<option value=""-1"">-- Select a Project --</option>")

            For i As Integer = 0 To items.Rows.Count - 1
                Dim row As dsPortfolio.PortfolioRow = items.Rows(i)
                html.Append("<option value=""" & row.Item("projectId") & """>" & row.Item("name") & "</option>")
            Next
        Catch ex As Exception
            html.Clear.Append("<option value=""-1"">Unable to Load Projects</option>")
        End Try

        Return html.ToString
    End Function

    <WebMethod()> _
    Public Function deleteProject(ByVal projectId As Integer) As String
        Dim rsp As String = ""

        Try
            Dim ta As New dsPortfolioTableAdapters.PortfolioTableAdapter
            ta.Delete(projectId)
            rsp = "{""status"":""success""}"
        Catch ex As Exception
            rsp = "{""status"":""error"",""msg"":""" & ex.ToString() & """}"
        End Try

        Return rsp
    End Function

End Class