using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using CsQuery;

namespace JendouxFree.CreateContent
{
    public class DailyMail : NewsGetterClass
    {
        public DailyMail()
            : base("DailyMail", new Dictionary<string, string>() { 
            
                {"news", "UK News"},
                {"money", "Business"},
                {"sciencetech", "Science & Technology"},
                {"femail", "Femail"},
                {"travel", "Travel"}
            
            }) { }
        int ReplaceCountSymbols(string number)
        {
            try
            {
                return int.Parse(number.Replace(",", "").Replace("k", "000"));
            }
            catch (Exception)
            {
                return 0;
            }
        }
        int GetCommentCount(CQ article)
        {
            return ReplaceCountSymbols(CQ.CreateFragment(article.Render())[".readerCommentNo"].Text());
        }


        public override CQ GetNewsSection(string PageUriPart, string Rename)
        {
            CQ NewsCollection = CreateSectionDom(PageUriPart, Rename);

            //CQ dom = CQ.CreateFromFile(@"E:\My Documents\OneDrive\JendouxFree\JendouxFree\CreateContent\dailymail\" + PageUriPart + ".html");
            CQ dom = GetPageDom("http://www.dailymail.co.uk/" + PageUriPart + "/index.html");

            foreach (IDomObject Article in dom[".article"].Distinct(new DailyMailComparer()))
            {
                CQ CQArticle = CQ.CreateFragment(Article.Render());
                NewsCollection.Append(
                    CreateNewsEntry(
                    CQArticle[".linkro-darkred a"].Attr("href"), 
                    CQArticle[".linkro-darkred a"].Eq(0).Text(),
                    CQArticle["[class^=articletext] p"].Text().Trim(),
                    CQArticle["img:eq(0)"].Attr("src")
                    )
                );
            }
        
            return NewsCollection;
        }


    }
    public class DailyMailComparer : IEqualityComparer<IDomObject>
    {
        public bool Equals(IDomObject x, IDomObject y)
        {
            return CQ.CreateFragment(x.Render())[".linkro-darkred a"].Attr("href") == CQ.CreateFragment(y.Render())[".linkro-darkred a"].Attr("href");

        }


        public int GetHashCode(IDomObject obj)
        {
            return CQ.CreateFragment(obj.Render())[".linkro-darkred a"].Attr("href").GetHashCode();
        }
    }
}