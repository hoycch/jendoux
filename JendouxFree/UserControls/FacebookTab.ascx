<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="FacebookTab.ascx.cs" Inherits="JendouxFree.UserControls.FacebookTab" %>
<div id="FacebookComment" style="position: fixed; width: 520px; right: 0px; top: 100px;" class="ui-state-highlight">
    <div id="FacebookHandle" style="position:absolute;">
        <button id="FacebookSlideButton" style="transform:rotate(90deg); font-size:12px;" title="<%=GetLocalResourceObject("Reminder") %>"><%=GetLocalResourceObject("Comment") %></button>
    </div>
    <h3 style="color: brown; padding-left:18px"><%=GetLocalResourceObject("PleaseComment") %></h3>
    <div class="fb-comments" data-href="http://app.jendoux.com" data-width="500" data-numposts="5" data-colorscheme="light"></div>
    <div id="fb-root"></div>
    <script><%--facebook--%></script>
</div>
