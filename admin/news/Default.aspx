<%@ Page Title="" Language="VB" MasterPageFile="~/masterpages/admin.master" AutoEventWireup="false" CodeFile="Default.aspx.vb" Inherits="admin_news_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="cphMeta" Runat="Server">
    <title>Manage SI News Entries</title>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="cphHead" Runat="Server">
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="cphContent" Runat="Server">
    <h2 class="headline headline-large">Manage SI News Entries</h2>
    <div class="form form-admin form-full-width">
        <div id="form-option">
            <p>Add a new entry or edit/delete existing entries.</p>
            <div class="row">
                <label for="ddl-entries">Select Entry to Edit/Delete:</label>
                <select id="ddl-entries"><asp:Literal runat="server" ID="ltrlEntries" /></select>
            </div>
            <p>- OR -</p>
            <div class="row">
                <button id="btn-new" class="btn-si-orange btn-massive">Add New Entry</button>
            </div>
        </div>
        <div id="form-news" class="hidden">
            <h3 class="subheading">News Entry Form</h3>
            <div class="row">
                <label for="tb-title">Title:</label>
                <input type="text" id="tb-title" data-field="title" class="req" />
            </div>
            <div class="row">
                <label for="tb-short-title">Short Title:</label>
                <input type="text" id="tb-short-title" data-field="shortTitle" class="req" />
            </div>
            <div class="row">
                <label for="tb-meta-desc">Meta Description:</label>
                <input type="text" id="tb-meta-desc" data-field="metadesc" class="req" />
            </div>
            <div class="row">
                <label for="tb-project-url">Project URL:</label>
                <input type="url" id="tb-project-url" data-field="projectUrl" />
            </div>
            <div class="row">
                <label for="ta-body">Body:</label>
                <textarea id="ta-body" data-field="body" class="req"></textarea>
            </div>
            <div class="row">
                <label for="ta-summary">Summary:</label>
                <textarea id="ta-summary" data-field="summary" class="req"></textarea>
            </div>
            <div class="row">
                <label for="ddl-tags">Tags:</label>
                <select id="ddl-tags" multiple><asp:Literal runat="server" ID="ltrlTags" /></select>
            </div>
            <div class="row">
                <input type="checkbox" id="cb-is-active" /><label for="cb-is-active" class="lbl-cb">Is Active?</label>
            </div>
            <div class="row">
                <button id="btn-entry-save" class="btn-si-orange">Save Entry</button>
                <button id="btn-entry-cancel">Back</button>
                <button id="btn-entry-delete" class="btn-red">Delete Entry</button>
                <button id="btn-entry-preview" class="btn-green">Preview Entry</button>
            </div>
        </div>
        <div id="status" class="stauts"></div>
    </div>
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="cphJS" Runat="Server">
    <script src="/ckeditor/ckeditor.js"></script>
    <script src="/js/libs/moment.v-2.4.0.min.js"></script>
    <script src="/js/libs/select2.min.js"></script>
    <script defer src="/js/si/admin.news.v-1.0.js"></script>
</asp:Content>