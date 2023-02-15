using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Xml.Linq;

namespace JendouxFree.FunctionCode
{
    public static class NetworkFunctions
    {
        public static string GetIpCountry(string XmlString)
        {
            try
            {
                XElement XmlDoc = XElement.Parse(XmlString);
                return XmlDoc.Element("CountryName").Value;
            }
            catch (Exception)
            {
                return "";
            }
        }
        public static string GetIpFromXml(string XmlDoc)
        {
            try
            {
                XElement Doc = XElement.Parse(XmlDoc);
                return Doc.Element("Ip").Value;
            }
            catch (Exception)
            {
                return "";
            }
        }
        public static string GetIpDataXml(string IP)
        {
            Uri temp;
            try
            {
                return WorkingLogics.GetHtml("http://freegeoip.net/xml/" + IP, out temp);
            }
            catch
            {
                return string.Format("<root><Ip>{0}</Ip></root>", IP);
            }

        }

        public static bool UserIsNotRobot()
        {
            string UserString = HttpContext.Current.Request.ServerVariables["HTTP_USER_AGENT"];
            return !Regex.Match(UserString, "(bot|crawler|spider|80legs|archive|voyager|curl|wget|yahoo|google|php|\\+)", RegexOptions.IgnoreCase).Success;
        }
    }
}