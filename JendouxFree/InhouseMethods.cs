using JendouxFree.Models;
using JendouxLibrary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JendouxFree
{
    public static class InhouseMethods
    {
        public static void RegisterUser(JendouxDBContainer context)
        {
            HttpRequest request= HttpContext.Current.Request;
            string UserIP = request.UserHostAddress, UserAgentString = request.UserAgent, IpXml;
            IpXml = NetworkFunctions.GetIpDataXml(UserIP);


            UserProfile NewProfile = new UserProfile()
            {
                Location = NetworkFunctions.GetIpCountry(IpXml),
                UserAgent = UserAgentString,
                Visits = GetCookieValue("Visits", "1"),
                CreatedAt = DateTime.Now,
                Setting = GetSettings()
            };

            context.UserProfiles.AddObject(NewProfile);
            context.SaveChanges();
        }
        public static string GetCookieValue(string CookieName, string DefaultValue)
        {
            HttpCookie cookie =  HttpContext.Current.Request.Cookies[CookieName];
            return cookie != null ? cookie.Value : DefaultValue;
        }
        public static void SetAccessTime()
        {
            SetCookie("LastAccess", DateTime.Now.ToString());
        }
        public static void SetCookie(string key, string value)
        {
            HttpContext.Current.Response.Cookies[key].Value = value;
            HttpContext.Current.Response.Cookies[key].Expires = DateTime.Now.AddYears(1);
        }
        public static Settings GetSettings()
        {

            return new Settings()
            {
                FlashSpeed = GetCookieValueSimple("FlashSpeed"),
                SlideSpeed = GetCookieValueSimple("SlideSpeed"),
                WordNum = GetCookieValueSimple("WordNum"),
                RowNum = GetCookieValueSimple("RowNum"),
                Threshold = GetCookieValueSimple("Threshold"),
                FontSize = GetCookieValueSimple("FontSize"),
                Font = GetCookieValueSimple("Font"),
                LineHeight = GetCookieValueSimple("LineHeight"),
                Theme = GetCookieValueSimple("Theme"),
                HighLight = GetCookieValueSimple("HighLight"),
                Volume = GetCookieValueSimple("Volume"),
            };
        }
        public static string GetCookieValueSimple(string key)
        {
            return GetCookieValue(key, "");
        }

    }
}