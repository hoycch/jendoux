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
using System.Text.RegularExpressions;
namespace JendouxFree
{
    public partial class Default : System.Web.UI.Page
    {
        DB_9ACB12_jendouxDBEntities context = new DB_9ACB12_jendouxDBEntities();
        protected void Page_Load(object sender, EventArgs e)
        {

            if (Request.QueryString["q"] != null) //get content first because otherwise the new assigned ID will take effect for cookie disabled users
            {
                string Query = Request.QueryString["q"];
                if (Request.QueryString["JendouxCID"] != null)
                    Query += "&JendouxCID=" + Request.QueryString["JendouxCID"];
                JendouxWebService ws = new JendouxWebService();
                string TargetPage = ws.ProcessQueries(Query);

                if (NetworkFunctions.UserIsNotRobot())
                {
                    ReadingPage.InnerText = TargetPage;
                    ReadingPage.Style.Add("display", "none");
                }
                else
                    ReadingPage.InnerHtml = TargetPage;
            }

            string FirstAccessTimeString = "CreateAt", VisitsString = "Visits", UserIdString = "UID";

            ((Literal)FirstPage.FindControl("UserNo")).Text = context.UserProfiles.Count().ToString();


            ProfileMethods.SetAccessTime();

            if (Request.Cookies[UserIdString] == null)
            {
                ProfileMethods.SetCookie(FirstAccessTimeString, DateTime.Now.ToString());
                ProfileMethods.SetCookie(VisitsString, "1");
                ProfileMethods.SetCookie(UserIdString, GetNewUserID().ToString());


                //string ThisUserIP = HttpContext.Current.Request.UserHostAddress,
                //        ThisUserAgent = HttpContext.Current.Request.UserAgent;

            }
            else
            {
                if ((DateTime.Now - DateTime.Parse(GetCookieValue("LastAccess", DateTime.Now.ToString()))).TotalMinutes > 60)
                    ProfileMethods.SetCookie(VisitsString, (int.Parse(GetCookieValue(VisitsString, "1")) + 1).ToString());
                int UserIdBrowser;
                try
                {
                    UserIdBrowser = int.Parse(GetCookieValueSimple(UserIdString));
                }
                catch (Exception ex)
                {//print clear your cookie message
                    throw;
                }
                if (context.UserProfiles.Any(s => s.Id == UserIdBrowser))
                {
                    bool Changed = false;
                    UserProfile ThisUserProfile = context.UserProfiles.Single(u => u.Id == UserIdBrowser);
                    
                    string[] AllProperties = {"Mode", "FlashSpeed", "SlideSpeed", "RollSpeed", "WordNum", "RowNum", "Threshold", "FontSize", "Font", "LineHeight", "Theme", "HighLight", "Volume" };
                    foreach (string property in AllProperties)
                    {
                        Changed = Changed || UpdateProperty(ThisUserProfile, property, GetCookieValueSimple(property));
                    }

                    if (ThisUserProfile.Visits != int.Parse(GetCookieValueSimple(VisitsString)))
                        ThisUserProfile.Visits = int.Parse(GetCookieValueSimple(VisitsString));

                    if (Changed)
                        context.SaveChanges();


                }
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
        public bool UpdateProperty(UserProfile userprofile, string key, string value)
        {
            PropertyInfo pi = userprofile.GetType().GetProperty(key);
            if (typeof(UserProfile).GetProperty(key).GetValue(userprofile).ToString() != value)
            {
                pi.SetValue(userprofile, value);
                return true;
            }
            return false;
        }
        int GetNewUserID()
        {
            if (context.UserProfiles.Count() > 0)
                return context.UserProfiles.AsEnumerable().Last().Id + 1;
            else
                return 1;
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