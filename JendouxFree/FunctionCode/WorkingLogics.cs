using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using System.Web;
using System.Xml.Linq;

namespace JendouxFree.FunctionCode
{
    public static class WorkingLogics
    {
        public static string AddTryBlock(string script)
        {
            return @"try {" + script + "} catch (e) {}";
        }
        public static string GetHtml(string TargetUri, out Uri ReturnedUri)
        {
            try
            {
                HttpWebRequest queryPage = (HttpWebRequest)WebRequest.Create(TargetUri);

                queryPage.Credentials = CredentialCache.DefaultCredentials;
                queryPage.Accept = "text/html";
                queryPage.Headers["Accept-Charset"] = "utf-8";
                queryPage.Headers["Accept-Encoding"] = "gzip, deflate";
                queryPage.UserAgent = "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)";

                using (HttpWebResponse response = (HttpWebResponse)queryPage.GetResponse())
                {
                    ReturnedUri = response.ResponseUri;
                    using (Stream PageRawCode = response.GetResponseStream())
                    {
                        using (MemoryStream PageRawCodeDuplicate = new MemoryStream())
                        {
                            byte[] buffer = new byte[1024];
                            int ByteCount;
                            do
                            {
                                ByteCount = PageRawCode.Read(buffer, 0, buffer.Length);
                                PageRawCodeDuplicate.Write(buffer, 0, ByteCount);
                            } while (ByteCount > 0);

                            PageRawCodeDuplicate.Seek(0, SeekOrigin.Begin);

                            MemoryStream DecompressedStream;
                            string ContentEncoding = response.Headers["Content-Encoding"];
                            if (ContentEncoding != null && ContentEncoding.ToLower().IndexOf("gzip") >= 0)
                                DecompressedStream = StreamProcessing.UnzipGzipStream(PageRawCodeDuplicate);
                            else
                                DecompressedStream = PageRawCodeDuplicate;


                            return StreamProcessing.ReadContentFromStream(DecompressedStream);


                        }
                    }
                }
            }

            catch (Exception error)
            {
                throw error;
            }
        }
    }
}