<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="SettingPanelTableRow.ascx.cs" Inherits="JendouxFree.UserControls.SettingPanelTableRow" EnableViewState="false" %>
<div class="SettingPanelRow" id='<%= ControlItem + "Row" %>'>
    <span><%= GetLocalResourceObject(ControlItem+"Label") %></span>
    <div style="width: 30px; float: right">
        <button class="FineAdjustmentButtons" style="font-size: 10px" id='<%=ControlItem + "Plus" %>' >Plus</button>
    </div>
    <div style="width: 30px; float: right;">
        <button class="FineAdjustmentButtons" style="font-size: 10px" id='<%=ControlItem + "Minus" %>'>Minus</button>
    </div>
    <div style="float: right; width: 30px" class="SettingValueDisplay"></div>
</div>

