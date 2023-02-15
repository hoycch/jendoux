/// <reference path="ApplicationConstants.js" />
/// <reference path="UIBehavior.js" />

var $PagePlayButton = $("#PagePlay"),
    $PageStopButton = $("#PageStop"),
    $ReturnLastButton = $("#ReturnLastPosition");

$PagePlayButton.button({
    icons: { primary: "ui-icon-play" }
}).click(StartPlayPage);
$PageStopButton.button({
    icons: { primary: "ui-icon-stop" }
}).click(StopPlayPage);

UpdatePlaySpeedLabel();
$PlaySpeedLabel.spinner({
    create: function (e, ui) {
        FormatSpinner(e.target).css({
            width: 55,
            background: "white",
            color: "black"
        });
    },
    spin: function (e, ui) {
        SliderIncrement(PP, -GetSpinDirection(e.target));

    }
});

$("#BackToTop").button({
    icons: { primary: "ui-icon-arrowreturnthick-1-n" }
}).click(function () {
    StopPlayPage();
    LastPosition = new Point(window.pageXOffset, window.pageYOffset);
    window.scrollTo(0, 0);
    $ReturnLastButton.toggle();
    return false;
});
$ReturnLastButton.button({
    icons: { primary: "ui-icon-refresh" }
}).click(function () {
    StopPlayPage();
    window.scrollTo(LastPosition.x, LastPosition.y);
    $(this).toggle();
    return false;
});

$PageMenu.find("*").on(MousewheelEventName, function (e) {
    SliderIncrement(PP, IsWheelUp(e) ? 1 : -1);
    return false;
}).end()
    .find("button").css({
        fontSize: 9,
        margin: 0,
        width: 120,
        textAlign: "left"
    }).not(":lt(2)").click(HidePageMenu);


function StartPlayPage() {
    var distance = ($html.height() - $(window).height() - $html.scrollTop());

    $PagePlayButton.css("display", "none");
    $PageStopButton.css("display", "");

    $html.stop().animate({ scrollTop: "+=" + distance }, distance / $(window).height() * GSV(PP) * 1000, "linear", StopPlayPage);
    return false;
}
function StopPlayPage() {
    $html.stop();
    $PagePlayButton.css("display", "");
    $PageStopButton.css("display", "none");
    return false;
}
function UpdatePlaySpeedLabel() {
    $PlaySpeedLabel.text(function () {
        return GSV(PP);
    })
}