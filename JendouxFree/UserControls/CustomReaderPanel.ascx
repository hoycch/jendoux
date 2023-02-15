<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="CustomReaderPanel.ascx.cs" Inherits="JendouxFree.UserControls.CustomReaderPanel" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<div id="CustomReaderPanel" style="position: fixed; top: 15%; left: 20%; background-color: hsla(0, 0%, 0%, 0.8); display: none; z-index:99; cursor: move; min-width:350px;" class="ui-corner-all">
    <div id="CustomReaderHandle" style="display: block; cursor: move;"><%=GetLocalResourceObject("title") %></div>
    <div style="text-align: center;">
        <asp:TextBox runat="server" ID="CustomTextInsert" Rows="5"  Style="margin: 1.5em 0; width:80%; display:inline-block;" ClientIDMode="Static" TextMode="MultiLine" />
    </div>
    <asp:TextBoxWatermarkExtender ID="TextBoxWatermarkExtender1" runat="server" TargetControlID="CustomTextInsert" WatermarkText='<%$ Resources: instruction %>' WatermarkCssClass="watermarked"></asp:TextBoxWatermarkExtender>
    <div style="text-align: right;">
        <button id="GenerateCustomReader" style="font-size: 10px;"><%=GetLocalResourceObject("Generate") %></button>
    </div>
    <div id="CustomReaderContainer">
        <div id="CustomReaderNode" style="display: inline-block; margin: 2em 0 0 0; cursor:default;"></div>
    </div>
    <button id="customReaderClose" style="font-size: 10px; float: right;"><%= GetGlobalResourceObject("UserInterface", "Close") %></button>
</div>
