<%@ Page Title="" Language="C#" MasterPageFile="~/PublicMaster.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="JendouxPortal.Default" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
    &#x25b6;&#x25a0; Welcome to Jendoux
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Main" runat="server">
        <style>
        #MainContent p, #MainContent ul {
            text-align: left;
        }

        #MainContent li {
            margin: 10px;
        }
    </style>
    <div style="text-align: center;">
        <h2>What is Jendoux?</h2>

        <iframe width="560" height="315" src="//www.youtube.com/embed/m51t1Zrj3Tc" frameborder="0" allowfullscreen></iframe>

        <p>
            Jendoux is a web application designed for non-handheld devices that helps you speed-read webpages.
        </p>
        <hr />
        <h2>Why do I need Jendoux?</h2>
        <iframe width="560" height="315" src="//www.youtube.com/embed/f7F9D2m3UGM" frameborder="0" allowfullscreen></iframe>
        <ul>
            <li>Jendoux creates friendly and tidy page layouts.</li>
            <li>Jendoux helps you focus on reading.</li>
            <li>Jendoux speeds up your reading.</li>
            <li>Jendoux lower your eyes&#8217; workload.</li>
        </ul>
        <hr />
        <h2>How to use Jendoux?</h2>
        <iframe width="560" height="315" src="//www.youtube.com/embed/5aJ9GVszbII" frameborder="0" allowfullscreen></iframe>
        <ul>
            <li>Open your browser and visit the <a href="http://app.jendoux.com" target="_blank">Jendoux App</a>.</li>
            <li>Type a URL or some keywords in the query textbox. Open the destination page. </li>
            <li>Choose the mode you would like to read from. There are Flash Mode, Slide Mode and Text Mode.</li>
            <li>Play and read the text.</li>
        </ul>
        <hr />
        <p>
            <b>Learn <a href="features.aspx">All Jendoux Features</a></b>
            <br />
            <br />
            <b>Read <a href="manual.aspx">Detailed User Guide</a></b>
            <br />
            <br />
            <b>To watch all videos related to Jendoux, visit <a href="https://www.youtube.com/playlist?list=PLhYBE1iNV8UOc2dWyURhhS4zVSHjfWseA" target="_blank">https://www.youtube.com/user/wonmanfactory</a></b>
        </p>
        <hr />
        <b style="font-size: large; text-decoration: underline;"><a href="http://app.jendoux.com" style="color: red;" target="_blank">Start Speed Reading with Jendoux</a></b>
    </div>

</asp:Content>
