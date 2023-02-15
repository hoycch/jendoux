/// <reference path="ApplicationConstants.js" />

var facebookComment = $("#FacebookComment"),
    facebookHandle = $("#FacebookHandle"),
    facebookSlideButton = $("#FacebookSlideButton");
facebookSlideButton.button({
    icons: {
        primary: "ui-icon-circle-arrow-s"
    }
}).click(function () {
    var Opened = facebookComment.position().left == $(window).width() - facebookComment.width();
    facebookSlideButton.button({
        icons: {
            primary: "ui-icon-circle-arrow-" + (Opened ? "s" : "n")
        }
    });
    facebookComment.animate({
        left: Opened ? $(window).width() : $(window).width() - facebookComment.width()

    })
    return false;
}).tooltip({
    track: true
});

facebookHandle.position({
    of: "#FacebookComment",
    at: "left top",
    my: Format("center-{0}-40 center-{1}", facebookHandle.height() / 2, facebookHandle.width())
});
RepositionFacebookComment();

function RepositionFacebookComment() {
    facebookComment.position({
        of: window,
        at: "right center",
        my: "left center"
    });
}

$(window).resize(RepositionFacebookComment);