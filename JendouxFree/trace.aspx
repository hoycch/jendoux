<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="trace.aspx.cs" Inherits="JendouxFree.trace" %>
<%@ Import Namespace="JendouxFree.FunctionCode" %>
<%@ Register Src="~/UserControls/SettingPanel.ascx" TagPrefix="uc1" TagName="SettingPanel" %>
<%@ Register Src="~/UserControls/CustomReaderPanel.ascx" TagPrefix="uc1" TagName="CustomReaderPanel" %>
<%@ Register Src="~/UserControls/MenuStrip.ascx" TagPrefix="uc1" TagName="MenuStrip" %>
<%@ Register Src="~/UserControls/FirstPage.ascx" TagPrefix="uc1" TagName="FirstPage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title><%= "Title" %></title>
    <link href="Images/favicon.png" rel="icon" type="image/png" />
    <script src="MyScripts/jqueryAll.js"></script>
</head>
<body>
    <form id="form1" runat="server">
    <link rel="stylesheet" href='themes/<%= ProfileMethods.GetCookieValue("Theme", "sunny") %>/jquery-ui.min.css' id="jQueryTheme" />

        <link href="Stylesheets/Control.css" rel="stylesheet" />
        <asp:ScriptManager ID="ScriptManager1" runat="server" EnableHistory="true" ScriptMode="Release" EnableCdn="true" EnableScriptLocalization="true">
            <Services>
                <asp:ServiceReference Path="JendouxWebService.asmx" />
            </Services>
            <CompositeScript>
                <Scripts>
                    <asp:ScriptReference Name="MicrosoftAjax.js" />
                    <asp:ScriptReference Name="MicrosoftAjaxWebForms.js" />
                    <asp:ScriptReference Name="MicrosoftAjaxApplicationServices.js" />
                    <asp:ScriptReference Name="Compat.Timer.Timer.js" Assembly="AjaxControlToolkit, Version=4.5.7.607, Culture=neutral, PublicKeyToken=28f01b0e84b6d53e" />
                    <asp:ScriptReference Name="Common.Common.js" Assembly="AjaxControlToolkit, Version=4.5.7.607, Culture=neutral, PublicKeyToken=28f01b0e84b6d53e" />
                    <asp:ScriptReference Name="ExtenderBase.BaseScripts.js" Assembly="AjaxControlToolkit, Version=4.5.7.607, Culture=neutral, PublicKeyToken=28f01b0e84b6d53e" />
                    <asp:ScriptReference Name="Animation.Animations.js" Assembly="AjaxControlToolkit, Version=4.5.7.607, Culture=neutral, PublicKeyToken=28f01b0e84b6d53e" />
                    <asp:ScriptReference Name="Animation.AnimationBehavior.js" Assembly="AjaxControlToolkit, Version=4.5.7.607, Culture=neutral, PublicKeyToken=28f01b0e84b6d53e" />
                    <asp:ScriptReference Name="PopupExtender.PopupBehavior.js" Assembly="AjaxControlToolkit, Version=4.5.7.607, Culture=neutral, PublicKeyToken=28f01b0e84b6d53e" />
                    <asp:ScriptReference Name="Common.Threading.js" Assembly="AjaxControlToolkit, Version=4.5.7.607, Culture=neutral, PublicKeyToken=28f01b0e84b6d53e" />
                    <asp:ScriptReference Name="ColorPicker.ColorPickerBehavior.js" Assembly="AjaxControlToolkit, Version=4.5.7.607, Culture=neutral, PublicKeyToken=28f01b0e84b6d53e" />
                    <asp:ScriptReference Name="TextboxWatermark.TextboxWatermark.js" Assembly="AjaxControlToolkit, Version=4.5.7.607, Culture=neutral, PublicKeyToken=28f01b0e84b6d53e" />
                </Scripts>
            </CompositeScript>
        </asp:ScriptManager>
        <div style="height: 40px; width: 100%"></div>
        <div id="ReadingPage" runat="server" enableviewstate="false">
            <uc1:FirstPage runat="server" ID="FirstPage" />
        </div>
        <uc1:SettingPanel runat="server" ID="SettingPanel" />
        <uc1:CustomReaderPanel runat="server" ID="CustomReaderPanel" />
        <div id="LoadingGif" style="display: none; position: fixed; top: 50%; left: 42%; text-align: center; background: rgba(0,30,30,.5); padding: 20px; width: 150px;">
            <img src="Images/ajax-loader.gif" style="align-self: center" /><br />
            <div style="color: yellow; text-align: left;"><%="WaitMessage" %></div>

        </div>
        <uc1:MenuStrip runat="server" ID="MenuStrip" />
        <div id="ShowTipPanel" style="width: 450px; position: fixed; top: 0; right: 0; z-index: 90; padding: 15px; margin: 15px; display: none; cursor: move" class="ui-widget-content ui-corner-bottom">
            <button style="font-size: 8px; float: right;"><%=GetGlobalResourceObject("UserInterface", "Close") %></button>
            <div id="MessageContent"></div>
        </div>

        <asp:Literal ID="JavascriptResources" runat="server" EnableViewState="false" />

        <audio src="Images/open.mp3" id="SlideOpenSound"></audio>
        <audio src="Images/close.mp3" id="SlideCloseSound"></audio>
        <audio src="Images/pane.mp3" id="SlidePaneSound"></audio>

        <audio src="Images/flash.mp3" id="FlashPlaySound"></audio>
        <audio src="Images/slide.mp3" id="SlidePlaySound"></audio>
        <audio src="Images/play.mp3" id="PlaySound"></audio>
        <audio src="Images/stop.mp3" id="StopSound"></audio>

        <audio src="Images/doc.mp3" id="DocOutSound"></audio>
        <audio src="Images/loading.mp3" id="LoadingSound" loop="loop"></audio>
        <audio src="Images/DropText.mp3" id="DropTextSound"></audio>
        <button style="position: fixed; bottom: 10px; right: 10px; font-size: 9px; opacity: .1;" id="BackToTop"><%= GetGlobalResourceObject("UserInterface", "TopButton") %></button>
        <%--StartMyScript--%>
        <script src="MyScripts/ApplicationConstants.js"></script>
        <script src="MyScripts/jQueryExtension.js"></script>
        <script src="MyScripts/SettingsPanelFunctions.js"></script>
        <script src="MyScripts/CustomReaderFunctions.js"></script>
        <script src="MyScripts/UIBehavior.js"></script>
        <script src="MyScripts/BindEvents.js"></script>
        <script src="MyScripts/MenuStripFunctions.js"></script>
        <script src="MyScripts/PageHistoryManager.js"></script>
        <script src="MyScripts/TextPlayerManager.js"></script>
        <script src="MyScripts/TextPlayerDimensions.js"></script>
        <script src="MyScripts/TextPlayerBase.js"></script>
        <script src="MyScripts/TextPlayerFlash.js"></script>
        <script src="MyScripts/TextPlayerSlide.js"></script>
        <script src="MyScripts/TextPlayerInterface.js"></script>
        <script src="MyScripts/DefaultJendouxCapture.js"></script>
        <script src="MyScripts/OnReady.js"></script>
    </form>
</body>
</html>
