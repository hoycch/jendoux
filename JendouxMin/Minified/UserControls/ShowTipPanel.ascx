<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ShowTipPanel.ascx.cs" Inherits="JendouxFree.UserControls.ShowTipPanel" %>
<div id="ShowTipPanel" style="width: 450px; position: fixed; top: 0; right: 0; z-index: 90; padding: 15px; margin: 15px; display: none; cursor: move" class="ui-widget-content ui-corner-bottom">
    <button style="font-size: 8px; float: right;"><%=GetGlobalResourceObject("UserInterface", "Close") %></button>
    <div id="MessageContent"></div>
</div>
