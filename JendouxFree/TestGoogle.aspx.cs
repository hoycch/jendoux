using JendouxFree.FunctionCode;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using mshtml;
using System.Text.RegularExpressions;
namespace JendouxFree
{
    public partial class TestGoogle : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string t = File.ReadAllText(MapPath(".\\google.html")), JendouxAppUrl = "http://app.jendoux.com/?q=";

            IHTMLDocument2 HtmlDoc = (IHTMLDocument2)new HTMLDocument();
            HtmlDoc.write(t);

            lb.Text = "Hellworld";
            IHTMLElementCollection spans = ((HTMLDocument)HtmlDoc).getElementsByTagName("span");


            IHTMLElementCollection anchors = ((HTMLDocument)HtmlDoc).getElementsByTagName("a");
            foreach (HTMLAnchorElement anchor in anchors)
            {
                //string temp = anchor.outerHTML;
                anchor.removeAttribute("onmousedown");
                try
                {
                    string url = Regex.Replace(anchor.href, "^about:", "");
                    if (!string.IsNullOrEmpty(url))
                    {
                        if (url.StartsWith("/"))
                            //anchor.href = "https://www.google.com" + url;
                            anchor.setAttribute("href", "https://www.google.com" + url);
                        else
                            if (anchor.href.StartsWith("javascript:"))
                                RemoveElement((IHTMLElement)anchor);
                            else
                                anchor.setAttribute("href", JendouxAppUrl + HttpUtility.ParseQueryString(new Uri(url).AbsoluteUri)[0]);
                        url = anchor.href;
                        //temp = anchor.outerHTML;
                    }
                }
                catch (Exception ex)
                {

                }
            }
        }

        private static void RemoveElement(IHTMLElement removed)
        {

            IHTMLDOMNode Node = removed as IHTMLDOMNode;
            Node.parentNode.removeChild(Node);
        }
    }
}