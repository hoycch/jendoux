/// <reference path="ApplicationConstants.js" />
/// <reference path="UIBehavior.js" />
/// <reference path="MenuStripFunctions.js" />
/// <reference path="SettingsPanelFunctions.js" />
(function BindEvents() {


    var MouseDownPosition = new Point(0, 0), LastMouseDownPosition = new Point(0, 0);
    $(document)
        .click(function (e) {
            $(".ui-tooltip-content").remove();
            $("#MSB_ModeOptions").fadeOut();



            if (!$(e.target).parents().andSelf().is("a")) {


                $HyperlinkMenu.css("display", "none");
            }
        }).on(MousewheelEventName, function () {
            if ($html.is(":animated"))
                StopPlayPage();
        })
        .mousedown(function (e) {
            if (window.getSelection().toString() == "")
                MouseDownPosition = new Point(e.clientX, e.clientY);

        })
        .mouseup(function (e) {
            if (!$(e.target).parents().andSelf().is(".jendoux, #menuBar,#CustomReaderPanel, #settingPanel, #JendouxNewsFeed, #HyperlinkMenu, a, img") &&
                $PageMenu.css("visibility") == "hidden" &&
                !IsIdenticalPoints(e, LastMouseDownPosition) &&
                IsIdenticalPoints(e, MouseDownPosition) &&
                $HyperlinkMenu.css("display") == "none") {

                $PageMenu.css("visibility", "visible").position({
                    of: window,
                    my: "left top",
                    at: "left+" + e.clientX + " top+" + e.clientY,
                    collision: "flipfit flipfit"
                });

            }
            else
                if ($(e.target).parents("#PageMenu").length == 0) {
                    HidePageMenu();
                    StopPlayPage();
                }
            LastMouseDownPosition = new Point(e.clientX, e.clientY);
        })
        .keydown(function (e) {

            if (e.altKey && (e.keyCode == 48 | e.keyCode == 81)) {
                $QT.focus().select();
                ClearPanels();
            }
            if (e.keyCode == 9) {
                if (!$(":focus").is("[tabindex]")) {
                    $("[tabindex]").eq(0).focus();
                    e.preventDefault();
                }
            }
            if (!$QT.is(":focus")) {
                var OpenSettingPane = SettingPanelFunctions.OSP;

                if (e.keyCode == 27) {
                    ClearPanels();
                }

                if (e.ctrlKey) {
                    switch (e.keyCode) {
                        case 33: //page up
                            OpenSettingPane(1);
                            SliderIncrement(TH, 1);
                            return false;
                            break;
                        case 34: //page down
                            OpenSettingPane(1);
                            SliderIncrement(TH, -1);
                            return false;
                            break;
                        case 37: //left arrow
                            SliderIncrement(WN, -1);
                            return false;
                            break;
                        case 38: // down arrow
                            SliderIncrement(RN, -1);
                            return false;
                            break;
                        case 39: //right arrow
                            SliderIncrement(WN, 1);
                            return false;
                            break;
                        case 40: //up arrow
                            SliderIncrement(RN, 1);
                            return false;
                            break;
                            //case 188: //,
                            //    SliderIncrement(SS, 1);
                            //    break;
                            //case 190: //.
                            //    SliderIncrement(SS, -1);
                            //    break;
                        case 173: //-
                        case 189:
                            SliderIncrement(FZ, -1);
                            return false;
                            break;

                        case 61: //+
                        case 187:
                            SliderIncrement(FZ, 1);
                            return false;
                            break;
                        case 191: // /
                            OpenSettingPane(2);
                            $("#FontSelector").focus();
                            break;
                    }
                }
                if (e.altKey) {
                    switch (e.keyCode) {
                        case 33: //page up
                            //OpenSettingPane(3);
                            SliderIncrement(VL, 1);
                            return false;
                            break;
                        case 34: //page down
                            //OpenSettingPane(3);
                            SliderIncrement(VL, -1);
                            return false;
                            break;
                        case 49: //1
                            $MS_ModeButtons.eq(0).click()
                            break;
                        case 50: //2
                            $MS_ModeButtons.eq(1).click()
                            break;
                        case 51: //3
                            $MS_ModeButtons.eq(2).click()
                            break;
                        case 52://4
                            $MS_ModeButtons.eq(3).click()
                            break;
                            //case 188: //,
                            //    SliderIncrement(FS, -1);
                            //    break;
                            //case 190: //.
                            //    SliderIncrement(FS, 1);
                            //    break;
                        case 173: //-
                        case 189:
                            //OpenSettingPane(2);
                            SliderIncrement(LH, -1);
                            break;
                        case 61: //+
                        case 187:
                            //OpenSettingPane(2);
                            SliderIncrement(LH, 1);
                            break;
                        case 191: // /
                            OpenSettingPane(3);
                            $("#ThemeSelector").focus();
                            break;
                    }
                }
            }
        });
    function IsIdenticalPoints(Event, ComparePoint) {
        return Event.clientX == ComparePoint.x && Event.clientY == ComparePoint.y;
    }
})();
