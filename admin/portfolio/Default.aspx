<%@ Page Title="" Language="VB" MasterPageFile="~/masterpages/admin.master" AutoEventWireup="false" CodeFile="Default.aspx.vb" Inherits="admin_portfolio_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="cphMeta" Runat="Server">
    <title>Manage SI Portfolio Items</title>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="cphHead" Runat="Server">
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="cphContent" Runat="Server">
    <h2 class="headline headline-large">Manage SI Portfolio Items</h2>
    <div class="form form-admin form-full-width">
        <div id="form-option">
            <p>Add a new item or edit/delete existing items.</p>
            <div class="row">
                <label for="ddl-items">Select Item to Edit/Delete:</label>
                <select id="ddl-items"><asp:Literal runat="server" ID="ltrlItem" /></select>
            </div>
            <p>- OR -</p>
            <div class="row">
                <button id="btn-new" class="btn-si-orange btn-massive">Add New Entry</button>
            </div>
        </div>
        <div id="form-project" class="hidden">
            <h3 class="subheading">Project Entry Form</h3>
            <div class="row">
                <label for="tb-name">Project Name:</label>
                <input type="text" id="tb-name" data-field="name" class="req" />
            </div>
            <div class="row">
                <label for="tb-url">Project URL:</label>
                <input type="url" id="tb-url" data-field="url" class="req" />
            </div>
            <div class="row">
                <input type="checkbox" id="cb-is-https" /><label for="cb-is-https" class="lbl-cb">Is HTTPS?</label>
            </div>
            <div class="row">
                <label for="tb-blog">Blog URL:</label>
                <input type="url" id="tb-blog" data-field="blogUrl" />
            </div>
            <div class="row">
                <label for="ta-summary">Summary:</label>
                <textarea id="ta-summary" data-field="summary" class="req"></textarea>
            </div>
            <div class="row">
                <label for="tb-sort-order">Sort Order:</label>
                <input type="number" id="tb-sort-order" data-field="sortOrder" class="req" />
            </div>
            <div class="row">
                <input type="checkbox" id="cb-is-active" /><label for="cb-is-active" class="lbl-cb">Is Active?</label>
            </div>
            <div class="row">
                <button id="btn-project-save" class="btn-si-orange">Save Project</button>
                <button id="btn-project-cancel">Back</button>
                <button id="btn-project-delete" class="btn-red">Delete Project</button>
            </div>
        </div>
        <div id="status" class="stauts"></div>
    </div>
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="cphJS" Runat="Server">
    <script src="/ckeditor/ckeditor.js"></script>
    <script defer src="/js/si/admin.portfolio.v-1.0.js"></script>
</asp:Content>