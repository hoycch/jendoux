using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace JendouxFree.UserControls
{
    public partial class SettingPanelRow: System.Web.UI.UserControl
    {
        public string Max { get; set; }
        public string Min { get; set; }
        public string Step { get; set; }
        public string Value { get; set; }
        protected void Page_Load(object sender, EventArgs e)
        {
        }
    }
}