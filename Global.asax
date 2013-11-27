<%@ Application Language="VB" %>

<script runat="server">

    Sub Application_Start(ByVal sender As Object, ByVal e As EventArgs)
        ' Code that runs on application startup
        RegisterRoutes(System.Web.Routing.RouteTable.Routes)
    End Sub
    
    Sub RegisterRoutes(ByVal routes As System.Web.Routing.RouteCollection)
        routes.Add("newsWebUrlRoute", New System.Web.Routing.Route("news/{year}/{month}/{webUrl}", New CustomRouteHandler("~/news/default.aspx")))
        routes.Add("newsTagRoute", New System.Web.Routing.Route("news/tag/{tagUrl}", New CustomRouteHandler("~/news/default.aspx")))
    End Sub
    
    Sub Application_End(ByVal sender As Object, ByVal e As EventArgs)
        ' Code that runs on application shutdown
    End Sub
        
    Sub Application_Error(ByVal sender As Object, ByVal e As EventArgs)
        ' Code that runs when an unhandled error occurs
    End Sub

    Sub Session_Start(ByVal sender As Object, ByVal e As EventArgs)

    End Sub

    Sub Session_End(ByVal sender As Object, ByVal e As EventArgs)
        ' Code that runs when a session ends. 
        ' Note: The Session_End event is raised only when the sessionstate mode
        ' is set to InProc in the Web.config file. If session mode is set to StateServer 
        ' or SQLServer, the event is not raised.
    End Sub
    
    Sub Application_PreRequestHandlerExecute()
        
    End Sub
       
</script>