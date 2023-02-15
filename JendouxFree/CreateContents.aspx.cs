using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net;
using System.Text;
using CsQuery;
using System.Threading;
using System.IO;
using JendouxFree.CreateContent;
using System.Collections.Specialized;
namespace JendouxFree
{
    public partial class CreateContents : System.Web.UI.Page
    {
        CQ NewsCollection;
        string DataFileLocation;
        protected void Page_Load(object sender, EventArgs e)
        {
            DataFileLocation = Server.MapPath("AllNewsRaw.xml");
            List<NewsGetterClass> PaperCollection = new List<NewsGetterClass>();
            PaperCollection.Add(new WashingtonPost());
            PaperCollection.Add(new Bloomberg());
            PaperCollection.Add(new DailyMail());
            PaperCollection.Add(new TheGuardian());
            
            NameValueCollection QueryString = Request.QueryString;
            if (QueryString.Count == 0)
            {
                NewsCollection = CQ.CreateFragment(@"<div id=""JendouxNewsFeed"">");
                foreach (var Paper in PaperCollection)
                {
                    NewsCollection.Append(Paper.CreateAllSections());
                }
            }
            else
            {
                NewsCollection = CQ.CreateFromFile(DataFileLocation);
                int PageIndex = int.Parse(QueryString["PI"]);
                foreach (var Paper in PaperCollection)
                {
                    Paper.ReplaceNews(NewsCollection, PageIndex);
                }

            }
            NewsCollection.Save(DataFileLocation);



            RemoveOldCache();
        }


        void RemoveOldCache()
        {
            string CachedFolder = Server.MapPath("~/CachedDocs");

            DirectoryInfo AllFiles = new DirectoryInfo(CachedFolder);
            foreach (var file in AllFiles.GetFiles())
            {
                if (!NewsCollection["a"]
                        .Select(a =>
                            a.Attributes["href"].Split('=').Last()
                        )
                        .Contains(
                            Path.GetFileNameWithoutExtension(file.Name)
                        )
                    )
                    file.Delete();
            }
        }



    }
}