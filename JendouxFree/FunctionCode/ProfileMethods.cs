using JendouxFree.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JendouxFree.FunctionCode
{
    public static class ProfileMethods
    {
        public static void RegisterQuery(DB_9ACB12_jendouxDBEntities context, int UserID, string Query)
        {
            if (UserID > 0 && !context.UserProfiles.Any(s => s.Id == UserID))
            {
                RegisterUser(context);
            }
            Query NewQuery = new Query()
            {
                UserProfileId = UserID > 0 ? UserID:1,
                Url = Query,
                Time = DateTime.Now
            };
            if (context.UserProfiles.Any(u=>u.Id == NewQuery.UserProfileId))
            {
                context.Queries.AddObject(NewQuery);
                //first user must be cookie enabled
                context.SaveChanges();
            }
        }
        public static void RegisterUser(DB_9ACB12_jendouxDBEntities context)
        {
            HttpRequest request= HttpContext.Current.Request;
            string UserIP = request.UserHostAddress, UserAgentString = request.UserAgent, IpXml;
            IpXml = NetworkFunctions.GetIpDataXml(UserIP);


            UserProfile NewProfile = new UserProfile()
            {
                CreateAt = DateTime.Now,
                Visits = int.Parse(GetCookieValue("Visits", "1")),
                Location = NetworkFunctions.GetIpCountry(IpXml),
                UserAgent = UserAgentString,
                Mode = GetCookieValueSimple("Mode"),
                FlashSpeed = GetCookieValueSimple("FlashSpeed"),
                SlideSpeed = GetCookieValueSimple("SlideSpeed"),
                RollSpeed = GetCookieValueSimple("RollSpeed"),
                WordNum = GetCookieValueSimple("WordNum"),
                RowNum = GetCookieValueSimple("RowNum"),
                Threshold = GetCookieValueSimple("Threshold"),
                FontSize = GetCookieValueSimple("FontSize"),
                Font = GetCookieValueSimple("Font"),
                LineHeight = GetCookieValueSimple("LineHeight"),
                Theme = GetCookieValueSimple("Theme"),
                HighLight = GetCookieValueSimple("HighLight"),
                Volume = GetCookieValueSimple("Volume")
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
        public static string GetCookieValueSimple(string key)
        {
            return GetCookieValue(key, "");
        }

    }
}