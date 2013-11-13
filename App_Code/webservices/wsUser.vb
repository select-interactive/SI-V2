Imports System.Web
Imports System.Web.Services
Imports System.Web.Services.Protocols

<System.Web.Script.Services.ScriptService()> _
<WebService(Namespace:="http://tempuri.org/")> _
<WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)> _
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Public Class wsUser
    Inherits System.Web.Services.WebService

#Region "Login/Logout"

    ' Login
    <WebMethod()> _
    Public Function userLogin(ByVal username As String, ByVal password As String, ByVal remember As Boolean) As String
        Try
            If Membership.ValidateUser(username, password) Then
                Dim mu As MembershipUser = Membership.GetUser(username)
                FormsAuthentication.SetAuthCookie(username, remember)
            Else
                Return "Login failed. Please try again."
            End If
        Catch ex As Exception
            Return ex.ToString()
        End Try

        Return "success"
    End Function

    ' Logout
    <WebMethod()> _
    Public Function userLogout() As String
        Try
            FormsAuthentication.SignOut()
        Catch ex As Exception
            Return ex.ToString()
        End Try

        Return "success"
    End Function

#End Region

End Class