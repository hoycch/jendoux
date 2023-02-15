using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;

namespace JendouxFree.FunctionCode
{
    public static class StreamProcessing
    {
        public static MemoryStream UnzipGzipStream(MemoryStream IncomeStream)
        {
            GZipStream GzipStream = new GZipStream(IncomeStream, CompressionMode.Decompress);
            try
            {
                MemoryStream DecompressedStream = new MemoryStream();
                GzipStream.CopyTo(DecompressedStream);
                DecompressedStream.Seek(0, SeekOrigin.Begin);
                return DecompressedStream;
            }
            catch
            {
                return IncomeStream;
            }
        }

        public static string ReadContentFromStream(MemoryStream ContentStream)
        {
            string ReturnString;
            using (StreamReader r = new StreamReader(ContentStream))
            {
                ReturnString = r.ReadToEnd();

                string pattern = String.Format("<meta{0}charset=\"?{1}", RegexXmlProcessing.NegationRegex(">", false), RegexXmlProcessing.NamerRegex("[\\-\\w]+", "Charset"));
                Match m = Regex.Match(ReturnString, pattern, RegexOptions.IgnoreCase);
                if (m.Success)
                {
                    string Charset = m.Groups["Charset"].Value;
                    if (!RegexXmlProcessing.MatchWithOptions(Charset, "utf-?8").Success)
                    {
                        using (StreamReader ReadAgain = new StreamReader(ContentStream, Encoding.GetEncoding(Charset)))
                        {
                            ContentStream.Seek(0, SeekOrigin.Begin);
                            ReturnString = ReadAgain.ReadToEnd();
                        }
                    }
                }
                return ReturnString;
            }
        }
    }
}