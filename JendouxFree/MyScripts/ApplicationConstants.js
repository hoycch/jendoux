var
    $html = Sys.Browser.agent == Sys.Browser.Safari ? $("body") : $("html"),
    $QT = $("#QueryTextBox"), // Query Textbox

    $RP = $("#ReadingPage"),
    $SP = $("#settingPanel"),

    CR = {},
    $CustomerReaderPanel = $("#CustomReaderPanel"),
    $ShowTipPanel = $("#ShowTipPanel"),
    $MS_ModeButtonsWrapper = $("#MSB_ModeOptions"),
    $MS_ModeButtons = $("#MSB_ModeOptions button"),
    PP = "PagePlaySpeed",
    FS = "FlashSpeed",
    SS = "SlideSpeed",
    RS = "RollSpeed",
    WN = "WordNum",
    RN = "RowNum",
    TH = "Threshold",
    FZ = "FontSize",
    LH = "LineHeight",
    VL = "Volume",
    AllSliders = [FS, SS, RS, WN, RN, TH, FZ, LH, VL], //all sliders,
    SelectedFontjQueryString = "#FontSelector option:selected",
    Wrp = "#JendouxPageWrapper",
    MousewheelEventName = "mousewheel MozMousePixelScroll",
    $HyperlinkMenu = $("#HyperlinkMenu"),
    $PageMenu = $("#PageMenu"),
    $PlaySpeedLabel = $("#PagePlaySpeedLabel"),
    Format = String.format,
    SysApplication = Sys.Application,
    //JQS = Format("http://{0}/?q=", window.location.host),
    JQS = Format("http://{0}/?q=", "localhost:5731"),
    Point = Sys.UI.Point,
    ButtonIcons = {
        TextMode: "ui-icon-script",
        FlashMode: "ui-icon-newwin",
        SlideMode: "ui-icon-arrowthickstop-1-n",
        RollMode: "ui-icon-arrowthickstop-1-w",
        Play: "ui-icon-play",
        Stop: "ui-icon-stop",
        Last: "ui-icon-seek-first",
        Next: "ui-icon-seek-end",
        Swap: "ui-icon-newwin",
        Doc: "ui-icon-extlink"
    },
    CloseButtonIcon = {
        icons: { secondary: "ui-icon-close" }
    },
    LastPosition = new Point(0, 0),
    BoldTags = "b, strong, :header",
    $LoadingGif = $("#LoadingGif"),
    SlideSound = [],
    PlayerSound = [],

    LoadingSound = null,
    DropTextSound = null,
    HtmlDoc;
function V() {
    /// <summary>Get number of visits</summary>
    return parseInt(JCG("Visits", 1));
}
function JCS(key, value) {
    $.cookie(key, value, { expires: 365 });
}
function JCG(key, defaultValue) {
    return $.cookie(key) != undefined ? $.cookie(key) : defaultValue;
}
function ConvertObjectArray() {
    return $.map(ButtonIcons, function (el) { return el });
}
function GetWrapper() {
    return $(Wrp);
}
