using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.Objects;
using JendouxFree.Models;
using JendouxFree.FunctionCode;
using System.Reflection;
using System.Xml.Linq;
namespace JendouxFree
{
    public partial class trace : System.Web.UI.Page
    {
        JendouxDBContainer context = new JendouxDBContainer();
        protected void Page_Load(object sender, EventArgs e)
        {

            string FirstAccessTimeString = "CreatedAt", VisitsString = "Visits", UserIdString = "UserID";

            ((Literal)FirstPage.FindControl("UserNo")).Text = (context.UserProfiles.Where(UP =>
                !UP.UserAgent.ToLower().Contains("bot")
                &&
                !string.IsNullOrEmpty(UP.Location)
                ).Count() - 4).ToString();


            ProfileMethods.SetAccessTime();

            if (Request.Cookies[FirstAccessTimeString] == null)
            {
                ProfileMethods.SetCookie(FirstAccessTimeString, DateTime.Now.ToString());
                ProfileMethods.SetCookie(VisitsString, "1");
                ProfileMethods.SetCookie(UserIdString, GetNewUserID().ToString());


                string ThisUserIP = HttpContext.Current.Request.UserHostAddress,
                        ThisUserAgent = HttpContext.Current.Request.UserAgent;

            }
            else
            {
                if ((DateTime.Now - DateTime.Parse(GetCookieValue("LastAccess", DateTime.Now.ToString()))).TotalMinutes > 60)
                    ProfileMethods.SetCookie(VisitsString, (int.Parse(GetCookieValue(VisitsString, "1")) + 1).ToString());


                int UserIdBrowser = int.Parse(GetCookieValueSimple(UserIdString));
                if (!context.Settings.Any(s => s.UserProfile.Id == UserIdBrowser))
                {
                    ProfileMethods.RegisterUser(context);
                }
                else
                {
                    bool Changed = false;
                    UserProfile ThisUserProfile = context.UserProfiles.Single(u => u.Id == UserIdBrowser);
                    Settings ThisUserSettings = ThisUserProfile.Setting;
                    string[] AllProperties = { "FlashSpeed", "SlideSpeed", "WordNum", "RowNum", "Threshold", "FontSize", "Font", "LineHeight", "Theme", "HighLight", "Volume" };
                    foreach (string property in AllProperties)
                    {
                        Changed = Changed || UpdateProperty(ThisUserSettings, property, GetCookieValueSimple(property));
                    }

                    if (ThisUserProfile.Visits != GetCookieValueSimple(VisitsString))
                        ThisUserProfile.Visits = GetCookieValueSimple(VisitsString);

                    if (Changed)
                        context.SaveChanges();


                }
            }

            if (Request.QueryString["q"] != null)
            {
                string Query = Request.QueryString["q"];
                JendouxWebService ws = new JendouxWebService();
                ReadingPage.InnerHtml = ws.ProcessQueries(Query);
            }

            PopulateJSResource();

        }
        private void PopulateJSResource()
        {
            XElement ResourceText = XElement.Load(Server.MapPath("~/App_GlobalResources/JScriptVariables.resx"));

            List<string> NameValue = new List<string>();

            ResourceText.Descendants("data").Select(node => node.Attribute("name").Value).ToList().ForEach(VariableName =>
                NameValue.Add(string.Format(@"{0}=""{1}""", VariableName, GetGlobalResourceObject("JScriptVariables", VariableName))));
            JavascriptResources.Text = string.Format("<script>var {0};</script>", string.Join(",", NameValue));

        }
        public bool UpdateProperty(Settings setting, string key, string value)
        {
            PropertyInfo pi = setting.GetType().GetProperty(key);
            if (typeof(Settings).GetProperty(key).GetValue(setting).ToString() != value)
            {
                pi.SetValue(setting, value);
                return true;
            }
            return false;
        }
        int GetNewUserID()
        {
            return context.UserProfiles.Count() + 1;
        }
        string GetCookieValueSimple(string Key)
        {
            return ProfileMethods.GetCookieValueSimple(Key);
        }
        string GetCookieValue(string key, string DefaultValue)
        {
            return ProfileMethods.GetCookieValue(key, DefaultValue);
        }
    }
}