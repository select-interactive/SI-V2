<%@ WebHandler Language="VB" Class="login" %>

Imports System
Imports System.Web

Public Class login : Implements IHttpHandler
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Dim username As String = context.Request.Form.Item("username")
        Dim pwd As String = context.Request.Form.Item("password")
        Dim response As String = ""
        
        Try
            If Membership.ValidateUser(username, pwd) Then
                FormsAuthentication.SetAuthCookie(username, True)
                context.Response.Redirect("/admin/")
            Else
                context.Response.Redirect("/login/?lgnfail")
            End If
        Catch ex As Exception
            'context.Response.Redirect("/?error")
        End Try
                
        context.Response.ContentType = "text/plain"
        context.Response.Write(response)
    End Sub
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class