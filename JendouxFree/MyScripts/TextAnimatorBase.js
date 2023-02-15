/// <reference path="ApplicationConstants.js" />
/// <reference path="TextPlayerManager.js" />
/// <reference path="jQueryExtension.js" />
/// <reference path="JendouxPlayerDimensions.js" />
/// <reference path="SettingsPanelFunctions.js" />

var GhostWindowParameters = new function () {
    this.b = 3,
    this.p = 12,
    this.GH = function () {
        return $(window).height() - (this.b + this.p) * 2;
    }
}
function TextAnimatorBase(HtmlContent, WordCount, AllInterfaceElements) {
    if (HtmlContent !== undefined) {
        var
            Header = AllInterfaceElements.H,
            HeaderText = AllInterfaceElements.HT,
            TextWindow = AllInterfaceElements.W,
            Footer = AllInterfaceElements.F,
            PlayButton = AllInterfaceElements.PBs.Play,
            TextContainerPointer = {
                $T: $("<p>").css({ //TextContainer
                    position: "relative",
                    fontSize: TextPlayerManager.FZ,
                    fontFamily: TextPlayerManager.FT,
                    lineHeight: JPDimensions.GLH() + "px",
                    display: "block",
                    padding: 0,
                    margin: 0,
                    border: 0
                }).addClass("ui-widget-content").html(HtmlContent).JDXTBG()
            },
            TextContainer = TextContainerPointer.$T,
            Slider, Handle,
            IntervalKeeper = null,

            GetIntervalTime = this.ITV,
            RepositionTextContainer = this.RP,
            GetSliderMax = this.Max,
            MoveAround = this.MV,

            //GetSpan = function () {
            //    return GeneratejQueryNode("span").css({
            //        lineHeight: 1,
            //        fontSize: 14
            //    });
            //},

            //$PlayTimeDisplay = GetSpan(),

            PositionGhostWindow = function () {
                /// <summary>Reposition Ghost Window</summary>
                if (GhostWindowExist()) {
                    GhostTextWindow.position(GetOutputPosition(AllInterfaceElements.P, GhostTextWindow)).css({
                        maxHeight: GhostWindowParameters.GH(),
                        overflowY: GhostTextWindow[0].scrollHeight > GhostTextWindow.outerHeight() ? "scroll" : "auto"
                    });
                    if (GhostTextWindow.offset().top < $(window).scrollTop())
                        GhostTextWindow.css("top", Format("+={0}px", GhostWindowParameters.b + GhostWindowParameters.p));
                    if (GhostTextWindow.height() == GhostWindowParameters.GH())
                        AllInterfaceElements.PBs.Doc.css("cursor", "url(images/scroll.cur), row-resize");

                    else
                        AllInterfaceElements.PBs.Doc.css("cursor", "default")
                }
            },
            GhostWindowExist = function () {
                /// <summary>Ghost Window is Exist</summary>
                return GhostTextWindow.parents("html").length > 0
            },
            GhostTextWindow = $("<p>").css({
                position: "absolute",
                display: "none",
                background: "white",
                borderStyle: "groove",
                borderWidth: GhostWindowParameters.b,
                padding: GhostWindowParameters.p,
                zIndex: 1001,
                maxHeight: GhostWindowParameters.GH()
            }).addClass("ui-front"),
            GhostTextContainer = $("<div>").css({
                width: JPDimensions.T().x,
                display: "block",
                padding: 0,
                fontSize: TextPlayerManager.FZ,
                fontFamily: TextPlayerManager.FT,
                lineHeight: JPDimensions.GLH() + "px",
                position: "relative",
                background: "white"
            }).appendTo(GhostTextWindow),
            TextWindowUnion = TextWindow.add(GhostTextWindow),
            TextContainerUnion = TextContainer.add(GhostTextContainer);


        this.GW = GhostTextWindow;
        this.GT = GhostTextContainer;
        this.OT = TextContainerPointer;

        this.$S = Slider;
        this.$H = Handle;
        this.Cur = CurrentStep;
        this.Stp = TotalSteps;
        this.HK = Hookup;

        this.Play = PlayPause;
        this.Stop = stop;
        this.Reset = Reset;
        this.UH = UpdateSpeedText;
        this.UF = UpdateFooter;
        this.F = GetFaction;
        this.FZ = function (IsInit) {
            TextContainerUnion.css({
                fontSize: TextPlayerManager.FZ,
                lineHeight: JPDimensions.GLH() + "px"
            });
            if (IsInit === undefined)
                UpdateFooter();
        };
        this.FT = function (IsInit) {
            TextContainerUnion.css("font-family", TextPlayerManager.FT);
            if (IsInit === undefined)
                UpdateFooter();
        };
        this.LH = function () {
            TextContainerUnion.css("line-height", JPDimensions.GLH() + "px");
            RepositionTextContainer();
        };
        this.HC = function () {
            /// <summary>Hyperlink Colour</summary>
            TextContainerUnion.find("a").css("color", TextPlayerManager.HC);
        }
        this.GWE = GhostWindowExist;
        this.PGW = PositionGhostWindow;
        this.Ind = $("<div>").css({
            width: JPDimensions.T().x,
            position: "absolute",
            display: "block",
            background: "darkSlateGray",
            opacity: 0.2
        });
        this.Scr = function (Direction) {
            if (GhostWindowExist()) {
                GhostTextWindow.finish().animate({ scrollTop: "+=" + JPDimensions.GLH() * 5 * Direction }, 300);
            }
        }
    }

    function TotalSteps(value) {
        if (arguments.length === 0)
            return Slider.slider("option", "max");
        else {
            Slider.slider("option", "max", value);
            RepositionTextContainer();
        }
    }

    function CurrentStep(value) {
        if (arguments.length === 0)
            return Slider.slider("value");
        else
            Slider.slider("value", value);
    }

    function SetNextFrame() {
        CurrentStep(CurrentStep() + 1);
        if (CurrentStep() != TotalSteps())
            IntervalKeeper = setTimeout(SetNextFrame, GetIntervalTime());
        else
            stop();
    }
    function PlayPause() {
        if (!PlayingIcon()) {
            PlayingIcon(true);
            PlayerSound[4].play();
        }
        Handle.focus();
        if (CurrentStep() == TotalSteps())
            CurrentStep(0);
        if (!IntervalKeeper)
            SetNextFrame();
        else
            stop();
    }
    function stop() {
        if (PlayingIcon()) {
            PlayerSound[5].play();
            PlayingIcon(false);
            clearTimeout(IntervalKeeper);
            IntervalKeeper = null;
        }
    }
    function Reset() {
        stop();
        CurrentStep(0);
    }
    function UpdateSpeedText() {
        HeaderText.text(Format("{0} {1} / {2} {3}", WordCount, WordText, new Number(TotalSteps() * GetIntervalTime() / 1000).toFixed(1), SecondText));
        //if (Slider !== undefined)

        //HeaderElements.T.text(new Number(TotalSteps() * GetIntervalTime() / 1000).toFixed(1) + " " + SecondText);
        //HeaderElements.W.text(WordCount + " " + WordText);

        //Header.empty().append($("<span>").css({
        //    lineHeight: 1,
        //    fontSize: 14
        //}).text(Format("{0} {1} / {2} {3}", WordCount, WordText, new Number(TotalSteps() * GetIntervalTime() / 1000).toFixed(1), SecondText)));
    }
    function UpdateFooter() {
        if (Slider !== undefined) {
            TotalSteps(GetSliderMax());
            Footer.find("canvas").remove().end().append(function () {
                var width = JPDimensions.P().x,
                    Total = TotalSteps(),
                    Dots = Total / TextPlayerManager.RN,
                    UseStroke = 3 * Dots > width / 2,
                    marker = $("<canvas>").attr({
                        height: 3,
                        width: JPDimensions.P().x
                    }),
                    grid = width / Total;

                if (marker[0].getContext) {
                    var ctx = marker[0].getContext("2d");
                    ctx.strokeStyle = ctx.fillStyle = TextPlayerManager.HC;


                    for (var i = 0; i < Dots; i++) {
                        var pos = i * grid * TextPlayerManager.RN;
                        if (UseStroke) {
                            ctx.moveTo(pos, 0);
                            ctx.lineTo(pos, 3);
                        }
                        else
                            ctx.rect(pos, 0, 3, 3);
                    }
                    if (UseStroke)
                        ctx.stroke();
                    else
                        ctx.fill();
                }
                return marker;
            });
        }
    }
    function GetFaction() {
        return Slider.slider("option", "value") / Slider.slider("option", "max");
    }
    function AdjustSpeedSwitch(Direction, Base) {
        switch (AllInterfaceElements.PBs.Swap.button("option", "icons").primary) {
            case ButtonIcons.FlashMode:
                SliderIncrement(FS, Direction - Base);
                break;
            case ButtonIcons.SlideMode:
                SliderIncrement(SS, Base - Direction);
                break;
            case ButtonIcons.RollMode:
                SliderIncrement(RS, Direction - Base);
                break;
        }
    }
    function Hookup(Faction, FocusMe) {
        TextWindow.children("p").remove().end().append(TextContainer);
        HeaderText.spinner({
            create: function (e, ui) {
                FormatSpinner(e.target);
            },
            spin: function (e, ui) {
                AdjustSpeedSwitch(GetSpinDirection(e.target), 0);
            }
        });
        var max = GetSliderMax();
        Slider = $("<div>").css({
            fontSize: 10,
            cursor: "pointer"
        }).slider({
            slide: RepositionTextContainer,
            change: RepositionTextContainer,
            value: Faction === null ? 0 : Math.round(Faction * max),
            max: max,
            animate: "fast"
        }).appendTo(Footer.empty());
        RepositionTextContainer();

        Handle = Slider.find(".ui-slider-handle").unbind("keydown").keydown(function (e) {
            var Key = e.keyCode;
            if (!e.ctrlKey && !e.altKey) {
                if ([33, 34, 35, 36, 38, 40].indexOf(Key) < 0)
                    e.preventDefault();

                switch (Key) {
                    case 9:
                        var tabs = $("[tabindex]").length,
                            currentTabIndex = parseInt($(":focus").attr("tabindex"));
                        $("[tabindex]").eq((currentTabIndex + (e.shiftKey ? -1 : 1)) % tabs).focus();
                        break;
                    case 32: //space
                    case 80: //p
                        PlayPause();
                        break;
                    case 37: //left arrow
                    case 73: //I
                        MoveAround(-1);
                        break;
                    case 39: //right arrow
                    case 79: //o
                        MoveAround(1);
                        break;
                    case 8: //backspace
                        Reset();
                        break;
                    case 13: //enter
                        AllInterfaceElements.PBs.Doc.click();
                        break;
                    case 49: //1
                    case 50: //2
                    case 51: //3
                    case 52://4
                        AllInterfaceElements.MBs.find(Format("button:eq({0})", e.keyCode % 49)).click().end().toggle();
                        break;
                    case 188: //,
                    case 190: //.
                        AdjustSpeedSwitch(Key, 189);
                        //switch (AllInterfaceElements.PBs.Swap.button("option", "icons").primary) {
                        //    case ButtonIcons.FlashMode:
                        //        SliderIncrement(FS, Key - 189)
                        //        break;
                        //    case ButtonIcons.SlideMode:
                        //        SliderIncrement(SS, 189 - Key)
                        //        break;
                        //    case ButtonIcons.RollMode:
                        //        SliderIncrement(RS, Key - 189)
                        //        break;
                        //}
                        break;
                }
            }
        });
        UpdateFooter();
        UpdateSpeedText();
        Handle.attr("tabindex", $(Wrp + " .ui-slider-handle").index(Handle));
        if (FocusMe)
            Handle.focus();
    }

    function PlayingIcon(setPlaying) {
        var PlayIcon = "ui-icon-play",
            PauseIcon = "ui-icon-pause";
        if (arguments.length) {
            PlayButton.button("option", "icons", { primary: setPlaying ? PauseIcon : PlayIcon });
        }
        else
            return PlayButton.attr("role") == "button" ? PlayButton.button("option", "icons").primary == PauseIcon : false;
    }

}
