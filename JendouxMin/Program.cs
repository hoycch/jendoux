using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace JendouxMin
{
    class Program
    {
        static string SolutionFolder = @"E:\My Documents\OneDrive\JendouxFree",
                AppFolder = @"E:\My Documents\OneDrive\JendouxFree\JendouxFree",
                MinifiedFolder = @"E:\My Documents\OneDrive\JendouxFree\JendouxMin\Minified",
                BackupFolder = @"J:\Backup\JendouxFree";
        static Process RoboCopy = new Process();


        static void Main(string[] args)
        {
            string OldScript = Directory.GetFiles(MinifiedFolder, "2014*js").FirstOrDefault();
            if (!string.IsNullOrEmpty(OldScript))
                File.Delete(OldScript);

            string ScriptFileName = DateTime.Now.ToString("yyyyMMddhhmm") + ".js";

            Directory.CreateDirectory(MinifiedFolder);
            Directory.CreateDirectory(BackupFolder);
            RoboCopy.StartInfo.FileName = "robocopy";
            RoboCopy.StartInfo.UseShellExecute = false;

            BackupAllFiles();

            PartialCopy("App_GlobalResources", "*.resx");
            PartialCopy("App_LocalResources", "*.resx");
            PartialCopy("themes", "-E");
            PartialCopy("UserControls", "*.ascx *.resx -E");

            string Facebook = File.ReadAllText(AppFolder + @"\UserControls\FacebookTab.ascx");
            Facebook = Facebook.Replace("<script><%--facebook--%></script>", "<script>try {(function (d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = '//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.0';fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));} catch (e) {}</script>");
            File.WriteAllText(MinifiedFolder + @"\UserControls\FacebookTab.ascx", Facebook);

            string SettingPanel = File.ReadAllText(AppFolder + @"\UserControls\SettingPanel.ascx");
            SettingPanel = SettingPanel.Replace("TextPlayerManager.CFT", "JendouxScript.F1").Replace("TextPlayerManager.CHC", "JendouxScript.F2").Replace("SettingPanelFunctions.CT", "JendouxScript.F3");
            File.WriteAllText(MinifiedFolder + @"\UserControls\SettingPanel.ascx", SettingPanel);

            PartialCopy("Images", "-E");
            PartialCopy("", "*.asmx");
            PartialCopy("bin", "*.dll");
            PartialCopy("Models", "*.edmx");


            string DefaultText = File.ReadAllText(AppFolder + "\\default.aspx");

            Match MyScript = Regex.Match(DefaultText, "<%--StartMyScript--%>.+<%--EndMyScript--%>", RegexOptions.Singleline);

            MatchCollection mc = Regex.Matches(MyScript.Value, @"<script src=""([^""]+)""></script>");
            string JendouxScript = mc.Cast<Match>().Select(m => File.ReadAllText(GetOldFolder(m.Groups[1].Value))).Aggregate((a, b) => a + b);



            JendouxScript = JendouxScript.Replace("localhost:5731", "app.jendoux.com");


            Match PubScript = Regex.Match(DefaultText, "<%--StartPubScript--%>.+<%--EndPubScript--%>", RegexOptions.Singleline);
            mc = Regex.Matches(PubScript.Value, @"<script src=""([^""]+)""></script>");

            string JQueryScript = mc.Cast<Match>().Select(m => File.ReadAllText(GetOldFolder(m.Groups[1].Value))).Aggregate((a, b) => a + b);


            string AllScripts =
                "var JendouxScript = (function () {" +
                JQueryScript + JendouxScript + Environment.NewLine +
                "return {init: pageLoad, F1: TextPlayerManager.CFT, F2: TextPlayerManager.CHC, F3: SettingPanelFunctions.CT} })();"
                + "function pageLoad() {JendouxScript.init();}";
            File.WriteAllText("temp.js", AllScripts);

            //string AjaxminList = mc.Cast<Match>().Select(m => DoubleQuote(GetOldFolder(m.Groups[1].Value))).Aggregate((a, b) => a + " " + b);

            Process Ajaxmin = new Process();
            Ajaxmin.StartInfo.FileName = "ajaxmin";
            Ajaxmin.StartInfo.UseShellExecute = false;

            Ajaxmin.StartInfo.Arguments = DoubleQuote(Environment.CurrentDirectory + "\\temp.js") + " -out " + DoubleQuote(MinifiedFolder + '\\' + ScriptFileName) + " -clobber -term -comments:none";

            Ajaxmin.Start();
            Ajaxmin.WaitForExit();


            RoboCopy.StartInfo.Arguments = DoubleQuote(GetOldFolder("scripts")) + " " + DoubleQuote(GetNewFolder("")) + " ZeroClipboard.swf";
            StartRoboCopy();



            MinCss("Control.css");
            MinCss("Google.css");
            DefaultText = DefaultText.Replace(MyScript.Value, string.Format("<script src=\"{0}\"></script>", ScriptFileName));
            DefaultText = DefaultText.Replace(PubScript.Value, "");

            File.WriteAllText(MinifiedFolder + "\\default.aspx", DefaultText);

            //File.WriteAllText(GetNewFolder("default.aspx"), DefaultText);

            string WebConfig = File.ReadAllText(AppFolder + "\\Web.config");
            WebConfig = WebConfig.Replace("data source=.;initial catalog=DB_9ACB12_jendouxDB;integrated security=True;", "Data Source=SQL5008.Smarterasp.net;Initial Catalog=DB_9ACB12_jendouxDB;User Id=DB_9ACB12_jendouxDB_admin;Password=donthack;");

            XElement WebConfigXml = XElement.Parse(WebConfig);

            WebConfigXml.Descendants("system.web").First().Element("compilation").SetAttributeValue("debug", "false");
            WebConfigXml.Element("system.web").Element("trace").Remove();

            WebConfigXml.Save(MinifiedFolder + "\\web.config");

            Directory.GetFiles(GetOldFolder("JendouxCapture")).ToList().ForEach(F =>
            {
                Ajaxmin.StartInfo.Arguments = DoubleQuote(F) + " -out " + DoubleQuote(GetNewFolder("JendouxCapture\\" + Path.GetFileName(F))) + " -clobber -term -comments:none";

                Ajaxmin.Start();
                Ajaxmin.WaitForExit();
            });
        }

        private static void MinCss(string FileName)
        {

            Process Ajaxmin = new Process();
            Ajaxmin.StartInfo.FileName = "ajaxmin";
            Ajaxmin.StartInfo.UseShellExecute = false;
            Ajaxmin.StartInfo.Arguments = "-css " + DoubleQuote(AppFolder + "\\StyleSheets\\" + FileName) + " -clobber -out " + DoubleQuote(MinifiedFolder + "\\StyleSheets\\" + FileName);

            Ajaxmin.Start();
            Ajaxmin.WaitForExit();
        }
        private static void PartialCopy(string folder, params string[] files)
        {
            if (files.Length > 0)
                RoboCopy.StartInfo.Arguments = GetFolderCommand(folder) + " " + files.Aggregate((x, y) => x + " " + y);
            else
                RoboCopy.StartInfo.Arguments = GetFolderCommand(folder);
            StartRoboCopy();
        }

        static string GetFolderCommand(string FolderName)
        {
            string OldFolder = GetOldFolder(FolderName),
                NewFolder = GetNewFolder(FolderName);
            Directory.CreateDirectory(NewFolder);
            return DoubleQuote(OldFolder) + " " + DoubleQuote(NewFolder);
        }

        private static string GetNewFolder(string folder)
        {
            string NewFolder = Path.Combine(MinifiedFolder, folder);

            string CreateFolder = Regex.Replace(NewFolder, @"/\w+\.\w+$", "");
            if (!folder.Contains("."))
                Directory.CreateDirectory(CreateFolder);
            return NewFolder;
        }

        private static string GetOldFolder(string folder)
        {
            return Path.Combine(AppFolder, folder.Trim('/'));
        }

        static void BackupAllFiles()
        {
            RoboCopy.StartInfo.Arguments = DoubleQuote(SolutionFolder) + " " + DoubleQuote(BackupFolder) + " /S";
            StartRoboCopy();
        }
        static string DoubleQuote(string input)
        {
            return string.Format(@"""{0}""", input);
        }
        static void StartRoboCopy()
        {
            RoboCopy.Start();
            RoboCopy.WaitForExit();
        }
    }
}
