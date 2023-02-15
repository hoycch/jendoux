<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Menu.ascx.cs" Inherits="JendouxPortal.Menu" %>
<style>
    #SideMenu a
    {
        margin: 8px 0px;
        width: 90%;
    }
</style>
<div style="width: 150px; border: #FFDFAD 1px solid; background: #FFFBD6; text-align: center; padding: 15px 0px;" id="SideMenu">
    <a href="default.aspx" id="default">Home</a>
    <a href="features.aspx" id="features">Features</a>
    <a href="manual.aspx" id="manual">Manual</a>
    <a href="about.aspx" id="about">About</a>
    <a href="news.aspx" id="news">News</a>
    <a href="investment.aspx" id="investment">Investment</a>
    <a href="http://app.jendoux.com" id="app" target="_blank">App</a>
</div>
<script>
    $("#SideMenu a").button();
</script>
<%
    string NavigatePage = System.IO.Path.GetFileNameWithoutExtension(Request.AppRelativeCurrentExecutionFilePath);
    Response.Write(string.Format("<script>$('#SideMenu #{0}').addClass('ui-state-highlight')</script>", NavigatePage.ToLower()));
%>