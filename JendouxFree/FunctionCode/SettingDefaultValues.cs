using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JendouxFree.FunctionCode
{

    public static class SettingDefaultValues
    {
        public static string Mode = "0";
        public static string PagePlaySpeed = "2";
        public static string FlashSpeed { get{return HttpContext.GetLocalResourceObject("UserControls/SettingPanel.ascx", "FlashSpeedDefault").ToString();} }
        public static string SlideSpeed = "1.5";
        public static string RollSpeed { get{return HttpContext.GetLocalResourceObject("UserControls/SettingPanel.ascx", "RollSpeedDefault").ToString();} }
        public static string WordNum { get { return HttpContext.GetLocalResourceObject("UserControls/SettingPanel.ascx", "WordSpeedDefault").ToString(); } }
        public static string RowNum = "3";
        public static string Threshold { get { return HttpContext.GetLocalResourceObject("UserControls/SettingPanel.ascx", "ThresholdDefault").ToString(); } }
        public static string FontSize = "16";
        public static string Font { get { return HttpContext.GetLocalResourceObject("UserControls/SettingPanel.ascx", "FontDefault").ToString(); } }
        public static string LineHeight = "8";
        public static string Theme = "redmond";
        public static string HighLight = "ff0880";
        public static string Volume = "0.3";

    }
}