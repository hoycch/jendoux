using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Xml.Linq;
using Microsoft.Ajax.Utilities;
using CsQuery;
using System.IO;
namespace JendouxFree.FunctionCode
{
    public static partial class ProcessHTML
    {
        public static string ProcessWebpage(string IncomeHtml, Uri ReturnedUri, string CustomScriptDirectory)
        {
            CQ dom = CQ.Create(IncomeHtml);



            foreach (var tag in dom["link[href]"])
            {
                ResolveUri(tag, "href", ReturnedUri);
            }
            foreach (var tag in dom["a[href]:not([href^=#]):not([href^=mailto])"])
            {
                try
                {
                    string href = tag.Attributes["href"];
                    Uri ResolvedUri = new Uri(ReturnedUri, href);
                    tag.SetAttribute("href", ResolvedUri.AbsoluteUri);
                }
                catch { }
            }
            foreach (var tag in dom["img[src]"])
                ResolveUri(tag, "src", ReturnedUri);


            CQ ReturnDom = CQ.CreateFragment("<div>")
                .Attr("id", "JendouxPageWrapper")
                .Data("title", dom["title"].Text())
                .Data("url", ReturnedUri.AbsoluteUri);

            dom.Find("body").After(dom.Find("body").Contents()).Remove();

            //dom.Find("meta, title, script, iframe").Remove().End()
            //   .Find("input, button, select").Prop("disabled", true).End();
            if (!string.IsNullOrEmpty(CustomScriptDirectory))
            {
                string ScriptFile = Directory.GetFiles(CustomScriptDirectory).FirstOrDefault(F => ReturnedUri.Host.Contains(Path.GetFileNameWithoutExtension(F)));

                if (!String.IsNullOrEmpty(ScriptFile))
                {
                    string Script = File.ReadAllText(ScriptFile);
                    dom.Append(CQ.CreateFragment(string.Format("<script id='JendouxCapture'>{0}</script>", Script)));
                }
            }
                //    .ForEach(F =>
                //{
                //    if (ReturnedUri.Host.Contains(Path.GetFileNameWithoutExtension(F)))
                //    {
                //        string Script = File.ReadAllText(F);
                //        dom.Append(CQ.CreateFragment(string.Format("<script id='JendouxCapture'>{0}</script>", Script)));
                        
                //    }

                //});
         
            ReturnDom.Append(dom.Contents());
            return ReturnDom.Render(DomRenderingOptions.RemoveComments);
        }
        public static CQ RemoveInlineScript(this CQ dom, string EventName)
        {
            string PropName = "on" + EventName;
            foreach (var tag in dom["*[" + PropName + "]"])
            {
                tag.RemoveAttribute(PropName);
                //string script = tag.Attributes[PropName];
                //tag.SetAttribute(PropName, EncloseTry(script));
            }
            return dom;
        }
        //public static string EncloseTry(string script)
        //{
        //    return string.Format(@"try {{{0}}} catch (e) {{}}", script);
        //}
        public static void ResolveUri(IDomObject tag, string ResolveAttribute, Uri PageUri)
        {
            try
            {
                string href = tag.Attributes[ResolveAttribute];
                Uri ResolvedUri = new Uri(PageUri, href);
                if (ResolvedUri.AbsoluteUri != href)
                    tag.SetAttribute(ResolveAttribute, ResolvedUri.AbsoluteUri);
            }
            catch { }
        }
        public static string MinifyCss(string CssString)
        {
            SwitchParser switchParser = new SwitchParser();
            switchParser.CssSettings.CommentMode = CssComment.None;
            return new Minifier().MinifyStyleSheet(CssString, switchParser.CssSettings);
        }
   
    }
}