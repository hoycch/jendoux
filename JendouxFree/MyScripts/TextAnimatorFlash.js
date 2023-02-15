/// <reference path="ApplicationConstants.js" />
/// <reference path="SettingsPanelFunctions.js" />
/// <reference path="TextPlayerDimensions.js" />
/// <reference path="jQueryExtension.js" />
/// <reference path="TextAnimatorBase.js" />
/// <reference path="TextContentRestyle.js" />
/// <reference path="parameters.js" />

function _TAF(HtmlContent, WordCount, AllInterfaceElements) {
    this.ITV = GetIntervalTime;
    this.RP = RepositionTextContainer;
    this.Max = GetSliderMax;
    this.MV = MoveAround;
    TextAnimatorBase.call(this, HtmlContent, WordCount, AllInterfaceElements);


    var TextWindow = AllInterfaceElements.W,
        TextContainer = this.OT.$T,
        Slider = this.$S,
        Handle = this.$H,
        TotalSteps = this.Stp,
        CurrentStep = this.Cur,
        Stop = this.Stop,
        GhostTextWindow = this.GW,
        GhostTextContainer = this.GT,
        GhostWindowExist = this.GWE,
        Indicator = this.Ind;


    TextContentRestyle.SS(TextContainer);

    this.HC();

    InitGhostIndicator();

    return {
        HK: this.HK,
        CS: this.UH,
        WN: this.UF,
        RN: this.UF,
        FZ: this.FZ,
        FT: this.FT,
        LH: this.LH,
        HC: this.HC,
        MV: MoveAround,
        Play: this.Play,
        Stop: this.Stop,
        Reset: this.Reset,
        F: this.F,
        GT: this.GT,
        GW: this.GW,
        PGW: this.PGW, // PositionGhostWindow
        PGI: PositionGhostIndicator,
        AGI: AdjustGhostIndicator,
        Scr: this.Scr
    }

    function RepositionTextContainer(e, ui) {

        var
            SliderValue = (ui === undefined ? CurrentStep() : ui.value),
            FirstRow = Math.floor(SliderValue / TextPlayerManager.RN) * TextPlayerManager.RN;
        if (!(SliderValue % TextPlayerManager.RN))
            PlayerSound[0].play();
        TextContainer.position({
            of: TextWindow,
            my: Format("left top-{0}", FirstRow * JPDimensions.GLH()),
            at: "left top",
            collision: "none"
        });
        PositionGhostIndicator();
    }
    function GetSliderMax() {
        var result = Math.ceil(TextContainer.height() / JPDimensions.GLH()) - 1;
        return result > 0 ? result : 0;
    }
    function GetIntervalTime() {
        return TextPlayerManager.WN * 1000 / TextPlayerManager.FS;
    }

    function MoveAround(direction) {
        Stop();
        CurrentStep(CurrentStep() + direction * TextPlayerManager.RN);
    }
    function InitGhostIndicator() {
        GhostTextContainer.html(TextContainer.html());
        Indicator.css({
            height: JPDimensions.T().y
        }).appendTo(GhostTextWindow);
    }
    function AdjustGhostIndicator() {
        Indicator.css({
            width: JPDimensions.T().x,
            height: JPDimensions.T().y
        });
    }
    function PositionGhostIndicator() {
        if (GhostWindowExist())
            Indicator.position({
                of: GhostTextContainer,
                my: Format("center top+{0}", Math.floor(CurrentStep() / TextPlayerManager.RN) * TextPlayerManager.RN * JPDimensions.GLH()),
                collision: "none",
                at: "center top"
            })
    }
}
_TAF.prototype = new TextAnimatorBase();
