using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using JendouxFree.Models;
using System.Text.RegularExpressions;
using JendouxFree.FunctionCode;
using CsQuery;
namespace JendouxFree
{
    /// <summary>
    /// Summary description for JendouxWebService
    /// </summary>
    [WebService(Namespace = "http://wonmanfactory-001-site1.gtempurl.com/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [ScriptService]
    public class JendouxWebService : WebService
    {

        [WebMethod]
        public string ProcessQueries(string QueryInput)
        {
            Uri RedirectedUri;
            DB_9ACB12_jendouxDBEntities context = new DB_9ACB12_jendouxDBEntities();
            //JendouxDBContainer context = new JendouxDBContainer();
            QueryInput = Regex.Replace(QueryInput, @"[\r\n]", "");
            QueryInput = Regex.Replace(QueryInput, ProcessHTML.JendouxAppUrl, "");
            Match IsUrl = Regex.Match(QueryInput, @"(^http(s)?://|^([\w-]+\.)+[\w-]+(/[\w-()./?%&=+:]*)?$)");

            int UserID = int.Parse(ProfileMethods.GetCookieValue("UID", "0"));
            ProfileMethods.SetAccessTime();

            if (IsUrl.Success)
            {
                if (QueryInput.IndexOf(ProcessHTML.GoogleBaseUri) < 0)
                {
                    if (NetworkFunctions.UserIsNotRobot())
                        ProfileMethods.RegisterQuery(context, UserID, QueryInput);

                    if (RegexXmlProcessing.MatchWithOptions(QueryInput, "^http://.+\\.txt$").Success)
                        return WorkingLogics.GetHtml(QueryInput, out RedirectedUri);
                    if (RegexXmlProcessing.MatchWithOptions(QueryInput, "\\.(pdf|gif|jpg|png|tiff|svg|ogv|webm)$").Success)
                    {
                        //XElement ReturnHtml = new XElement("div");
                        CQ ReturnTag = CQ.CreateFragment("<div>");
                        ReturnTag.Append(HttpContext.GetGlobalResourceObject("UserInterface", "Unsupported").ToString());
                        return ReturnTag.Render();
                    }

                    string ContentHtml;
                    try
                    {
                        int CidPosition = QueryInput.IndexOf("&JendouxCID");
                        if (CidPosition > 0)
                        {
                            string CacheID = HttpUtility.ParseQueryString(QueryInput)["JendouxCID"];
                            return ContentCaching.GetContent(CacheID, QueryInput.Substring(0, CidPosition), Server.MapPath("~"));
                        }
                        if (!Regex.Match(QueryInput, "^https?://", RegexOptions.IgnoreCase).Success)
                            QueryInput = "http://" + QueryInput;

                        ContentHtml = WorkingLogics.GetHtml(QueryInput, out RedirectedUri);
                        if (ContentHtml.IndexOf("<body></body>") > 0)
                            return ProcessHTML.ProcessSearch(QueryInput, Server.MapPath("~/JendouxCapture"));

                        return ProcessHTML.ProcessWebpage(ContentHtml, RedirectedUri, Server.MapPath("~/JendouxCapture"));
                    }
                    catch (Exception ex)
                    {
                        throw ex;  //search result??? mun.ca
                    }
                }
                else
                    return ProcessHTML.ProcessSearch(QueryInput, Server.MapPath("~/JendouxCapture"));
            }
            else
            {
                if (NetworkFunctions.UserIsNotRobot())
                    ProfileMethods.RegisterQuery(context, UserID, QueryInput);
                return ProcessHTML.ProcessSearch(QueryInput, Server.MapPath("~/JendouxCapture"));
            }
        }

        [WebMethod]
        public string GetTip(string ID)
        {
            return Resources.ShowTip.ResourceManager.GetObject(ID) as string;
        }

        //[WebMethod]
        //public string ResolveUri(string StyleSheetUrl, string PageUrl)
        //{
        //    //Uri u;
        //    //string StyleSheetString = WorkingLogics.GetHtml(HttpUtility.HtmlDecode(new Uri(new Uri(PageUrl), StyleSheetUrl).ToString()), out u);
        //    //return ProcessHTML.ResolveReferencePath(StyleSheetString, new Uri(PageUrl));
        //    return new Uri(new Uri(PageUrl), StyleSheetUrl).AbsoluteUri;
        //}
        [WebMethod]
        public string GetNewsLinks(string PaperName)
        {
            string AllNews = System.IO.File.ReadAllText(Server.MapPath("AllNewsRaw.xml"));
            CQ AllNewsDom = CQ.CreateFragment(AllNews);
            return AllNewsDom["#" + PaperName].RenderSelection();
        }
    }
}
