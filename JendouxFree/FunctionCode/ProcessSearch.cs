using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Xml.Linq;
using CsQuery;
namespace JendouxFree.FunctionCode
{
    public static partial class ProcessHTML
    {
        public static string GoogleBaseUri = @"https://www.google.com/search?q=", JendouxAppUrl = "http://app.jendoux.com/?q=";
        public static string ProcessSearch(string QueryString, string CustomScriptDirectory)
        {
            Uri GoogleReturnUrl;
            string SearchReturnString, QueryItem = QueryString;


            if (QueryString.Contains(GoogleBaseUri))
            {
                SearchReturnString = WorkingLogics.GetHtml(QueryString, out GoogleReturnUrl);
                QueryItem = new Uri(QueryString).Query.Split('&').First().Substring(3);
            }
            else
                SearchReturnString = WorkingLogics.GetHtml(GoogleBaseUri + QueryString, out GoogleReturnUrl);





            GoogleReturnUrl = new Uri(HttpUtility.UrlDecode(GoogleReturnUrl.AbsoluteUri));

            string Script = System.IO.File.ReadAllText(CustomScriptDirectory + "\\www.google.js");

            CQ Dom = CQ.Create(SearchReturnString),
                ReturnDom =
                    CQ.CreateFragment("<div>")
                    .Attr("id", "JendouxPageWrapper")
                    .Attr("position", "relative")
                    .Data("title", QueryItem + " By Google")
                    .Data("url", GoogleReturnUrl.ToString())
                    .Append(CQ.CreateFragment("<link>").Attr("rel", "stylesheet").Attr("href", "StyleSheets/Google.css").Attr("id", "GoogleStyle"))
                    .Append(Dom)
                    .Append(CQ.CreateFragment(string.Format("<script id='JendouxCapture'>{0}</script>", Script)));
            //ReturnDom[".r a, .fl, .g a"].RemoveAttr("onmousedown");
            //ReturnDom["a.ab_button, .preload, ul:has(.action-menu-item), style, .rg_meta, #taw, #bottomads"].Remove();
            //foreach (var anchor in ReturnDom["a.fl[href^=/], a[class~=spell]"])
            //{
            //    string uri = anchor.Attributes["href"];
            //    anchor.SetAttribute("href", new Uri(GoogleReturnUrl, uri).AbsoluteUri);
            //}
            //foreach (var anchor in ReturnDom[".r a"])
            //{
            //    string uri = anchor.Attributes["href"];
            //    anchor.SetAttribute("href", uri);
            //}
            ////foreach (var Script in Dom["script"])
            ////{
            ////    string script = @"try {" + Script.InnerText + "} catch (e) {}";

            ////    ReturnDom.Append(CQ.CreateFragment("<script>").Text(script));
            ////}
            //foreach (var img in ReturnDom["img[id]"])
            //{
            //    string CssSelector = string.Format("script:contains({0})", img.Attributes["id"]);
            //    if (Dom[CssSelector] != null)
            //    {
            //        //string script = @"try {" + Dom[CssSelector].Text() + "} catch (e) {}";
            //        ReturnDom.Append(CQ.CreateFragment("<script>").Text(WorkingLogics.AddTryBlock(Dom[CssSelector].Text())));
            //        Dom[CssSelector].Remove();
            //    }
            //}

            //ReturnDom["#imagebox_bigimages"].Remove();
            return ReturnDom.Render();


        }



    }
}