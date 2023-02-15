/// <reference path="ApplicationConstants.js" />
/// <reference path="jQueryExtension.js" />
/// <reference path="parameters.js" />
/// <reference path="SettingsPanelFunctions.js" />
/// <reference path="TextPlayerParameters.js" />
/// <reference path="TextAnimatorBase.js" />
/// <reference path="JendouxPlayerElements.js" />
/// <reference path="TextAnimatorFlash.js" />
/// <reference path="TextAnimatorSlide.js" />
/// <reference path="TextAnimatorRoll.js" />
/// <reference path="JendouxPlayerEventBinder.js" />
/// <reference path="JendouxPlayerActions.js" />
function JPInterface(TextNode) {

    var
        $TextNode = $(TextNode),
        HtmlClone = TextNode.innerHTML,
        TotalWords = CountWord($TextNode.text()),
        CurAnimatorModePointer = { AM: -1 },
        AllInterfaceElements = new JPElements($TextNode.html()),
        //OriginalTextPanel = AllInterfaceElements.OT,
        TextAnimatorPointer = {
            TA: NullPlayer
        },
        PlayerActions = new JPActions(TextAnimatorPointer, CurAnimatorModePointer, AllInterfaceElements),
        EventBinder = new JPEventBinder(AllInterfaceElements, TextAnimatorPointer, CurAnimatorModePointer, ChangeMode);


    TextNode.tagName = "div";

    ChangeMode(TextPlayerManager.M, false);
    this.CS = PlayerActions.CS;
    this.WN = PlayerActions.WN;
    this.RN = PlayerActions.RN;
    this.FZ = PlayerActions.FZ;
    this.FT = PlayerActions.FT;
    this.LH = PlayerActions.LH;
    this.HC = PlayerActions.HC;
    this.CM = ChangeMode;
    this.Stop = TextAnimatorPointer.TA.Stop;

    function ChangeMode(TargetMode, FocusSlider) {
        if (arguments.length == 0)
            TargetMode = TextPlayerManager.M;
        var CurrentMode = CurAnimatorModePointer.AM, Factor = TextAnimatorPointer.TA.F();
        if (CurrentMode != TargetMode) {
            TextAnimatorPointer.TA.Stop();
            TextAnimatorPointer.TA.GW.remove();
            if (TargetMode == 0) { // to document mode // player/null -> document mode
                $TextNode.empty().append(AllInterfaceElements.OT);
                AllInterfaceElements._DB(); //buttonize
                EventBinder.BDE();
            }
            else { // to players

                function GetAnimator(Mode) {
                    if (Mode == 1)
                        return new _TAF(HtmlClone, TotalWords, AllInterfaceElements);
                    if (Mode == 2)
                        return new _TAS(HtmlClone, TotalWords, AllInterfaceElements);
                    if (Mode == 3)
                        return new _TAR(HtmlClone, TotalWords, AllInterfaceElements);
                }
                TextAnimatorPointer.TA = GetAnimator(TargetMode);
                if (CurrentMode < 1) { // null/doc -> player
                    $TextNode.empty().append(AllInterfaceElements.P);

                    AllInterfaceElements.P.draggable({
                        handle: AllInterfaceElements.H,
                        containment: "window"
                    });


                    PlayerActions.WN(); //set for if parameters changed while it's text mode
                    PlayerActions.RN();

                    AllInterfaceElements.W.JDXSRZ(); //set resizable
                    AllInterfaceElements._PB(); //buttonize
                    EventBinder.BPE();
                    PlayerActions.C();

                }

                AllInterfaceElements.PBs.Swap.button("option", "icons", { primary: ConvertObjectArray()[TargetMode] });

                TextAnimatorPointer.TA.HK(Factor, FocusSlider);

            }
            CurAnimatorModePointer.AM = TargetMode;
            $TextNode.find("a").each(function () {
                $(this).JDXBCL();
            });
        }
    }
}

var NullPlayer = { //Do not remove for Doc is the initial mode
    HK: NullFunction,
    CS: NullFunction,
    WN: NullFunction,
    RN: NullFunction,
    FZ: NullFunction,
    FT: NullFunction,
    LH: NullFunction,
    HC: NullFunction,
    Stop: NullFunction,
    F: NullFunction,
    GT: $("<p>"),
    GW: $("<p>"),
    PGW: NullFunction,
    PGI: NullFunction,
    AGI: NullFunction,
    Scr: NullFunction
}
function NullFunction() {
    return null;
}