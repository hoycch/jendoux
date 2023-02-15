<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="SampleArticle.ascx.cs" Inherits="JendouxFree.UserControls.SampleArticle" %>
<div id="JendouxPageWrapper" style="border:solid; margin:1em; padding:1em; display:inline-block;" data-title='<%=GetGlobalResourceObject("UserInterface", "Title") %>'>
    <h2>Today's Reading</h2>
    <%= System.IO.File.ReadAllText(Server.MapPath("WikiContent.xml")) %>
</div>