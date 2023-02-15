<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="SettingPanelRow.ascx.cs" Inherits="JendouxFree.UserControls.SettingPanelRow" %>
<%@ Import Namespace="JendouxFree.FunctionCode" %>
<div class="SettingPanelRow" id='<%= ID + "Row" %>'>
    <span><%= GetLocalResourceObject(ID+"Label") %></span>
    <div style="width: 30px; float: right">
        <button class="FineAdjustmentButtons" style="font-size: 10px" id='<%=ID + "Plus" %>'>Plus</button>
    </div>
    <div style="width: 30px; float: right;">
        <button class="FineAdjustmentButtons" style="font-size: 10px" id='<%=ID+ "Minus" %>'>Minus</button>
    </div>
    <div style="float: right; width: 30px" class="SettingValueDisplay"></div>
</div>
<div style="height: 10px">
    <div id='<%=ID +"Slider"%>' class="SettingSliders" style="font-size: 8px" data-max='<%=Max %>' data-min='<%=Min %>' data-step='<%=Step %>' data-value='<%=Value %>'></div>
</div>