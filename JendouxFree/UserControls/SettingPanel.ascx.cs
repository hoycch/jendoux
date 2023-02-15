using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml.Linq;
using JendouxFree.FunctionCode;
namespace JendouxFree.UserControls
{
    public partial class SettingPanel : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            HighlightColor.Text = ProfileMethods.GetCookieValue("HighLight", "ff0880");
            GetCookieSetIfNull("HighLight", SettingDefaultValues.HighLight);

            PopulateThemes();
            ThemeSelector.SelectedValue = GetCookieSetIfNull("Theme", SettingDefaultValues.Theme);

            PopulateFonts();
            FontSelector.SelectedValue = GetCookieSetIfNull("Font", GetLocalResourceObject("FontDefault").ToString());
            DataBind();

        }

        private void PopulateFonts()
        {
            XElement AllFonts = XElement.Parse(string.Format("<root>{0}</root>", GetLocalResourceObject("FontOptions").ToString()));
            foreach (XElement option in AllFonts.Elements("option"))
            {
                ListItem Font = new ListItem(option.Value, option.Attribute("value").Value);
                Font.Attributes["data-r"] = option.Attribute("data-r").Value;
                FontSelector.Items.Add(Font);
            }
        }

        private void PopulateThemes()
        {

            XElement jQueryThemes = XElement.Load(Server.MapPath("~/App_GlobalResources/jQueryThemeNames.resx"));
            foreach (XElement theme in jQueryThemes.Descendants("data"))
            {
                string ResourceKey = theme.Attribute("name").Value;
                string DisplayText = GetGlobalResourceObject("jQueryThemeNames", ResourceKey).ToString();
                string OptionValue = theme.Attribute("name").Value.Replace("_", "-");
                ListItem NewListItem = new ListItem(DisplayText, OptionValue);
                ThemeSelector.Items.Add(NewListItem);
            }
        }
        protected string GetCookieSetIfNull(string key, string value)
        {
            if (Request.Cookies[key] == null)
                ProfileMethods.SetCookie(key, value);
            return ProfileMethods.GetCookieValue(key, value);
        }
    }
}