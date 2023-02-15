<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="MenuStrip.ascx.cs" Inherits="JendouxFree.UserControls.MenuStrip" %>
<div id="menuBar" style="height: 30px; position: fixed; left: 1em; margin: 5px; padding: 10px 10px 2px 10px; z-index: 1000; top: 0;" class="ui-state-highlight">
    <a href="http://www.jendoux.com">
        <img src="Images/logo.png" alt="Jendoux Logo" style="float: left; margin-right: 10px;" /></a>
    <input type="text" id="QueryTextBox" style="width: 40ex; float: left;" class="ShowTip" />


    <div style="float: left; margin-left: 10px;">
        <style>
            .MSB
            {
                font-size: 10px;
                vertical-align: top;
            }
        </style>
        <button id="MSB_Search" class="MSB"><%= GetLocalResourceObject("Search") %></button>
        <div style="display: inline-block">
            <button id="MSB_Mode" class="MSB"><%=GetLocalResourceObject("Mode") %></button>
            <br />
            <div class="MSB" id="MSB_ModeOptions" style="display: none;">
                <button id="MSB_FlashMode" data-m="1"><%=GetLocalResourceObject("FlashMode") %></button><br />
                <button id="MSB_SlideMode" data-m="2"><%=GetLocalResourceObject("SlideMode") %></button><br />
                <button id="MSB_RollMode" data-m="3"><%=GetLocalResourceObject("RollMode") %></button><br />
                <button id="MSB_TextMode" data-m="0"><%=GetLocalResourceObject("TextMode") %></button>
            </div>
        </div>
        <button id="MSB_DropText" class="MSB"><%= GetLocalResourceObject("DropText")%></button>
        <button id="MSB_Settings" class="MSB"><%= GetLocalResourceObject("Settings") %></button>

    </div>


</div>
