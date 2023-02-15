/// <reference path="UIBehavior.js" />
/// <reference path="ApplicationConstants.js" />
/// <reference path="NavigatePage.js" />
var SettingPanelFunctions = new function () {
    var $SettingPanelHandle = $("#settingDragHandle");
    $("#settingPanelAccordion").accordion({
        heightStyle: "content",
        icons: {
            header: "ui-icon-circle-arrow-e",
            activeHeader: "ui-icon-circle-arrow-s"
        },
        beforeActivate: function () { SlideSound[2].play(); }
    });

    $(".SettingSliders").each(function () {
        var min = $(this).data("min"),
            max = $(this).data("max"),
            value = $(this).data("value"),
            step = $(this).data("step"),


            ValueDisplay = $(this).parent().prev().find(".SettingValueDisplay").text(value),

            Dragging = false;

        $(this).slider({
            min: min,
            max: max,
            value: value,
            step: step,
            change: ReflectChange,
            slide: ReflectChange
        });
        function ReflectChange(e, ui) {

            var Setting = this.id.replace("Slider", ""),
                value = ui.value;
            ValueDisplay.text(value);
            switch (Setting) {
                case PP:
                    UpdatePlaySpeedLabel();
                    StartPlayPage();
                    
                    break;
                case FS:
                    TextPlayerManager.CFS(value);
                    break;
                case SS:
                    TextPlayerManager.CSS(value);
                    break;
                case RS:
                    TextPlayerManager.CRS(value);
                    break;
                case WN:
                    TextPlayerManager.CWN(value);
                    break;
                case RN:
                    TextPlayerManager.CRN(value);
                    break;
                case TH:
                    ReloadPage();
                    break;
                case FZ:
                    TextPlayerManager.CFZ(value);
                    break;
                case LH:
                    TextPlayerManager.CLH(value);
                    break;
                case VL:
                    SetVolume();
                    break;
            }
            JCS(Setting, value);
        }
    })
        .parent().prev().find(".FineAdjustmentButtons").each(function () {
            var action = $(this).text();
            var SettingID = $(this).attr("id").replace(action, "");
            var icon = "ui-icon-circle-" + action.toLowerCase();
            var IntervalHolder;
            $(this).button({
                icons: {
                    primary: icon
                },
                text: false
            }).click(function () {
                SliderIncrement(SettingID, action == "Plus" ? 1 : -1);

                return false;
            }).mousedown(function () {
                IntervalHolder = setInterval(function () {
                    SliderIncrement(SettingID, action == "Plus" ? 1 : -1);
                }, 200);
            }).mouseup(function () {
                clearInterval(IntervalHolder);
            }).mouseleave(function () { clearInterval(IntervalHolder); });
        });
    $SettingPanelHandle.button({
        icons: { secondary: "ui-icon-arrow-4" }
    });
    $SP.draggable({
        handle: $SettingPanelHandle,
        containment: "window"
    });

    $("#settingClose").button(CloseButtonIcon).click(function () {
        ToggleSettingPanel();
        return false;
    });

    //$("#ThemeRow").JDXBT("ChangeTheme");
    $("#WordNumRow, #RowNumRow").JDXBT("PlayerSize");
    $("#FlashSpeedRow, #SlideSpeedRow, #RollSpeedRow").JDXBT("AdjustSpeed");

    ["Font", "Theme", FZ, LH, TH, VL].forEach(function (Parameter) {
        $(Format("#{0}Row", Parameter)).JDXBT(Parameter);
    });


    this.S = GetSlider;
    this.SI = SliderIncrement;
    this.OSP = SlideOpenSettingPane;
    this.CSP = CloseSettingPanel;
    this.TSP = ToggleSettingPanel;
    this.GSV = GetSliderValue;
    this.SSV = SetSliderValue;
    this.CT = ChangeTheme;
    this.SV = SetVolume;

    function SliderIncrement(SliderName, Multiplier) {
        var slider = GetSlider(SliderName);
        var CurrentValue = slider.slider("value");
        var Step = slider.data("step");
        SetSliderValue(SliderName, CurrentValue + Step * Multiplier);
    }
    function SetSliderValue(SliderName, Value) {
        GetSlider(SliderName).slider("value", Value);
    }
    function GetSlider(SliderName) {
        return $("#" + SliderName + "Slider");
    }
    function GetSliderValue(SliderName) {
        return GetSlider(SliderName).slider("value");
    }
    function SlideOpenSettingPane(PaneNumber) {
        $SP.fadeIn();
        $("#settingPanel .ui-accordion-header").eq(PaneNumber).trigger("click");
    }
    function CloseSettingPanel() {
        if ($SP.css("display") != "none") {
            $SP.fadeOut();
            SaveProfile();
        }
    }
    function ToggleSettingPanel() {
        if ($SP.is(":visible"))
            SaveProfile();
        TogglePanel($SP);
    }
    function ChangeTheme(theme) {
        $("#jQueryTheme").attr("href", Format("/themes/{0}/jquery-ui.min.css", theme));
        JCS("Theme", theme);
    }
    function SetVolume() {
        SlideSound.forEach(function (s) {
            s.volume = GSV(VL);
        })
        PlayerSound.forEach(function (s) {
            s.volume = GSV(VL);
        });
        LoadingSound.volume = GSV(VL);
        DropTextSound.volume = GSV(VL);
    }
}

var GSV = SettingPanelFunctions.GSV,
    SliderIncrement = SettingPanelFunctions.SI;



