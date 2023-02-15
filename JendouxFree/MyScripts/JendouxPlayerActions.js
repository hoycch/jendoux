/// <reference path="TextPlayerDimensions.js" />
function JPActions(TextAnimatorPointer, AnimatorModePointer, AllInterfaceElements) {

    this.CS = function () {
        TextAnimatorPointer.TA.CS();
    }
    this.WN = function () {

        ChangePanelWidth();
        TextAnimatorPointer.TA.WN();

    }
    this.RN = function () {

        ChangePanelHeight();
        TextAnimatorPointer.TA.RN();
        CenterText();

    }
    this.LH = function () {

        ChangePanelHeight();
        TextAnimatorPointer.TA.LH();
        CenterText();

        AllInterfaceElements.OT.css("line-height", JPDimensions.GLH() + "px");

    }
    this.FZ = function () {

        ChangePanelWidth();
        ChangePanelHeight();
        TextAnimatorPointer.TA.FZ();
        CenterText();
        AllInterfaceElements.OT.css("font-size", TextPlayerManager.FZ);

    }
    this.FT = function () {

        ChangePanelHeight();
        ChangePanelWidth();
        TextAnimatorPointer.TA.FT();
        AllInterfaceElements.OT.css("font-family", TextPlayerManager.FT);

    }
    this.HC = function () {
        TextAnimatorPointer.TA.HC();
    }
    this.C = CenterText;
    function ChangePanelWidth() {
        AllInterfaceElements.W.JDXSRZ().add(TextAnimatorPointer.TA.GT).css("width", JPDimensions.T().x);
        
        AllInterfaceElements.B.css("width", JPDimensions.Bo().x);
        AllInterfaceElements.P.css("width", JPDimensions.P().x);
        TextAnimatorPointer.TA.PGW();
        TextAnimatorPointer.TA.PGI();
        TextAnimatorPointer.TA.AGI();
    }
    function ChangePanelHeight() {
        AllInterfaceElements.W.css("height", JPDimensions.T().y).JDXSRZ();
        AllInterfaceElements.B.css("height", JPDimensions.Bo().y);
        AllInterfaceElements.P.css("height", JPDimensions.P().y);

        TextAnimatorPointer.TA.AGI();
    }

    function CenterText() {
        AllInterfaceElements.W.position({
            of: AllInterfaceElements.B,
            my: Format("left+{0} center", JPDimensions.TML),
            at: "left center",
            collision: "none"
        });
    }
}