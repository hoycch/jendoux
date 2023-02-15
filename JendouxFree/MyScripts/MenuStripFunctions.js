/// <reference path="ApplicationConstants.js" />
/// <reference path="TextPlayerManager.js" />
var MenuStripFunctions = new function () {
    var IsSelected = false,
        $ModeButton = $("#MSB_Mode");//Loading Gif

    $QT.keydown(function (e) {
        if (e.keyCode == 13) {
            submitQuery(e);
            return false; //must return or next button click will be triggered
        }
    }).keyup(function (e) {
        if (e.keyCode == 27)
            $(this).val(GetBaseUrl());
    }).click(false).mousedown(function () {
        var textbox = this
        if (textbox.selectionEnd == textbox.selectionStart)
            IsSelected = false;
        else
            IsSelected = true;

    }).mouseup(function () {
        if (!IsSelected)
            $(this).select();
    }).focus(function () {
        $(this).css("color", "black");
    });

    $("#MSB_Search").button({
        icons: { primary: "ui-icon-search" }
    }).click(false).mousedown(function (e) {
        switch (e.which) {
            case 1:
                submitQuery(e);
                break;
            case 2:
                var query = getSearchString();
                if (query.match(/^https?:\/\//i))
                    window.open(query);
                else
                    if (query.length > 0) {
                        window.open(JQS + query);
                    }
                return false;
                break;
            case 3:
                if (e.which == 3)
                    window.open(GetBaseUrl(), "_self");
                break;
        }
    }).contextmenu(false).mouseup(false).JDXBT("SearchButton");



    $ModeButton.button().click(function () {
        if ($MS_ModeButtonsWrapper.is(":visible"))
            SlideSound[1].play();
        else
            SlideSound[2].play();
        $MS_ModeButtonsWrapper.slideToggle();
        return false;
    }).JDXBT("PlayMode");
    ChangeModeButtonText();


    $MS_ModeButtons.css({
        margin: 0,
        minWidth: 100
    }).each(function () {
        $(this).button({
            icons: {
                primary: ButtonIcons[$(this).attr("id").replace(/(MSB_|Mode)/, "")]
            }
        }).click(function () {
            var mode = $(this).data("m");
            TextPlayerManager.CM(mode);
            ChangeModeButtonText();
            $MS_ModeButtonsWrapper.slideUp();
            return false;
        })
    });

    $("#MSB_DropText").button({
        icons: { primary: "ui-icon-extlink" }
    }).on("dragover", false).on("dragenter", false).on("drop", function (e) {
        DropTextSound.play();
        CustomReaderFuctions.DTI(e.originalEvent.dataTransfer.getData("text"))
        return false;
    }).click(function () {
        TogglePanel($CustomerReaderPanel);
        return false;
    }).JDXBT("DropText");



    $("#MSB_Settings").button({
        icons: { primary: "ui-icon-gear" }
    }).click(function () {
        SettingPanelFunctions.TSP();
        return false;
    });



    function getSearchString() {
        var query = $QT.val();
        query = query.replace(/^\s+/, "").replace(/\s+$/, "");
        return query;
    }
    function submitQuery(e) {
        var url = getSearchString();
        if (url.length > 0 && url != DefaultUrlText && url != $("#JendouxPageWrapper").data("url")) {
            var RE = new RegExp(Format("(http://)?{0}/?", window.location.host));
            url = url.replace(RE, ""); // prevent searching itself

            //if (!e.shiftKey) {
            //    PageHistoryManager.G(url);
            //}
            //else
            window.open(JQS + url, e.shiftKey ? "_blank" : "_self");
        }
    }


    function ChangeModeButtonText() {
        function GetModeText(ModeName) {
            return $(Format("#MSB_{0}Mode", ModeName)).text()
        }

        $MS_ModeButtons.css("color", "");
        var clickedButton = $(Format("#MSB_ModeOptions button[data-m={0}]", TextPlayerManager.M)).css("color", "blue");
        $ModeButton.button({
            icons: {
                primary: ConvertObjectArray()[TextPlayerManager.M],
                secondary: " ui-icon-triangle-1-s"
            },
            label: clickedButton.text()
        })
    }
}