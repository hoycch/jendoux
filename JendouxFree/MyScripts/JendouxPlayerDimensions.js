/// <reference path="ApplicationConstants.js" />
/// <reference path="TextPlayerManager.js" />
/// <reference path="SettingsPanelFunctions.js" />

var JPDimensions = new function () {
    var
        PanelSize,
        HeaderHeight = 25,
        HeaderPaddingY = 5,
        BodySize,
        TextWindowSize, //Text Container size padding excluded
        MinTextWindowWidth = 150,
        TextWindowMarginY = 5,
        TextWindowMarginLeft = 10,
        ButtonContainerSize = new Point(50, 105), //including padding
        ButtonContainerPadding = new Point(4, 20),
        FooterHeight = 40,
        GetSlider = SettingPanelFunctions.S;

    ReloadParameters();

    this.P = GetPanelSize;
    this.Min = GetMin;
    this.Max = GetMax;
    this.HH = HeaderHeight;
    this.HPY = HeaderPaddingY;
    this.Bo = GetBodySize;
    this.T = GetTextWindowSize;
    this.TMY = TextWindowMarginY;
    this.TML = TextWindowMarginLeft;
    this.Bu = ButtonContainerSize;
    this.BuP = ButtonContainerPadding;
    this.FH = FooterHeight;
    this.Rld = ReloadParameters;
    this.GLH = GetLineHeight;
    this.CX = ConstrainX;
    this.GWL = GetWordLine;
    this.GSD = GetSlideDistance;
    function GetPanelSize() {
        /// <summary>Get Panel Size</summary>
        return PanelSize;
    }
    function GetBodySize() {
        /// <summary>Get Body Size</summary>
        return BodySize;
    }
    function GetTextWindowSize() {
        /// <summary>Get Text Window Size</summary>
        return TextWindowSize;
    }
    function ReloadParameters() {
        /// <summary>Reload Parameters</summary>
        SetTextWindowSize();
        SetBodySize();
        SetPanelSize();
    }
    function SetPanelSize() {
        var
            width = BodySize.x + 2,
            height = HeaderHeight + BodySize.y + FooterHeight + 6;
        PanelSize = new Point(width, height);
    }
    function SetBodySize() {
        var
            width = TextWindowMarginLeft + (TextWindowSize.x > MinTextWindowWidth ? TextWindowSize.x : MinTextWindowWidth) + ButtonContainerSize.x,
            TextWindowTotalHeight = TextWindowSize.y + TextWindowMarginY * 2,
            height = TextWindowTotalHeight > ButtonContainerSize.y ? TextWindowTotalHeight : ButtonContainerSize.y;
        BodySize = new Point(width, height);
    }
    function SetTextWindowSize() {
        var
            width = TextPlayerManager.WN * WordWidth(),
            height = TextPlayerManager.RN * GetLineHeight();
        TextWindowSize = new Point(Math.ceil(width), height);
    }
    function GetLineHeight() {
        /// <summary>Get Line Height</summary>
        return TextPlayerManager.FZ + TextPlayerManager.LH;
    }
    function WordWidth() {
        return $(SelectedFontjQueryString).data("r") * TextPlayerManager.FZ;
    }
    function ConstrainX() {
        /// <summary>Get word width slot</summary>
        return GetSlider(WN).data("step") * WordWidth();
    }
    function GetWordLine(size) {
        /// <summary>Get number of word and number of line</summary>
        /// <returns type="Point">width, height</returns>
        var WordNum = size.width / WordWidth(),
            LineNum = size.height / GetLineHeight();
        return new Point(WordNum, LineNum);
    }
    function GetMin() {
        /// <summary>Get Minimum Text Container width</summary>
        return new Point(
            GetSlider(WN).data("min") * WordWidth() + TextWindowMarginLeft,
            GetLineHeight()
        )
    }
    function GetMax() {
        return new Point(
            /// <summary>Get Maximum Text Container Width</summary>
            GetSlider(WN).data("max") * WordWidth() + TextWindowMarginLeft,
            GetSlider(RN).data("max") * GetLineHeight() + TextWindowMarginY * 2
        )
    }
    function GetSlideDistance(TotalLength, MinSlideLength) {
        /// <summary>Get Slide Distance</summary>

        var RemainingDistance = TotalLength - MinSlideLength;
        return (RemainingDistance % MinSlideLength) / Math.floor(RemainingDistance / MinSlideLength) + MinSlideLength;
    }
}