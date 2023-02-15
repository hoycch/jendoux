using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CsQuery;
namespace JendouxFree.CreateContent
{
    public class WashingtonPost : NewsGetterClass
    {
        public WashingtonPost()
            : base("WashingtonPost", new Dictionary<string, string>()
                {
                    {"national", "US News"},
                    {"world", "World News"},
                    {"business", "Business"},
                    {"technology", "Technology"},
                    {"politics", "Politics"},
                }) { }
        public override CQ GetNewsSection(string PageUriPart, string Rename)
        {
            CQ NewsCollection = CreateSectionDom(PageUriPart, Rename);
            //CQ dom = CQ.CreateFromFile(@"E:\My Documents\OneDrive\JendouxFree\JendouxFree\CreateContent\washingtonpost\" + PageUriPart + ".html");
            CQ dom = GetPageDom("http://www.washingtonpost.com/" + PageUriPart + "/");
            foreach (var Article in dom["div:has(h2:has(a))"])
            {
                CQ CQArticle = CQ.CreateFragment(Article.Render());
                if (CQArticle.Children("div").Children(".byline").Count() > 0 && CQArticle["h2>a"].Text().Trim().Length > 0)
                {
                    NewsCollection.Append(CreateNewsEntry(
                        CQArticle["h2 a"].Attr("href"),
                        CQArticle["h2"].Text(),
                        CQArticle["p:last"].Text(),
                        CQArticle["img:eq(0)"].Length > 0 ? CQArticle["img:eq(0)"].DataRaw("src") : "")
                        );
                }

            }
            foreach (var Article in dom[".s12 li, .s1-2 li"])
            {
                CQ CQArticle = CQ.CreateFragment(Article.Render());
                NewsCollection.Append(CreateNewsEntry(
                        CQArticle["a"].Attr("href"),
                        CQArticle["a"].Text(),
                        "",
                        "")
                        );
            }
            return NewsCollection;
        }


    }
}