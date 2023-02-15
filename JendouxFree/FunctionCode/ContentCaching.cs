using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
namespace JendouxFree.FunctionCode
{
    public static class ContentCaching
    {
        public static string GetContent(string CacheID, string Url, string HomeLocation)
        {
            string ReturnHtml;
            string DocumentLocation = Path.Combine(HomeLocation, "CachedDocs", CacheID + ".html");
            if (File.Exists(DocumentLocation))
                ReturnHtml = File.ReadAllText(DocumentLocation);
            else
            {
                Uri u;
                ReturnHtml = ProcessHTML.ProcessWebpage(WorkingLogics.GetHtml(Url, out u), u, Path.Combine(HomeLocation, "JendouxCapture"));
                File.WriteAllText(DocumentLocation, ReturnHtml);
            }
            return ReturnHtml;
        }
    }
}