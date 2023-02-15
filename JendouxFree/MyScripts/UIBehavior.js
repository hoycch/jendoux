/// <reference path="parameters.js" />
/// <reference path="ApplicationConstants.js" />
/// <reference path="SettingsPanelFunctions.js" />
/// <reference path="TextPlayerManager.js" />
/// <reference path="jQueryExtension.js" />
function ClearPanels() {
    SettingPanelFunctions.CSP();
    CustomReaderFuctions.CP();
}
function GetBaseUrl() {
    $($QT).css("color", "rgba(25,155,155,.5)");
    return $(Wrp).data("url") || DefaultUrlText;
}
function SaveProfile() {
    AllSliders.forEach(function (Slider) {
        JCS(Slider, GSV(Slider));
    })
    JCS("HighLight", TextPlayerManager.HC.substr(1));
    JCS("Font", TextPlayerManager.FT);
    JCS("Theme", $("#ThemeSelector").val());
    JCS("Mode", TextPlayerManager.M);
    JCS("SettingY", $SP.css("top"));
    JCS("SettingX", $SP.css("left"));
}
function TogglePanel(Panel) {
    var PanelIsVisible = Panel.is(":visible");
    SlideSound[PanelIsVisible ? 1 : 2].play();
    Panel.slideToggle();
}
function ShowTipMessage(Message) {
    $ShowTipPanel.position({
        of: window,
        my: "center center",
        at: "center center"
    }).find("#MessageContent").html(Message);
    if (!$ShowTipPanel.is(":visible"))
        TogglePanel($ShowTipPanel);
}
function CheckClick(MousePosition, e) {
    if (MousePosition !== null && Math.abs(e.clientX - MousePosition.x) < 3 && Math.abs(e.clientY - MousePosition.y) < 3)
        return true;
    else
        return false;
}
function CheckBrowserSafari() {
    return Sys.Browser.agent == Sys.Browser.Safari;
}

function GetOutputPosition($PlayerPanel, $NewPanel)     {
    if ($(window).width() - $PlayerPanel.width() > $NewPanel.width())
        return {
            of: $PlayerPanel,
            my: "left center",
            at: "right+20 center",
            collision: "flip fit"
        }
    else
        return {
            of: $PlayerPanel,
            my: "left top",
            at: "left bottom+20",
            collision: "none none"
        }
}
function IsWheelUp(event) {
    return event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0;
}
function RemoveCID(url) {
    var CidIndex = url.indexOf("&JendouxCID");
    if (CidIndex > 0)
        url = url.substr(0, CidIndex);
    return url;
}
function AddJendouxQueryUrl(Html) {
    var $Html = $("<div>").html(Html);
    $Html.find("a").attr("href", function () {
        var href = $(this).JDXH();
        if (href != null)
            if (href.indexOf("://") > 0 && !$(this).JDXNT())
                return JQS + href;
            else
                return href;
    });
    return $Html.html();
}


function ToggleLoadingState() {
    //$LoadingGif.is(":visible") ? LoadingSound.pause() : LoadingSound.play();
    $LoadingGif.fadeToggle();

}

function HidePageMenu() {
    $PageMenu.css("visibility", "hidden");
}

function DisplayErrorMsg(e) {
    return ShowTipMessage(Format("<p>{0}</p><p>{1}</p>", NetworkError, e.get_message()));
}