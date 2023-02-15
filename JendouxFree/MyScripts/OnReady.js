/// <reference path="MenuStripFunctions.js" />
/// <reference path="ApplicationConstants.js" />
/// <reference path="jQueryExtension.js" />
/// <reference path="Portal.js" />
SlideSound[0] = $get("SlideOpenSound");
SlideSound[1] = $get("SlideCloseSound");
SlideSound[2] = $get("SlidePaneSound");

PlayerSound[0] = $get("FlashPlaySound");
PlayerSound[1] = $get("SlidePlaySound");
PlayerSound[2] = $get("RollPlaySound");
PlayerSound[3] = $get("DocOutSound");
PlayerSound[4] = $get("PlaySound");
PlayerSound[5] = $get("StopSound");

LoadingSound = $get("LoadingSound");
DropTextSound = $get("DropTextSound");

$ShowTipPanel.draggable().find("button").button(CloseButtonIcon).click(function () {
    TogglePanel($ShowTipPanel);
    return false;
}).end().dblclick(function () {
    TogglePanel($ShowTipPanel);
});
SettingPanelFunctions.SV();
function pageLoad() {
        
    if ($RP.children().length > 0)
        HtmlDoc = $RP.html();
    else
        HtmlDoc = $RP.text();

    $RP.css("display", "block");
    var $HtmlDoc = $(HtmlDoc),
        $CaptureCodeNode = $HtmlDoc.find("#JendouxCapture");
    $CaptureCodeNode.remove();
    $HtmlDoc.find("[tabindex]").removeAttr("tabindex");

    if ($CaptureCodeNode.length > 0)
        eval($CaptureCodeNode.text());
    else
        JendouxCapture = DefaultJendouxCapture;

    if ($HtmlDoc.find("#JendouxNewsFeed").length) {
        $RP.html($HtmlDoc[0].outerHTML);
        InitFrontPage();
    }
    else {
        HtmlDoc = JendouxCapture(AddJendouxQueryUrl($HtmlDoc[0].outerHTML));
        ReloadPage();
    }
    
    var url = GetBaseUrl(),
        TitleInPage = GetWrapper().data("title"),
        titleText = $("<div>").html("&#x25b6;").text() + TitleInPage;
    try {
        url = decodeURI(url);
    } catch (e) { }

    $QT.val(url);
    
    document.title = TitleInPage === undefined ? appName : unescape(titleText);
    GetWrapper().find("a").filter(function () {
        return $(this).parents(".ui-widget-content,.jendoux").length == 0;
    }).JDXFA().each(function () {
        $(this).JDXBCL();
    });

    $HyperlinkMenu.on("copy", "#zclip", function (e) {
        e.clipboardData.clearData();
        e.clipboardData.setData("text/plain", $(this).data("zclip-text"));
        e.preventDefault();
    })
    .menu().find("*").andSelf().removeAttr("tabindex").end();

    $("button").removeClass("ui-corner-all");
}
