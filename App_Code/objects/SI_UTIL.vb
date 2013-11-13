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

End Class
