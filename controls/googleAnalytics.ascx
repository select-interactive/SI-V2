﻿<%@ Control Language="VB" AutoEventWireup="false" CodeFile="googleAnalytics.ascx.vb" Inherits="controls_googleAnalytics" %>
    <script type="text/javascript">
        var _gaq = _gaq || [];
        _gaq.push(['_setDomainName', 'none']);
        _gaq.push(['_setAccount', 'UA-28490429-1']);
        _gaq.push(['_trackPageview']);

        (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
    </script>