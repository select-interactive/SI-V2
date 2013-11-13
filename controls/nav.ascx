<%@ Control Language="VB" AutoEventWireup="false" CodeFile="nav.ascx.vb" Inherits="controls_nav" %>
<nav id="nav-main" role="navigation">
    <ul>
        <li><a href="/about/">About Us</a></li>
        <li><a href="/services/">What We Do</a></li>
        <li><a href="/portfolio/">Our Portfolio</a></li>
        <li><a href="/news/">News</a></li>
        <li><a href="/contact/">Contact Us</a></li>
        <li runat="server" id="liLogout"><a href="#" class="logout">Logout</a></li>
    </ul>
</nav>