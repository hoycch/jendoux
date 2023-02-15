using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CsQuery;
using JendouxFree;
using JendouxFree.Models;

namespace JendouxFree
{
    public partial class test1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Uri u;
            string html = JendouxFree.FunctionCode.WorkingLogics.GetHtml("http://www.theguardian.com/technology", out u);
            //CQ dom = CQ.Create(html);
            File.WriteAllText(Server.MapPath("~/technology.html"), html);
            //label.Text = File.ReadAllText(@"E:\My Documents\OneDrive\JendouxFree\JendouxFree\test.html");
            //CQ dom = CQ.CreateFromFile(@"E:\My Documents\OneDrive\JendouxFree\JendouxFree\test.html");

            //dom["style, a.ab_button, .preload, ul:has(.action-menu-item)"].Remove();
            //label.Text = dom["body"].RenderSelection();
            //context.SaveChanges();
        }
    }
}