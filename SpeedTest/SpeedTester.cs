using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using JendouxFree;
using System.IO;
using CsQuery;
namespace SpeedTest
{
    public class SpeedTester
    {
        [Fact]
        public void Test1()
        {
            Uri u = new Uri("http://www.washingtonpost.com/world/national-security/court-gave-nsa-broad-leeway-in-surveillance-documents-show/2014/06/30/32b872ec-fae4-11e3-8176-f2c941cf35f1_story.html?hpid=z1");
            //string txt = File.ReadAllText(@"E:\Desktop\daily.html");
            string txt = JendouxFree.FunctionCode.WorkingLogics.GetHtml("http://www.washingtonpost.com/world/national-security/court-gave-nsa-broad-leeway-in-surveillance-documents-show/2014/06/30/32b872ec-fae4-11e3-8176-f2c941cf35f1_story.html?hpid=z1", out u);

            //JendouxFree.FunctionCode.ProcessHTML.ProcessWebpage(txt, u);
        }
        //[Fact]
        //public void Test2()
        //{
        //    //string txt = File.ReadAllText(@"E:\Desktop\daily.html");
        //    Uri u = new Uri("http://www.dailymail.co.uk/news/article-2675657/Britain-tough-Spain-Gibraltar-not-Nato-partners-maritime-incursions-border-delays.html");
        //    CQ c = CQ.CreateDocumentFromFile(@"E:\Desktop\daily.html");
        //    foreach (var tag in c["*[href]"])
        //    {
        //        string OriginalLink = tag.Attributes["href"];
        //        tag.SetAttribute("href", new Uri(u, OriginalLink).AbsoluteUri);
        //    }
        //}
    }
}
