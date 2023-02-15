<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ViewLast10Query.aspx.cs" Inherits="JendouxFree.ViewLast10Query" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:GridView ID="GridView1" runat="server" AllowPaging="true" OnPageIndexChanging="GridView1_PageIndexChanging"></asp:GridView>
        <asp:GridView ID="GridView2" AllowPaging="true" OnPageIndexChanging="GridView2_PageIndexChanging" runat="server"></asp:GridView>
        <asp:GridView ID="GridView3" AllowPaging="true" OnPageIndexChanging="GridView3_PageIndexChanging" runat="server"></asp:GridView>
    </div>
    </form>
</body>
</html>
