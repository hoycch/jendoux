using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using CsQuery;

namespace JendouxFree.CreateContent
{
    public class TheGuardian:NewsGetterClass
    {
        public TheGuardian()
            : base("TheGuardian", new Dictionary<string, string>()
        {
            { "uk", "News"},
            {"uk/business", "Business"},
            {"technology", "Technology"},
            {"environment", "Environment"},
            {"lifeandstyle", "Life & Style"}
        }) { }
        public override CsQuery.CQ GetNewsSection(string PageUriPart, string Rename)
        {
            CQ NewsCollection = CreateSectionDom(PageUriPart, Rename);
            //CQ dom = CQ.CreateFromFile(@"E:\My Documents\OneDrive\JendouxFree\JendouxFree\CreateContent\theguardian\" + PageUriPart.Replace("/", "") + ".html");
            CQ dom = GetPageDom("http://www.theguardian.com/" + PageUriPart);
            foreach (var Article in dom["#inner-wrapper li"])
            {
                CQ CQArticle = CQ.CreateFragment(Article.Render());

                if(CQArticle.Find(".large-trail,.trail-text,.trailtext").Count() >0 && CQArticle.Find(":header").Count() > 0)
                NewsCollection.Append(
                        CreateNewsEntry(
                            CQArticle[":header:eq(0) a"].Attr("href"),
                            CQArticle[":header:eq(0) a"].Text(),
                            Regex.Replace(CQArticle[".large-trail,.trail-text"].Text().Trim(), "\\s+", " "),
                            CQArticle["img:eq(0)"].Attr("src")
                        )
                    );
            }
            return NewsCollection;
        }
    }
}