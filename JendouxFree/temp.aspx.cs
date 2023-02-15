using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using JendouxFree.FunctionCode;

namespace JendouxFree
{
    public partial class temp : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //lb.Text = ProcessHTML.ProcessSearch("helloworld");
            d.InnerHtml = ProcessHTML.ProcessSearch("");   
        }
    }
}