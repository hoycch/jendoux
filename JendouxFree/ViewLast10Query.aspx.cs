using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using JendouxFree.Models;
namespace JendouxFree
{
    public partial class ViewLast10Query : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            DB_9ACB12_jendouxDBEntities db = new DB_9ACB12_jendouxDBEntities();
            GridView1.DataSource = db.Queries.OrderByDescending(q=>q.Id);
            GridView1.DataBind();
            GridView2.DataSource = db.UserProfiles.OrderByDescending(P => P.Id);
            GridView2.DataBind();
        }

        protected void GridView1_PageIndexChanging(object sender, GridViewPageEventArgs e)
        {
            GridView1.PageIndex = e.NewPageIndex;
            GridView1.DataBind();
        }

        protected void GridView2_PageIndexChanging(object sender, GridViewPageEventArgs e)
        {
            GridView2.PageIndex = e.NewPageIndex;
            GridView2.DataBind();
        }

        protected void GridView3_PageIndexChanging(object sender, GridViewPageEventArgs e)
        {
            GridView3.PageIndex = e.NewPageIndex;
            GridView3.DataBind();
        }
        
    }
}