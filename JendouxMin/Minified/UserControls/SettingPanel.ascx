<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="SettingPanel.ascx.cs" Inherits="JendouxFree.UserControls.SettingPanel" EnableViewState="false" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>

<%@ Register Src="~/UserControls/SettingPanelRow.ascx" TagPrefix="uc1" TagName="SettingPanelRow" %>



<%@ Import Namespace="JendouxFree.FunctionCode" %>
<div id="settingPanel" style='position: fixed; left: <%=GetCookieSetIfNull("SettingX", "500px") %>; top: <%=GetCookieSetIfNull("SettingY", "40px") %>; background-color: white; color: black; border: 2px solid grey; padding: 5px; width: 400px; font-size: 15px; display: none; z-index: 98;'>
    <div id="settingDragHandle" style="width: 100%; cursor: move; font-size: 15px"><%=GetLocalResourceObject("Settings") %></div>
    <div id="settingPanelAccordion">
        <h3><%=GetLocalResourceObject("SpeedCol")%></h3>
        <div>
            <uc1:SettingPanelRow runat="server" ID="PagePlaySpeed" Max="10" Min="0.5" Step="0.5" Value='<%#GetCookieSetIfNull("PagePlaySpeed", SettingDefaultValues.PagePlaySpeed) %>' />
            <uc1:SettingPanelRow runat="server" ID="FlashSpeed" Max="100" Min="1" Step="1" Value='<%#GetCookieSetIfNull("FlashSpeed", GetLocalResourceObject("FlashSpeedDefault").ToString())%>' />
            <uc1:SettingPanelRow runat="server" ID="SlideSpeed" Max="6" Min="0.2" Step="0.1" Value=<%#GetCookieSetIfNull("SlideSpeed", SettingDefaultValues.SlideSpeed)%> />
            <uc1:SettingPanelRow runat="server" ID="RollSpeed" Max="10" Min="0.2" Step="0.2" Value=<%#GetCookieSetIfNull("RollSpeed", GetLocalResourceObject("RollSpeedDefault").ToString())%>/>
        </div>
        <h3><%=GetLocalResourceObject ("SizeCol") %></h3>
        <div>
            <uc1:SettingPanelRow runat="server" ID="WordNum" Max=<%#GetLocalResourceObject("WordNumMax") %> Min="1" Step=<%# GetLocalResourceObject("WordNumStep") %> Value=<%#GetCookieSetIfNull("WordNum", GetLocalResourceObject("WordNumDefault").ToString())%> />
            <uc1:SettingPanelRow runat="server" ID="RowNum" Max="18" Min="1" Step="1" Value=<%#GetCookieSetIfNull("RowNum", "3")%>/>
            <uc1:SettingPanelRow runat="server" ID="Threshold" Max=<%#GetLocalResourceObject("ThresholdMax") %> Min=<%#GetLocalResourceObject("ThresholdMin") %> Step="5" Value=<%#GetCookieSetIfNull("Threshold", GetLocalResourceObject("ThresholdDefault").ToString())%>/>
        </div>
        <h3><%=GetLocalResourceObject("TextCol") %>
        </h3>
        <div>
            <uc1:SettingPanelRow runat="server" ID="FontSize" Max="30" Min="8" Step="1" Value=<%#GetCookieSetIfNull("FontSize", "16")%>/>
            <div class="SettingPanelRow" id="FontRow">
                <%=GetLocalResourceObject("FontLabel") %>
                <asp:DropDownList runat="server" ID="FontSelector" ClientIDMode="Static" onchange="JendouxScript.F1()" Style="float: right" />
            </div>
            <uc1:SettingPanelRow runat="server" ID="LineHeight" Max="20" Min="0" Step="1" Value=<%#GetCookieSetIfNull("LineHeight", SettingDefaultValues.LineHeight)%>/>
        </div>
        <h3><%= GetLocalResourceObject("EnvironmentCol") %></h3>
        <div>
            <div class="SettingPanelRow" id="ThemeRow">
                <%=GetLocalResourceObject( "ThemeLabel") %>
                <asp:DropDownList runat="server" Style="float: right;" ID="ThemeSelector" ClientIDMode="Static" onchange="JendouxScript.F3(this.value)" />
            </div>
            <div class="SettingPanelRow" id="HighlightRow">
                <%=GetLocalResourceObject("ColorLabel")  %>
                <asp:ImageButton ID="PopupButton" ImageUrl="../Images/cp_button.png" runat="server" OnClientClick="return false;" Style="float: right" />
                <asp:Panel runat="server" ID="ColorDisplay" Style="width: 80px; height: 16px; border: 1px solid #000; margin: 0 3px; display: inline-block; float: right;"></asp:Panel>
                <asp:TextBox runat="server" ID="HighlightColor" Width="45" Style="float: right; opacity: 0;" ClientIDMode="Static" />
                <asp:ColorPickerExtender ID="ColorPickerExtender1" runat="server" TargetControlID="HighlightColor" PopupButtonID="PopupButton" SampleControlID="ColorDisplay" OnClientColorSelectionChanged="JendouxScript.F2"></asp:ColorPickerExtender>
            </div>
            <uc1:SettingPanelRow runat="server" ID="Volume" Max="1" Min="0" Step="0.1" Value=<%#GetCookieSetIfNull("Volume", SettingDefaultValues.Volume)%>/>
        </div>
    </div>
    <button id="settingClose" style="font-size: 10px; float: right;"><%=GetGlobalResourceObject("UserInterface", "Close") %></button>
    <input type="hidden" runat="server" id="DefaultParameters" />
</div>
