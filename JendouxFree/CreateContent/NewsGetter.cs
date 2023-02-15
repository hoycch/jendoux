using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CsQuery;

namespace JendouxFree.CreateContent
{
    public abstract class NewsGetterClass
    {
        //public abstract CQ AllNews;
        CQ AllNews;
        Dictionary<string, string> ScrapedPages;
        string MyId;
        public NewsGetterClass(string PaperId, Dictionary<string, string> PageCollection)
        {
            ScrapedPages = PageCollection;
            MyId = PaperId;
        }
        public void ReplaceNews(CQ Dom, int PageIndex)
        {

            Dom[string.Format("#{0}>#{0}{1}", MyId, ScrapedPages.ElementAt(PageIndex).Key.Replace("/", ""))].ReplaceWith(GetNewsSection(ScrapedPages.ElementAt(PageIndex).Key, ScrapedPages.ElementAt(PageIndex).Value));
        }

        public CQ CreateAllSections()
        {
            AllNews = CQ.CreateFragment(@"<div>").Attr("id", MyId).AddClass("Newspaper");
            foreach (KeyValuePair<string, string> Page in ScrapedPages)
            {
                AllNews.Append(GetNewsSection(Page.Key, Page.Value));
            }
            return AllNews;
        }
        protected CQ CreateSectionDom(string PageUriPart, string Rename)
        {
            return CQ.CreateFragment(@"<div>")
                .Attr("id", MyId+PageUriPart.Replace("/", ""))
                .AddClass("Section")
                .Append(CQ.CreateFragment("<h3>").Text(Rename).Append(CQ.CreateFragment("<span>").Text("Updated @ GMT+0 "+DateTime.UtcNow.ToString())));
        }

        public abstract CQ GetNewsSection(string PageUriPart, string Rename);
        public CQ CreateNewsEntry(string PageUrl, string Title, string Description, string ImgUrl)
        {
            CQ ReturnCQ = CQ.CreateFragment("<a>")
                .Attr("href",GetHashcodedUrl(PageUrl))
                .Text(Title);
            if (Description != "")
                ReturnCQ.Data("desc", Description);
            if(ImgUrl != "")
                ReturnCQ.Data("img", ImgUrl);
            return ReturnCQ;
        }
        protected static CQ ConvertIDom2CS(IDomObject DomObject)
        {
            return CQ.CreateFragment(DomObject.Render());
        }

        protected CQ GetPageDom(string url)
        {
            Uri u = new Uri(url);
            string html = JendouxFree.FunctionCode.ProcessHTML.ProcessWebpage(JendouxFree.FunctionCode.WorkingLogics.GetHtml(url, out u), u, "");
            return CQ.Create(html);
        }
        protected string GetHashcodedUrl(string Url)
        {
            return Url + "&JendouxCID=" + Url.GetHashCode();
        }
    }
}
