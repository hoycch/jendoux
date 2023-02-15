<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="FirstPage.ascx.cs" Inherits="JendouxFree.UserControls.FirstPage" %>
<div id="JendouxPageWrapper" style="margin: 1em; display: inline-block;" data-title='<%=GetGlobalResourceObject("UserInterface", "Title") %>'>
    <div id="fb-root"></div>
    <style>
        #JendouxNewsFeed a {
            display: block;
            text-decoration: none;
            color: #823e03;
            font-size: 16px;
            line-height: 16px;
            width: 400px;
            height: 16px;
            overflow: hidden;
            margin-bottom: 2px;
        }

            #JendouxNewsFeed a:nth-child(even) {
                color: #124455;
            }

            #JendouxNewsFeed a:hover {
                background-color: #b1ecef;
                height: auto;
                /*overflow: no-content;*/
            }

        #JendouxNewsFeed button {
            width: 577px;
            height: 217px;
            cursor: pointer;
            display: block;
        }

        h3 span {
            font-size: x-small;
            float: right;
            color: #aa2828;
        }
        /*h3, .Section
        {
            margin:0;
            border:0;
        }*/
        .PaperContainer {
            max-height: 590px;
            width: 577px;
            margin: 15px;
        }
    </style>
    <h2><%=GetLocalResourceObject("TodayReading") %></h2>
    <div id="JendouxNewsFeed">
        <button style="background: url(images/WashingtonPost.png)" id="WashingtonPostBtn"></button>
        <button style="background: url(images/Bloomberg.png)" id="BloombergBtn"></button>
        <button style="background: url(images/DailyMail.png)" id="DailyMailBtn"></button>
        <%--<button style="background: url(images/TheGuardian.png)" id="TheGuardianBtn"></button>--%>
    </div>
    <br />
    <div style="margin: 0 10px; display: inline-block;">

        <img src="Images/cookie.png" alt="Alternate Text" />
        <b><%=GetLocalResourceObject("Cookie") %></b>

        <h4 style="color: blue"><span style="color: darkblue;">
            <asp:Literal ID="UserNo" runat="server" />
        </span><%=GetLocalResourceObject("PeopleTried") %></h4>

    </div>
</div>

