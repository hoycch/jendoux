using JendouxFree.FunctionCode;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml.Linq;

namespace JendouxFree
{
    public partial class UpdateSampleContent : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Uri WikiUrl = new Uri("http://en.wikipedia.org/wiki/Main_Page");
            string WikiFrontString = WorkingLogics.GetHtml(WikiUrl.AbsoluteUri, out WikiUrl).Replace("&", "_amp;");
            XElement ProcessedWikiXml = XElement.Parse(WikiFrontString.Replace("&", ""), LoadOptions.PreserveWhitespace);
            XElement Content = ProcessedWikiXml.Descendants("div").Where(div => div.Attributes("id").Any() && div.Attribute("id").Value == "mp-tfa").First();

            Content.Descendants("a").ToList().ForEach(a =>
            {
                if (a.Attributes("href").Any())
                {
                    string ResolvedUrl = new Uri(WikiUrl, a.Attribute("href").Value).AbsoluteUri;
                    a.SetAttributeValue("href", ResolvedUrl);
                    a.SetAttributeValue("class", "G");
                }

            });

            Content.Elements("div").Last().Remove();

            Content.DescendantsAndSelf().Attributes("id").Remove();

            string FinalOutput = Content.ToString().Replace("_amp;", "&");
            File.WriteAllText(Server.MapPath("WikiContent.xml"), FinalOutput);
        }
    }
}