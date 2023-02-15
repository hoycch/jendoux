/// <reference path="ApplicationConstants.js" />
/// <reference path="TextPlayerDimensions.js" />
/// <reference path="TextAnimatorBase.js" />
/// <reference path="TextContentRestyle.js" />
/// <reference path="parameters.js" />
/// <reference path="JendouxPlayerDimensions.js" />
function _TAS(HtmlContent, WordCount, AllInterfaceElements) {

    this.ITV = GetIntervalTime;
    this.RP = RepositionTextContainer;
    this.Max = GetSliderMax;
    this.MV = MoveAround;
    TextAnimatorBase.call(this, HtmlContent, WordCount, AllInterfaceElements);

    var
        TextWindow = AllInterfaceElements.W,
        TextContainer = this.OT.$T,
        Slider = this.$S,
        Handle = this.$H,
        TotalSteps = this.Stp,
        CurrentStep = this.Cur,
        stop = this.Stop,
        GhostTextWindow = this.GW,
        GhostTextContainer = this.GT,
        GhostWindowExist = this.GWE,
        Indicator = this.Ind;

    TextContainer.find("a").JDXTBG().end().find("img").css("max-width", JPDimensions.T().x);

    this.HC();

    InitGhostIndicator();

    return {
        HK: this.HK, // hook up player
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
        PlayerSound[1].play();
        var
            SliderValue = (ui === undefined ? CurrentStep() : ui.value),
            MinSlideDistance = JPDimensions.GLH(),
            RemainingDistance = TextContainer.height() - MinSlideDistance * GSV(RN),
            SlideSlot = (RemainingDistance % MinSlideDistance) / Math.floor(RemainingDistance / MinSlideDistance) + MinSlideDistance,
            SlideDistance = SliderValue * SlideSlot;

        TextContainer.position({
            of: TextWindow,
            my: Format("left top-{0}", SlideDistance),
            at: "left top",
            collision: "none",
            using: function (position) {
                $(this).finish().animate(position, $(this).position().top > position.top ? GetIntervalTime() : 100, "linear");
            }
        });
        PositionGhostIndicator(SlideDistance);
    }
    function GetSliderMax() {
        var result = Math.floor(TextContainer.height() / JPDimensions.GLH() - GSV(RN));
        return result > 0 ? result : 0;
    }

    function GetIntervalTime() {
        return TextPlayerManager.SS * 1000;
    }
    function MoveAround(direction) {
        stop();
        CurrentStep(CurrentStep() + direction);
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
    function PositionGhostIndicator(SlideDistance) {
        if (GhostWindowExist())
            Indicator.position({
                of: GhostTextContainer,
                my: Format("center top+{0}", CurrentStep() * JPDimensions.GSD(TextContainer.height(), JPDimensions.GLH())),
                collision: "none",
                at: "center top",
                using: SlideDistance === undefined ? null : function (position) {
                    $(this).finish().animate(position, $(this).position().top < position.top ? GetIntervalTime() : 100, "linear");
                }
            })
    }
}
_TAS.prototype = new TextAnimatorBase();