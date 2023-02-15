/// <reference path="TextPlayerInterface.js" />
/// <reference path="TextPlayerDimensions.js" />
/// <reference path="CustomReaderFunctions.js" />
/// <reference path="ApplicationConstants.js" />
/// <reference path="UIBehavior.js" />
var TextPlayerManager = new function () {
    var TextPlayers = [], CustomPlayer, TotalTimeDisplay = GetTableCell();
    this.init = function (jQueryCollection) {
        TextPlayers = [];
        jQueryCollection.each(function () {
            if ($(this).css("display") != "none")
                TextPlayers.push(new JPInterface(this));
            else
                $(this).remove();
        });
        if (jQueryCollection.length > 0) {
            GetWrapper().prepend(GetSummaryDiv());
        }
    }
    this.FS = GSV(FS);
    this.SS = GSV(SS);
    this.RS = GSV(RS);
    this.WN = GSV(WN);
    this.RN = GSV(RN);
    this.FZ = GSV(FZ);
    this.FT = $(SelectedFontjQueryString).val();
    this.LH = GSV(LH);

    this.M = parseInt(JCG("Mode", "0")); // operation mode

    this.HC = "#" + $("#HighlightColor").val();
    this.CFS = function (value) {
        EnactAllPlayers("CS", false, value, "FS");
        UpdateTotalTime();
    };
    this.CSS = function (value) {
        EnactAllPlayers("CS", false, value, "SS");
        UpdateTotalTime();
    };
    this.CRS = function (value) {
        EnactAllPlayers("CS", false, value, "RS");
        UpdateTotalTime();
    }
    this.CWN = function (value) {
        EnactAllPlayers("WN", true, value);
    };
    this.CRN = function (value) {
        EnactAllPlayers("RN", true, value);
    };
    this.CFZ = function (value) {
        EnactAllPlayers("FZ", true, value);
    };
    this.CLH = function (value) {
        EnactAllPlayers("LH", true, value);
    };
    this.CFT = function () {
        EnactAllPlayers("FT", true, $(SelectedFontjQueryString).val());
    };
    this.CHC = function () {
        EnactAllPlayers("HC", false, "#" + $("#HighlightColor").val());
    };
    this.CM = function (value) { //change mode
        TextPlayerManager.M = value;
        SaveProfile();
        EnactAllPlayers("CM");
        UpdateTotalTime();
    }
    this.HKC = function (player) { //hookup custom player
        CustomPlayer = player;
    }
    this.Stop = function () {
        TextPlayers.forEach(function (player) {
            player.Stop();
        });
    }
    this.StopCR = function () {
        if (CustomPlayer !== undefined)
            CustomPlayer.Stop();
    }
    function EnactAllPlayers(ActionName, AdjustPlayerSize, value, OtherParameter) {
        if (value !== undefined)
            TextPlayerManager[OtherParameter === undefined ? ActionName : OtherParameter] = value;
        if (AdjustPlayerSize === true) {
            JPDimensions.Rld();
        }
        if (CustomPlayer !== undefined) {
            CustomPlayer[ActionName]();
            CustomReaderFuctions.CCR();
        }
        TextPlayers.forEach(function (player) {
            player[ActionName]();
        });
    }
    function GetTableCell() {
        return GeneratejQueryNode("td");
    }
    function GetTableRow() {
        return GeneratejQueryNode("tr");
    }
    function GetWordTimeCollection() {
        return $(".jendoux .ui-spinner-input");
    }
    function UpdateTotalTime() {
        var TimeCollection = GetWordTimeCollection(),
            TotalTime = 0;

        TimeCollection.each(function () {
            TotalTime += parseFloat($(this).text().split("/")[1].replace(SecondText, ""));
        });
        var time = new Date(TotalTime * 1000);
        TotalTimeDisplay.text(time.getMinutes() + ":" + time.getSeconds());
    }
    function GetSummaryDiv() {
        var DisplayPanel = $("<div>").attr("id", 'JendouxSummary').css({
            padding: "2px 0px"
        }),
            line = GeneratejQueryNode("p").append(TDMsgBefore).append(GeneratejQueryNode("a").attr({
                href: GetBaseUrl(),
                target: "_blank"
            }).text(GetBaseUrl())).append(TDMsgAfter).appendTo(DisplayPanel);

        if (TextPlayerManager.M != 0) {
            var WordCollection = GetWordTimeCollection(),
                TotalWord = 0;
            WordCollection.each(function () {
                TotalWord += parseInt($(this).text().split("/")[0].replace(WordText, ""));
            });
            UpdateTotalTime();
            var
                Row1 = GetTableRow().append(GetTableCell().text(TDNumText)).append(GetTableCell().text(WordCollection.length)),
                Row2 = GetTableRow().append(GetTableCell().text(TDWordText)).append(GetTableCell().text(TotalWord)),
                Row3 = GetTableRow().append(GetTableCell().text(TDTimeText)).append(TotalTimeDisplay),
                Table = GeneratejQueryNode("table");
            DisplayPanel.append(Table.append(Row1).append(Row2).append(Row3));
        }
        else
            $("<p>").text(SelectModeText).appendTo(DisplayPanel);
        return DisplayPanel
    }
};
