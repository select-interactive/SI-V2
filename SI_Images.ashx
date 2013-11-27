<%@ WebHandler Language="VB" Class="SI_Images" %>

Imports System
Imports System.Web
Imports System.Web.SessionState

Public Class SI_Images : Implements IHttpHandler, IReadOnlySessionState
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Dim theFile As String = HttpContext.Current.Request.QueryString("file").ToLower
        Dim fallbackType As String = HttpContext.Current.Request.QueryString("fallback")
        
        Dim contentType As String = ""
        
        If theFile.IndexOf(".webp") > 0 Then
            contentType = "image/webp"
        ElseIf theFile.IndexOf(".jpg") > 0 Then
            contentType = "image/jpeg"
        ElseIf theFile.IndexOf(".png") > 0 Then
            contentType = "image/png"
        End If
        
        Dim ctx As HttpContext = HttpContext.Current
        
        If IsNothing(ctx.Session("webP")) Then
            ctx.Session("webP") = False
            
            Dim accept As String = ctx.Request.Headers.Item("Accept")
        
            If accept.ToLower.IndexOf("image/webp") > 0 Then
                ctx.Session("webP") = True
            Else
                ctx.Session("webP") = False
            End If
        End If
        
        If Not ctx.Session("webP") Is Nothing AndAlso ctx.Session("webP") = False And Not fallbackType Is Nothing AndAlso fallbackType.Length > 0 AndAlso theFile.IndexOf(".webp") > 0 Then
            theFile = theFile.Replace(".webp", "." & fallbackType)
            
            If fallbackType = "jpg" Then
                contentType = "image/jpeg"
            Else
                contentType = "image/png"
            End If
        End If
        
        Dim theSrc As String = "http://static.select-interactive.com/img/" & theFile
        
        Dim imgData() As Byte
        Dim wc As New System.Net.WebClient
        imgData = wc.DownloadData(theSrc)
        
        context.Response.Cache.SetCacheability(HttpCacheability.Public)
        context.Response.Cache.SetMaxAge(New TimeSpan(90, 0, 0, 0))
        context.Response.Headers.Remove("X-UA-Compatible")
        context.Response.ContentType = contentType
        context.Response.OutputStream.Write(imgData, 0, imgData.Length)
    End Sub
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class