Imports System.Web
Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.Net.Mail
Imports System.IO

<System.Web.Script.Services.ScriptService()> _
<WebService(Namespace:="http://tempuri.org/")> _
<WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)> _
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Public Class wsContact
    Inherits System.Web.Services.WebService

    <WebMethod()> _
    Public Function submitContactRequest(ByVal inquiry() As String,
                                         ByVal name As String,
                                         ByVal email As String,
                                         ByVal phone As String,
                                         ByVal message As String) As String
        Dim rsp As String = ""

        Try
            ' Generate the email body contents
            Dim content As String = "<p style=""margin:0 0 10px 0;"">" _
                                  & "Name: " & name & "<br />" _
                                  & "Email: " & email & "<br />" _
                                  & "Phone: " & phone & "<br />" _
                                  & "Inquiry: "

            For i As Integer = 0 To inquiry.Length - 1
                If i > 0 Then
                    content &= ", "
                End If
                content &= inquiry(i)
            Next

            content &= "<br /><br />" _
                    & "Message:<br />" & message _
                    & "</p>" _
                    & "<p style=""font-size:9pt;"">Please do not reply to this email. It was automatically generated for Select Interactive, LLC.</p>"

            ' Get the data and add to the email
            Dim body As String = File.ReadAllText(Server.MapPath("~/emails/contact.html"))
            body = body.Replace("{{msg}}", content)

            ' Setup the email SMTP client
            Dim smtp As New SmtpClient
            Dim authenInfo As New Net.NetworkCredential("azure_50acdae6efeeb5f758ff025f581db3a7@azure.com", "danh5258")
            smtp.UseDefaultCredentials = False
            smtp.Credentials = authenInfo
            smtp.Port = "25"
        smtp.Host = "smtp.sendgrid.net"

            ' Setup the email object
            Dim mm As New MailMessage("""Select Interactive"" <contact@select-interactive.com>", "jeremy@select-interactive.com")
            With mm
                .Body = body
                .IsBodyHtml = True
                .Subject = "Select Interactive Contact Request"
            End With

            ' Send the email
            smtp.Send(mm)

            rsp = "{""status"":""success""}"
        Catch ex As Exception
            rsp = "{""status"":""error"",""msg"":""" & ex.ToString() & """}"
        End Try

        Return rsp
    End Function

End Class
