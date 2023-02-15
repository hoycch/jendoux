using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace JendouxFree.UserControls
{
    public partial class MenuStrip : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Cookies["Mode"] == null)
                FunctionCode.ProfileMethods.SetCookie("Mode", "0");
        }
    }
}