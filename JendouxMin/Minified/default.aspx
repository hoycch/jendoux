<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="JendouxFree.Default" %>

<%@ Import Namespace="JendouxFree.FunctionCode" %>
<%@ Register Src="~/UserControls/SettingPanel.ascx" TagPrefix="uc1" TagName="SettingPanel" %>
<%@ Register Src="~/UserControls/CustomReaderPanel.ascx" TagPrefix="uc1" TagName="CustomReaderPanel" %>
<%@ Register Src="~/UserControls/MenuStrip.ascx" TagPrefix="uc1" TagName="MenuStrip" %>
<%@ Register Src="~/UserControls/FirstPage.ascx" TagPrefix="uc1" TagName="FirstPage" %>
<%@ Register Src="~/UserControls/ShowTipPanel.ascx" TagPrefix="uc1" TagName="ShowTipPanel" %>
<%@ Register Src="~/UserControls/FacebookTab.ascx" TagPrefix="uc1" TagName="FacebookTab" %>



<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" xmlns:fb="http://ogp.me/ns/fb#">
<head runat="server">
    <title><%= GetLocalResourceObject("Title") %></title>
    <link href="Images/favicon.png" rel="icon" type="image/png" />
    
</head>
<body>
    <form id="form1" runat="server">

        <link rel="stylesheet" href='themes/<%= ((DropDownList)settingPanel.FindControl("ThemeSelector")).SelectedItem.Value %>/jquery-ui.min.css' id="jQueryTheme" />

        <link href="Stylesheets/Control.css" rel="stylesheet" />
        <asp:ScriptManager ID="ScriptManager1" runat="server" EnableHistory="false" ScriptMode="Release" EnableCdn="true" EnableScriptLocalization="true">
            <Services>
                <asp:ServiceReference Path="JendouxWebService.asmx" />
            </Services>
            <CompositeScript>
                <Scripts>

                    <asp:ScriptReference Name="MicrosoftAjax.js" />
                    <asp:ScriptReference Name="MicrosoftAjaxWebForms.js" />
                    <asp:ScriptReference Name="Common.Common.js" Assembly="AjaxControlToolkit, Version=4.5.7.607, Culture=neutral, PublicKeyToken=28f01b0e84b6d53e" />
                    <asp:ScriptReference Name="Compat.Timer.Timer.js" Assembly="AjaxControlToolkit, Version=4.5.7.607, Culture=neutral, PublicKeyToken=28f01b0e84b6d53e" />
                    <asp:ScriptReference Name="Animation.Animations.js" Assembly="AjaxControlToolkit, Version=4.5.7.607, Culture=neutral, PublicKeyToken=28f01b0e84b6d53e" />
                    <asp:ScriptReference Name="ExtenderBase.BaseScripts.js" Assembly="AjaxControlToolkit, Version=4.5.7.607, Culture=neutral, PublicKeyToken=28f01b0e84b6d53e" />
                    <asp:ScriptReference Name="Animation.AnimationBehavior.js" Assembly="AjaxControlToolkit, Version=4.5.7.607, Culture=neutral, PublicKeyToken=28f01b0e84b6d53e" />
                    <asp:ScriptReference Name="PopupExtender.PopupBehavior.js" Assembly="AjaxControlToolkit, Version=4.5.7.607, Culture=neutral, PublicKeyToken=28f01b0e84b6d53e" />
                    <asp:ScriptReference Name="Common.Threading.js" Assembly="AjaxControlToolkit, Version=4.5.7.607, Culture=neutral, PublicKeyToken=28f01b0e84b6d53e" />
                    <asp:ScriptReference Name="ColorPicker.ColorPickerBehavior.js" Assembly="AjaxControlToolkit, Version=4.5.7.607, Culture=neutral, PublicKeyToken=28f01b0e84b6d53e" />
                    <asp:ScriptReference Name="TextboxWatermark.TextboxWatermark.js" Assembly="AjaxControlToolkit, Version=4.5.7.607, Culture=neutral, PublicKeyToken=28f01b0e84b6d53e" />
                </Scripts>
            </CompositeScript>
        </asp:ScriptManager>
        <div style="height: 40px; width: 100%"></div>
        <div id="ReadingPage" runat="server" enableviewstate="false" style="position: relative;">
            <uc1:FirstPage runat="server" ID="FirstPage" />

        </div>
        <uc1:SettingPanel runat="server" ID="settingPanel" />
        <uc1:CustomReaderPanel runat="server" ID="CustomReaderPanel" />
        <ul id="HyperlinkMenu" style="position: relative; font-size: 12px; display: none;">
            <li><%=GetLocalResourceObject("JendouxBrowseHere") %></li>
            <li style="margin-bottom: 8px;"><%=GetLocalResourceObject("JendouxBrowseNewTab") %></li>
            <li><%=GetLocalResourceObject("DirectBrowse") %></li>
            <li style="margin-bottom: 8px;"><%=GetLocalResourceObject("DirectNewTab") %></li>
            <li id="zclip" data-zclip-text=""><%=GetLocalResourceObject("CopyDirectLink") %></li>
        </ul>
        <div id="LoadingGif" style="display: none; position: fixed; top: 50%; left: 42%; text-align: center; background: rgba(0,30,30,.5); padding: 20px; width: 150px;">
            <img src="Images/ajax-loader.gif" style="align-self: center" /><br />
            <div style="color: yellow; text-align: left;"><%=GetLocalResourceObject("WaitMessage") %></div>

        </div>

        <uc1:MenuStrip runat="server" ID="MenuStrip" />
        <uc1:ShowTipPanel runat="server" ID="ShowTipPanel" />
        <uc1:FacebookTab runat="server" ID="FacebookTab" />

        <asp:Literal ID="JavascriptResources" runat="server" EnableViewState="false" />

        <audio src="Images/open.mp3" id="SlideOpenSound"></audio>
        <audio src="Images/close.mp3" id="SlideCloseSound"></audio>
        <audio src="Images/pane.mp3" id="SlidePaneSound"></audio>

        <audio src="Images/flash.mp3" id="FlashPlaySound"></audio>
        <audio src="Images/slide.mp3" id="SlidePlaySound"></audio>
        <audio src="Images/roll.mp3" id="RollPlaySound"></audio>
        <audio src="Images/play.mp3" id="PlaySound"></audio>
        <audio src="Images/stop.mp3" id="StopSound"></audio>

        <audio src="Images/doc.mp3" id="DocOutSound"></audio>
        <audio src="Images/loading.mp3" id="LoadingSound" loop="loop"></audio>
        <audio src="Images/DropText.mp3" id="DropTextSound"></audio>
        <div id="PageMenu" style="display: inline-block; position: fixed; top: 0; left: 0; visibility: hidden">
            <button id="PagePlay"><%= GetLocalResourceObject("PagePlayButton") %></button>
            <button id="PageStop" style="display: none;"><%=GetLocalResourceObject("PageStopButton") %></button>
            <label for="PagePlay" id="PagePlaySpeedLabel"></label>
            <br />
            <button id="BackToTop"><%= GetLocalResourceObject("TopButton") %></button>
            <br />
            <button id="ReturnLastPosition" style="display: none;"><%= GetLocalResourceObject("ReturnPosition") %></button>
        </div>

        <script>
            var JendouxCapture;
        </script>
        <script src="201411210759.js"></script>
    </form>

    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
        <div style="margin:1em;">Support Jendoux Project</div>
        <input type="hidden" name="cmd" value="_donations">
        <input type="hidden" name="business" value="jkerchek@gmail.com">
        <input type="hidden" name="lc" value="US">
        <input type="hidden" name="item_name" value="Jendoux">
        <input type="hidden" name="no_note" value="0">
        <input type="hidden" name="currency_code" value="HKD">
        <input type="hidden" name="bn" value="PP-DonationsBF:btn_donateCC_LG.gif:NonHostedGuest">
        <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" style="margin:1em;">
        <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
    </form>
</body>
</html>
