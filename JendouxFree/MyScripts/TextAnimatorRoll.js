/// <reference path="TextAnimatorBase.js" />
/// <reference path="TextPlayerManager.js" />
/// <reference path="jQueryExtension.js" />
function _TAR(HtmlContent, WordCount, AllInterfaceElements) {

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
    InitGhostIndicator();

    TextContainer.css({
        height: JPDimensions.GLH() + "px",
        whiteSpace: "nowrap",
        display: "inline-block"
    }).find("br").replaceWith("<span style='width: 50px; height:10px; display:inline-block'>");
    this.HC();

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
        var SliderValue = (ui === undefined ? CurrentStep() : ui.value),
            MinSlideDistance = JPDimensions.T().x,
            RemainingDistance = TextContainer.width() - MinSlideDistance,
            SlideDistance = (RemainingDistance % MinSlideDistance) / Math.floor(RemainingDistance / MinSlideDistance) + MinSlideDistance;

        PlayerSound[2].play();

        TextContainer.position({
            of: TextWindow,
            my: Format("left-{0} center", SliderValue * SlideDistance),
            at: "left center",
            collision: "none",
            using: function (position) {
                $(this).finish().animate(position, $(this).position().left > position.left ? GetIntervalTime() : 100, "linear");
            }
        });
        PositionGhostIndicator();
    }
    function GetSliderMax() {
        var result = Math.floor(TextContainer.width() / JPDimensions.T().x) - 1;
        return result > 0 ? result : 0;
    }
    function GetIntervalTime() {
        return TextPlayerManager.WN * 1000 / TextPlayerManager.RS;
    }

    function MoveAround(direction) {
        Stop();
        CurrentStep(CurrentStep() + direction);
    }
    function InitGhostIndicator() {

        GhostTextContainer.html(TextContainer.html());
        Indicator.css({
            height: JPDimensions.GLH()
        }).appendTo(GhostTextWindow);
    }
    function AdjustGhostIndicator() {
        if (GhostWindowExist())
            Indicator.css({
                width: JPDimensions.T().x,
                height: JPDimensions.GLH()
            });
    }
    function PositionGhostIndicator(IsInit) {
        if (GhostWindowExist()) {
            var Distance = (GhostTextContainer.height() - JPDimensions.GLH()) * CurrentStep() / TotalSteps();
            //var Remainder = TextContainer.height() % JPDimensions.GLH(),

            Indicator.position({
                of: GhostTextContainer,
                my: Format("center top+{0}", Distance),
                at: "center top",
                collsion: "none",
                using: IsInit ? null : function (position) {
                    $(this).finish().animate(position, $(this).position().top < position.top ? GetIntervalTime() : 100, "linear");
                }
            })

        }

    }
}
_TAR.prototype = new TextAnimatorBase();