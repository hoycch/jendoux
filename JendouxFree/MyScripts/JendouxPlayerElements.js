/// <reference path="SettingsPanelFunctions.js" />
/// <reference path="JendouxPlayerDimensions.js" />
/// <reference path="jQueryExtension.js" />
function JPElements(ContentHtml) {


    this.PBs = { //Buttons in Player
        Play: {},
        Stop: {},
        Last: {},
        Next: {},
        Swap: {},
        Doc: {}
    };

    this.DBs = {
        FlashMode: {},
        SlideMode: {},
        RollMode: {}
    };
    this.OT = $("<div>").html(ContentHtml).css({
        margin: 0,
        padding: 0,
        border: 0,
        fontSize: GSV(FZ),
        lineHeight: JPDimensions.GLH() + "px",
        fontFamily: TextPlayerManager.FT
    }).prepend($("<div>").css({
        margin: 0,
        padding: "8px 0",
        border: 0
    }).addClass("ui-widget-header")).addClass("ui-widget-content");

    /////// Completed Document Creation /////////
    this.P = $("<div>").css({  // Panel
        width: JPDimensions.P().x,
        height: JPDimensions.P().y,
        border: "solid",
        margin: "3px 0",
        display: "inline-block",
        textIndent: 0,
        lineHeight: 1,
        position: "relative",
        boxSizing: "content-box"
    });

    this.H = $("<div>").css({ // Header
        height: JPDimensions.HH - JPDimensions.HPY * 2 + "px",
        textAlign: "right",
        padding: Format("{0}px 10px {0}px 5px", JPDimensions.HPY),
        lineHeight: 1,
        cursor: "move",
        boxSizing: "content-box"
    }).addClass("ui-widget-header").appendTo(this.P);
    
    this.HT = GeneratejQueryNode("span").css({
        lineHeight: 1,
        fontSize: 14
    }).appendTo(this.H);
    

    this.W = $("<div>").css({
        float: "left",//text window
        width: JPDimensions.T().x,
        height: JPDimensions.T().y,
        padding: 0,
        overflow: "hidden",
        boxSizing: "content-box"
    }).JDXSRZ();

    this.B = $("<div>").addClass("ui-widget-content").css({ //Body
        width: JPDimensions.Bo().x,
        height: JPDimensions.Bo().y,
        margin: 0,
        padding: 0,
        lineHeight: 1,
        boxSizing: "content-box"
    });
    this.F = $("<div>").css({
        height: JPDimensions.FH - 10,
        padding: 0,
        paddingTop: 10,
        lineHeight: 1,
        boxSizing: "content-box"
    }).addClass("ui-state-default");

    this.MBs = $("<div>").css({ //mode buttons
        padding: 3,
        position: "absolute",
        height: 20,
        width: 80,
        display: "none",
        margin: 0,
        padding: 0,
        boxSizing: "content-box"
    }).addClass("ui-state-highlight ui-front").appendTo(this.P);


    var Panel = this.P,
        PlayerButtons = this.PBs,
        DocButtons = this.DBs,
        Body = this.B.appendTo(this.P),
        TextWindow = this.W.appendTo(Body),

        PlayerButtonContainer = $("<div>").css({
            float: "right",
            width: JPDimensions.Bu.x - JPDimensions.BuP.x * 2,
            height: JPDimensions.Bu.y - JPDimensions.BuP.y * 2,
            textAlign: "right",
            padding: Format("{0}px {1}px", JPDimensions.BuP.y, JPDimensions.BuP.x),
            lineHeight: 1,
            boxSizing: "content-box"
        }).appendTo(Body),

        Footer = this.F.appendTo(this.P),
        ModeButtons = this.MBs;

    for (var Button in DocButtons) {
        DocButtons[Button] = $("<button>")
            .css({
                fontSize: 10,
                margin: 0
            })
            .text(window[Button + "Text"])
            .appendTo(this.OT.find("div:first"));
    }

    for (var button in PlayerButtons) {
        PlayerButtons[button] = $("<button>").css({
            fontSize: 8,
            margin: 0,
            padding: 0,
            lineHeight: 1,
            cursor: "default"
        }).text(window[button + "Text"])
            .appendTo(PlayerButtonContainer);
    }

    //if (V() < 4) {
    //    this.F.css("cursor", "url(images/scroll.cur), row-resize");
    //    this.H.css("cursor", "url(images/dragScroll.cur), row-resize");
    //    this.W.css("cursor", "url(images/clickScroll.cur), row-resize");
    //}

    $MS_ModeButtons.each(function () {
        $("<button>").css("font-size", 8).text($(this).text()).data("icon", $(this).button("option", "icons").primary).appendTo(ModeButtons);
    })
    this._PB = function () { // buttonize player button
        /// <summary>Buttonize Player Buttons</summary>
        for (var Button in PlayerButtons) {
            PlayerButtons[Button].button({
                text: false,
                icons: {
                    primary: ButtonIcons[Button]
                }
            })
        }
        ModeButtons.css("display", "none").children().each(function () {
            $(this).button({
                text: false,
                icons: {
                    primary: ConvertObjectArray(ButtonIcons)[($(this).index() + 1) % 4]
                }
            });
        });

        if (V() == 1)
            PlayerButtons.Play.css({
                "background-image": "url(images/highlight.png)"
            });
    }
    this._DB = function () {
        /// <summary>Buttonize Document Buttons</summary>
        for (var Button in DocButtons) {
            DocButtons[Button].button({
                icons: {
                    primary: ButtonIcons[Button]
                }
            });
        }
    }
}