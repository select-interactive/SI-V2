﻿Imports Microsoft.VisualBasic
Imports System.Web.Compilation
Imports System.Web.UI
Imports System.Web
Imports System.Web.Routing

Public Class CustomRouteHandler : Implements IRouteHandler
    Public Property VirtualPath As String

    Public Sub New(ByVal virtualPath As String)
        Me.VirtualPath = virtualPath
    End Sub

    Public Function GetHttpHandler(requestContext As System.Web.Routing.RequestContext) As System.Web.IHttpHandler Implements System.Web.Routing.IRouteHandler.GetHttpHandler
        Dim qs As String = ""

        Dim webUrl As String = requestContext.RouteData.Values("webUrl")
        Dim year As String = requestContext.RouteData.Values("year")
        Dim month As String = requestContext.RouteData.Values("month")
        Dim tag As String = requestContext.RouteData.Values("tagUrl")

        If Not webUrl Is Nothing AndAlso webUrl.Length > 0 AndAlso Not year Is Nothing AndAlso year.Length > 0 AndAlso Not month Is Nothing AndAlso month.Length > 0 Then
            qs = "?webUrl=" & year & "/" & month & "/" & webUrl
        ElseIf Not year Is Nothing AndAlso year.Length > 0 AndAlso Not month Is Nothing AndAlso month.Length > 0 Then
            qs = "?year=" & year & "&month=" & month
        ElseIf Not year Is Nothing AndAlso year.Length > 0 Then
            qs = "?year=" & year
        ElseIf Not tag Is Nothing AndAlso tag.Length > 0 Then
            qs = "?tagUrl=" & tag
        End If

        HttpContext.Current.RewritePath(String.Concat(VirtualPath, qs))
        Dim page As IHttpHandler = BuildManager.CreateInstanceFromVirtualPath(VirtualPath, GetType(Page))
        Return page
    End Function
End Class
