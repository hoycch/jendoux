/// <reference path="ApplicationConstants.js" />
/// <reference path="SettingsPanelFunctions.js" />
/// <reference path="jQueryExtension.js" />
/// <reference path="JendouxPlayerInterface.js" />
var JPEventBinder = function (AllInterfaceElements, TextAnimatorPointer, AnimatorModePointer, ChangeMode) {
    this.BPE = function () {
        /// <summary>Bind Player Events</summary>

        var PlayerButtons = AllInterfaceElements.PBs;


        AllInterfaceElements.H.on(MousewheelEventName, function (e) {
            var AnimatorMode = AnimatorModePointer.AM;

            SliderIncrement(AllSliders[AnimatorMode - 1], Math.round(Math.tan((IsWheelUp(e) ? 1 : -1) * (2 * AnimatorMode - 1) * Math.PI / 4)));

            return false;
        });

        var MouseDownPosition = null, MouseDownTarget;

        AllInterfaceElements.B.on(MousewheelEventName, function (e) {
            if (!$(e.target).parents().is(AllInterfaceElements.PBs.Doc)) {
                TextAnimatorPointer.TA.MV(IsWheelUp(e) ? -1 : 1);
                return false;
            }
        }).mousedown(function (e) {
            if (TargetIsContent(e))
                switch (e.which) {
                    case 1:
                        MouseDownPosition = new Point(e.clientX, e.clientY);
                        MouseDownTarget = e.target;
                        break;
                    case 2:
                        ChangeMode((AnimatorModePointer.AM + (e.shiftKey ? 3 : 1)) % 4, true); //firefox will not fire mouseup when false is returned
                        return false;
                        break;
                    case 3:
                        TextAnimatorPointer.TA.Reset();
                        $(this).contextmenu(false);
                        break;
                }
            else
                $(this).unbind("contextmenu");
        }).mouseup(function (e) {
            if (
                    TargetIsContent(e) &&
                    e.target.nodeName.toLowerCase() != "a" &&
                    !$(MouseDownTarget).is(".ui-resizable-handle") &&
                    e.which == 1 &&
                    CheckClick(MouseDownPosition, e)
                )
                TextAnimatorPointer.TA.Play();
            MouseDownPosition = null;

        });
        AllInterfaceElements.F.on(MousewheelEventName, function (e) {
            SliderIncrement(FZ, IsWheelUp(e) ? 1 : -1);
            return false;
        });
        PlayerButtons.Play.click(function () {
            TextAnimatorPointer.TA.Play();
            return false;
        });
        PlayerButtons.Stop.click(function () {
            TextAnimatorPointer.TA.Reset();
            return false;
        });
        PlayerButtons.Next.click(function () {
            TextAnimatorPointer.TA.MV(1);
            return false;
        });
        PlayerButtons.Last.click(function () {
            TextAnimatorPointer.TA.MV(-1);
            return false;
        });
        PlayerButtons.Swap.click(function () {
            var ModeButtons = AllInterfaceElements.MBs;

            ModeButtons.toggle("fade").position({
                of: this,
                my: "right+20 top",
                at: "right bottom"
            }).children().removeClass("ui-state-highlight").end()
                .children().eq((AnimatorModePointer.AM + 3) % 4).addClass("ui-state-highlight");

            return false;
        });
        PlayerButtons.Doc.hoverIntent(function () {
            var TextAnimator = TextAnimatorPointer.TA;
            TextAnimator.GW.appendTo($RP).fadeIn(300);
            TextAnimator.PGW();
            TextAnimator.PGI();
            TextAnimator.AGI();
        }, function () {
            TextAnimatorPointer.TA.GW.fadeOut(250, function () {
                $(this).remove();
            });
        }).on(MousewheelEventName, function (e) {
            TextAnimatorPointer.TA.Scr(IsWheelUp(e) ? -1 : 1)
            return false;
        })
        .click(function () {

            var parent = $("<div class='ui-corner-all'>").css({
                width: JPDimensions.T().x,
                display: "inline-block",
                position: "absolute",
                border: "1px solid",
                cursor: "move",
                padding: "1em",
                background: "white",
                display: "none",
                zIndex: 1002
            }),
            ButtonStyle = {
                fontSize: 10,
                margin: 3,
                float: "left"
            },
            ButtonArea = $("<div>").css({
                display: "block",
                height: 30
            }).append(
                    $("<button>").text(EnlargeText).css(ButtonStyle)
                ).append(
                    $("<button>").text(ShrinkText).css(ButtonStyle)
                ).append(
                    $("<button>").text(CloseText).css(ButtonStyle).css("float", "right")
                ),
            TextArea = $("<div>").css({
                display: "block",
                lineHeight: 1.2
            }).html(AllInterfaceElements.OT.html())
                .find("div:last").remove().end()
            .find("img").css({
                maxWidth: JPDimensions.T().x
            }).end();

            parent.append(ButtonArea).append(TextArea).appendTo($RP).draggable().resizable({ handles: "e" }).position(GetOutputPosition(AllInterfaceElements.P, parent)).toggle("slide");

            ButtonArea
                .find("button:first").button({ icons: { primary: "ui-icon-circle-zoomin" } }).click(function () {
                    TextArea.css("font-size", "+=3");
                    return false;
                }).end()
                .find("button:eq(1)").button({ icons: { primary: "ui-icon-circle-zoomout" } }).click(function () {
                    TextArea.css("font-size", "-=3");
                    return false;
                }).end()
                .find("button:last").button(CloseButtonIcon).click(function () {
                    parent.remove();
                    return false;
                });

            TextArea.dblclick(function () {
                $(this).remove();
            }).find("a").each(function () {
                $(this).JDXBCL()
            });

            PlayerSound[3].play();

            return false;
        });




        AllInterfaceElements.MBs.children().each(function () {
            $(this).click(function () {
                ChangeMode(($(this).index() + 1) % 4, true);
                $(this).parent().toggle("fade");
                return false;
            });
        });
    }
    this.BDE = function () {
        /// <summary>Bind Document Events</summary>
        var DocButtons = AllInterfaceElements.DBs;

        Object.keys(DocButtons).forEach(function (key, index) {
            DocButtons[key].click(ChangeModeExecutor(index + 1));
        })
        function ChangeModeExecutor(index) {
            return function () {
                ChangeMode(index, true);
            };
        }
        TextAnimatorPointer.TA = NullPlayer;
        AllInterfaceElements.OT.mousedown(function (e) {
            if (e.which == 2 && !$(e.target).is("a")) {
                ChangeMode(e.shiftKey ? 3 : 1, true);
            }
        });
    }
    function TargetIsContent(e) {
        return !$(e.target).is("a") && $(e.target).parents().andSelf().hasClass("ui-resizable");
    }
}