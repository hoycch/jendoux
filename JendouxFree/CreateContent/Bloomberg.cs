using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using CsQuery;
namespace JendouxFree.CreateContent
{
    public class Bloomberg : NewsGetterClass
    {
        public Bloomberg()
            : base("Bloomberg", new Dictionary<string, string>()
        {
            {"news", "US & International News"},
            {"politics", "US Politics"},
            {"technology", "Technology"},
            {"sustainability", "Sustainability"},
            {"luxury", "Luxury"}
        }) { }
        public override CQ GetNewsSection(string PageUriPart, string Rename)
        {
            CQ NewsCollection = CreateSectionDom(PageUriPart, Rename);
            //CQ dom = CQ.CreateFromFile(@"E:\My Documents\OneDrive\JendouxFree\JendouxFree\CreateContent\bloomberg\" + PageUriPart + ".html");
            CQ dom = GetPageDom("http://www.bloomberg.com/" + PageUriPart + "/");


            foreach (IDomObject Article in dom[".lede"])
            {
                CQ CQArticle = CQ.CreateFragment(Article.Render());
                NewsCollection.Append(CreateNewsEntry(
                        CQArticle["a:not(:has(img)):first"].Attr("href"),
                        CQArticle["a:not(:has(img)):first"].Text(),
                        CQArticle["img"].Attr("alt"),
                        CQArticle["img:first"].Attr("src")
                    ));
            }
            foreach (IDomObject Article in dom[".lede li"])
            {
                CQ CQArticle = CQ.CreateFragment(Article.Render());
                NewsCollection.Append(CreateNewsEntry(
                        CQArticle["a"].Attr("href"),
                        CQArticle["a"].Text(),
                        "",
                        ""
                    ));
            }
            foreach (IDomObject Article in dom["li.exclusive"])
            {
                CQ CQArticle = CQ.CreateFragment(Article.Render());
                NewsCollection.Append(CreateNewsEntry(
                        CQArticle["a:not(:has(img))"].Attr("href"),
                        CQArticle["a:not(:has(img))"].Text(),
                        CQArticle["p"].Text().Trim(),
                        CQArticle["img"].Attr("src")
                    ));
            }
            foreach (IDomObject Article in dom[".big_blog_module .headline, .big_blog_module li"])
            {
                CQ CQArticle = CQ.CreateFragment(Article.Render());
                NewsCollection.Append(CreateNewsEntry(
                        CQArticle["a:not(:has(img))"].Attr("href"),
                        CQArticle["a:not(:has(img))"].Text(),
                        CQArticle["img"].Attr("alt"),
                        CQArticle["img"].Attr("src")
                    ));
            }
            foreach (IDomObject Article in dom[".fl li, .fr li"])
            {
                CQ CQArticle = CQ.CreateFragment(Article.Render());
                NewsCollection.Append(CreateNewsEntry(
                        CQArticle["a:not(:has(img))"].Attr("href"),
                        CQArticle["a:not(:has(img))"].Text(),
                        CQArticle["img"].Attr("alt"),
                        CQArticle["img"].Attr("src")
                    ));
            }
            foreach (IDomObject Article in dom[".open_top"])
            {
                CQ CQArticle = CQ.CreateFragment(Article.Render());
                NewsCollection.Append(CreateNewsEntry(
                        CQArticle["a:not(:has(img))"].Attr("href"),
                        CQArticle["a:not(:has(img))"].Text(),
                        "",
                        ""
                    ));
            }
            foreach (IDomObject Article in dom[".tetris_boxes li"])
            {
                CQ CQArticle = CQ.CreateFragment(Article.Render());
                NewsCollection.Append(CreateNewsEntry(
                        CQArticle["a:not(:has(img))"].Attr("href"),
                        CQArticle["a:not(:has(img))"].Text(),
                        "",
                        ""
                    ));
            }
            foreach (IDomObject Article in dom[".top_story"])
            {
                CQ CQArticle = CQ.CreateFragment(Article.Render());
                NewsCollection.Append(CreateNewsEntry(
                        CQArticle[".item_content a"].Attr("href"),
                        CQArticle[".item_content a"].Text(),
                        CQArticle["img"].Attr("alt"),
                        CQArticle["img"].Attr("src")
                    ));
            }
            foreach (IDomObject Article in dom[".tetris_with_thumbnail:has(.hl)"])
            {
                CQ CQArticle = CQ.CreateFragment(Article.Render());
                NewsCollection.Append(CreateNewsEntry(
                        CQArticle[".hl a"].Attr("href"),
                        CQArticle[".hl a"].Text(),
                        CQArticle["img"].Attr("alt"),
                        CQArticle["img"].Attr("src")
                    ));
            }
            return NewsCollection;
        }
    }
}