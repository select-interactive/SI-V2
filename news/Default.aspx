﻿<%@ Page Title="" Language="VB" MasterPageFile="~/masterpages/dynamicHead.master" AutoEventWireup="false" CodeFile="Default.aspx.vb" Inherits="news_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="cphMeta" Runat="Server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="cphHead" Runat="Server">
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="cphContent" Runat="Server">
    <div id="entries"><asp:Literal runat="server" ID="ltrlNews" /></div>
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="cphJS" Runat="Server">
    <asp:Literal runat="server" ID="ltrlJS" />
    <script defer src="/js/si/news.v-1.0.js"></script>
</asp:Content>