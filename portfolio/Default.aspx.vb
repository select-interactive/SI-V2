
Partial Class portfolio_Default
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As EventArgs) Handles MyBase.Load
        Load_Portfolio()
    End Sub

    Private Sub Load_Portfolio()
        ltrlPortfolio.Text = (New wsPortfolio).loadPortfolioItemsAsHtml(-1, True, 1)
    End Sub

End Class
