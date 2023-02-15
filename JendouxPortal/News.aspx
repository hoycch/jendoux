<%@ Page Title="" Language="C#" MasterPageFile="~/PublicMaster.Master" AutoEventWireup="true" CodeBehind="News.aspx.cs" Inherits="JendouxPortal.News" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Main" runat="server">
        <style>
        #AllNews td {
            padding: 5px;
        }

        #AllNews td:first-of-type {
            text-align:right;
        }
        iframe {
            margin:10px;
        }
    </style>
</asp:Content>
