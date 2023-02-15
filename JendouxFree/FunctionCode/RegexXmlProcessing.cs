using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace JendouxFree.FunctionCode
{
    public static class RegexXmlProcessing
    {
        public static string NamerRegex(string Regex, string Name)
        {
            return string.Format("(?<{0}>{1})", Name, Regex);
        }
        public static string NegationRegex(string charset, string matchname, bool AllowEmpty)
        {
            if (AllowEmpty)
                return NamerRegex(NegationRegex(charset, true), matchname);
            else
                return NamerRegex(NegationRegex(charset, false), matchname);
        }
        public static Match MatchWithOptions(string input, string pattern)
        {
            return Regex.Match(input, pattern, RegexOptions.Singleline | RegexOptions.IgnoreCase);
        }
        public static string NegationRegex(string charset, bool AllowEmpty)
        {
            if (AllowEmpty)
                return "[^" + charset + "]*";
            else
                return "[^" + charset + "]+";
        }
    }
}