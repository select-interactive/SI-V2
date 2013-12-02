Imports Microsoft.VisualBasic

Public Class SI_UTIL

    Public Function getTmplHeading(ByVal tmpl As String) As String
        Dim startIndex As Integer = tmpl.IndexOf("#heading#") + 9
        Dim endIndex As Integer = tmpl.IndexOf("#end heading#")
        Return tmpl.Substring(startIndex, endIndex - startIndex).Trim
    End Function

    Public Function getTmplContainer(ByVal tmpl As String) As String
        Dim startIndex As Integer = tmpl.IndexOf("#container#") + 11
        Dim endIndex As Integer = tmpl.IndexOf("#end container#")
        Return tmpl.Substring(startIndex, endIndex - startIndex).Trim
    End Function

    Public Function getTmplItem(ByVal tmpl As String) As String
        Dim startIndex As Integer = tmpl.IndexOf("#item#") + 6
        Dim endIndex As Integer = tmpl.IndexOf("#end item#")
        Return tmpl.Substring(startIndex, endIndex - startIndex).Trim
    End Function

    Public Function getImg(ByVal theFile As String, ByVal fallbackType As String) As String
        Dim ctx As HttpContext = HttpContext.Current

        ' Check for WebP Support
        Dim webP As Boolean = False
        Dim accept As String = ctx.Request.Headers.Item("Accept")

        If accept.ToLower.Contains("image/webp") Then
            webP = True
        End If

        If webP = False AndAlso theFile.IndexOf(".webp") > 0 Then
            theFile = theFile.Replace(".webp", "." & fallbackType)
        End If

        ' Check for client hint header -- DPI
        Dim chDpr As String = ctx.Request.Headers.Item("CH-DPR")
        If Not chDpr Is Nothing AndAlso chDpr.Length > 0 Then
            Dim dblChDpr As Double = CDbl(chDpr)

            If dblChDpr > 1.3 Then
                Dim tempFile As String = theFile
                Dim ext As String = theFile.Substring(theFile.IndexOf("."))
                theFile = tempFile.Substring(0, tempFile.IndexOf(".")) & "-@2" & ext
            End If
        End If

        Dim theSrc As String = "http://static.select-interactive.com/img/" & theFile

        Return "//static.select-interactive.com/img/" & theFile
    End Function

End Class
