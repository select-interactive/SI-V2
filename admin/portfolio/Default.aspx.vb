
Partial Class admin_portfolio_Default
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As EventArgs) Handles MyBase.Load
        ltrlItem.Text = (New wsPortfolio).loadPortfolioItemsAsHtml(-1, False, 2)
    End Sub

End Class
