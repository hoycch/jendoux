/// <reference path="ApplicationConstants.js" />
/// <reference path="jQueryExtension.js" />


var DefaultJendouxCapture = function (HTML) {
    /// <param name="HTML" type="htmlstring">This is not a jQuery Object</param>
    /// <returns type="htmlstring">Wrapper is included</returns>
    var $Wrapper = $("<div>").html(HTML),
        PCssConstrain = ":not(:empty,[id],:has(pre, input, select, dd, style))",
        DivCssConstrain = ":not(:has(.jendoux,div,li,table))";
    //    iframes = $Wrapper.find("iframe"),
    //    iframeParents = iframes.parent();
    //while (iframeParents.length > 0) {
    //    iframes.remove();
    //    iframes = iframeParents;
    //    iframeParents = iframes.parent().filter(function () {
    //        return $(this).is(":not(:has(*))") && $(this).text().trim().length == 0;
    //    });
    //}


    function MergeTags() {
        var $prev = $(this).prev();
        if ($prev.length>0 && $prev.get(0).outerHTML.split(">")[0] == this.outerHTML.split(">")[0] && !ContainsOnlyBold($prev.get(0)) && CountWord($(this).text()) * 2 > GSV(TH)) {
            $prev.append("<br/><br/>", this.innerHTML);
            $(this).remove();
        }
    }
    $Wrapper.find("*")
    .removeAttr("onload")
    .removeAttr("onclick")
    .removeAttr("onmousedown")
    .removeAttr("onmousemove")
    .removeAttr("onmouseout")
    .removeAttr("onmouseover")
    .removeAttr("onmouseup")
    .removeAttr("onsubmit").end()

    .find("meta, title, script, iframe").remove().end()
    .find("input, button, select").prop("disabled", true).end();


    $Wrapper.find("p:empty").replaceWith("<br/><br/>");

    $Wrapper.find(Format("p>b+br+br, div{0}>b+br+br", PCssConstrain + DivCssConstrain)).parent().JDXRI().filter(function () {
        var AllNodes = $(this).contents();
        if (AllNodes.eq(0).is(BoldTags) && AllNodes.eq(1).is("br"))
            return true;
        for (var i = 1; i < AllNodes.length; i++) {
            if (AllNodes.eq(i).is(BoldTags) && AllNodes.eq(i - 1).is("br") && AllNodes.eq(i + 1).is("br"))
                return true;
        }
        return false;
    }).contents().wrap("<p class='JendouxBreakDown'>").parent().parent().find("p").filter(function () {
        return $(this).contents().length == 1 && $(this).children().eq(0).is("br"); // contains BR only
    }).remove().end().unwrap();

    $Wrapper.find(".JendouxBreakDown+.JendouxBreakDown").JDXFOB().each(function () {
        var $prev = $(this).prev();
        if ($prev.get(0).outerHTML.split(">")[0] == this.outerHTML.split(">")[0] && !ContainsOnlyBold($prev.get(0))) {
            $prev.append("<br/><br/>", this.innerHTML);
            $(this).remove();
        }
    });
    $Wrapper.find(".JendouxBreakDown").removeClass("JendouxBreakDown");

    $Wrapper.find(Format("{0}{2}+{0}{2}, {1}{2}+{1}{2}", "p", "dd", PCssConstrain)).JDXFOB().each(MergeTags);

    $Wrapper.find("p, dd" + PCssConstrain).JDXPZB().addClass("jendoux");

    $Wrapper.find(Format("{0}+{0}", "div" + PCssConstrain + DivCssConstrain)).JDXFOB().each(MergeTags);
    $Wrapper.find("div" + PCssConstrain + DivCssConstrain).JDXPZB().addClass("jendoux");

    return $Wrapper.html();
}




function ElementWithLongText(HtmlElement) {
    return CountWord($(HtmlElement).text()) > GSV(TH);
}

function CountWord(text) {
    var
        LatinCharRange =
            UnicodeRanger("0041-005A") + //A-Z
            UnicodeRanger("0061-007A") + //a-z
            UnicodeRanger("00C0-00D6") + //letters
            UnicodeRanger("00D8-00F6") + //letters
            UnicodeRanger("00D8-02AF"),

        GreekCharRange = UnicodeRanger("0391-03FF"),
        CyrillicCharRange = UnicodeRanger("0400-0527"),
        CJKCharRange = UnicodeRanger("3040-D7AF"),
        WordExpression = Format("(^[0-9{0}]+|[ ‘’“”''\"\-][0-9{0}]+|[{1}])", LatinCharRange + GreekCharRange + CyrillicCharRange, CJKCharRange);
    var m = text.match(RegExp(WordExpression, "g"));
    return m === null ? 0 : m.length;

    function UnicodeRanger(range) {
        return Format("\\u{0}\\u{1}", range.substr(0, 5), range.substr(5));
    }
}


function ContainsOnlyBold(HtmlElement) {
    var $Tag = $(HtmlElement);
    $Tag.JDXRI();
    var BoldTagCollection = $Tag.find(BoldTags);
    return BoldTagCollection.length == 1 && BoldTagCollection.html() == $Tag.text();

}