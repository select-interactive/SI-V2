<%@ Page Title="" Language="VB" MasterPageFile="~/masterpages/dynamicHead.master" AutoEventWireup="false" CodeFile="Default.aspx.vb" Inherits="portfolio_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="cphMeta" Runat="Server">
    <title>Website Design and Development Projects from Select Interactive</title>
    <meta name="description" content="View a number of our website design and development projects featuring a number of responsive web design and custom content management projects.">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="cphHead" Runat="Server">
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="cphContent" Runat="Server">
    <h2 class="headline headline-large">A Sampling of Our Work</h2>
    <asp:Literal runat="server" ID="ltrlPortfolio" />
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="cphJS" Runat="Server">
    <script defer src="/js/si/portfolio.v-1.0.js"></script>
</asp:Content>