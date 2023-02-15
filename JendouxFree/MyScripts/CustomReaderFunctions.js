/// <reference path="ApplicationConstants.js" />
/// <reference path="TextPlayerManager.js" />
/// <reference path="TextPlayerInterface.js" />
var CustomReaderFuctions = new function () {
    var
        $Handle = $("#CustomReaderHandle"),
        $ReaderNode = $("#CustomReaderNode"),
        $TextArea = $("#CustomTextInsert"),
        MyPlayer;


    $CustomerReaderPanel.draggable({
        handle: $Handle,
        containment: "window"
    });
    $Handle.button({ icons: { secondary: "ui-icon-arrow-4" } });
    $("#customReaderClose").button(CloseButtonIcon).click(function () {
        TogglePanel($CustomerReaderPanel);
        return false;
    });
    $("#GenerateCustomReader").button({
        icons: { primary: "ui-icon-circle-plus" }
    }).click(function () {
        InitReader();
        return false;
    });

    this.DTI = DragTextIn;
    this.CCR = CenterCustomReader;
    this.CP = ClosePanel;

    function DragTextIn(text) {
        $CustomerReaderPanel.slideDown();
        $TextArea.val(text).removeClass("watermarked");
        InitReader();
    }

    function InitReader() {
        var text = $TextArea.val().replace(/\x0A/g, "<br />");

        if (text.length > 0) {
            $ReaderNode.html(text);
            MyPlayer = new JPInterface($ReaderNode.get(0));
            TextPlayerManager.HKC(MyPlayer);
            CenterCustomReader();
        }
    }

    function CenterCustomReader() {
        //$TextArea.attr("cols", Math.ceil(JPDimensions.P().x / 10)) + 2;
        $CustomerReaderPanel.css({
            width: JPDimensions.P().x + 80
        });
        $ReaderNode.position({
            of: "#CustomReaderContainer",
            my: "center center",
            at: "center center"
        });
    }
    function ClosePanel() {
        TextPlayerManager.StopCR();
        $CustomerReaderPanel.fadeOut();
    }
}