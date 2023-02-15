/// <reference path="ApplicationConstants.js" />
/// <reference path="TextPlayerDimensions.js" />
/// <reference path="UIBehavior.js" />
$.fn.extend({

    JDXH: function () {
        return this.attr("href");
    },
    JDXNT: function () {
        /// <summary>Check href Is Non Text</summary>
        return this.JDXH().match(/\.(pdf|gif|jpg|png|tiff|svg|ogv|ogg|webm)$/i);
    },
    JDXFA: function () {
        /// <summary>Filter out # and mailto hrefs</summary>
        return this.filter(":not([href^=#]):not([href^='mailto:'])");
    },

    JDXTBG: function () {
        /// <summary>set transparent background</summary>
        return this.css("background", "rgba(0,0,0,0)");
    },
    JDXRI: function () {
        /// <summary>remove indent</summary>
        return this.contents().filter(function () {
            return this.nodeType === 3 && $(this).text().replace(/[\r\n\t]/g, "").length == 0;
        }).remove().end().end();

    },
    JDXBT: function (Tip) {
        /// <summary>bind tip</summary>
        return this.tooltip({
            items: "div, button, #QueryTextBox",
            show: { delay: 500 },
            hide: { delay: 500 },
            position: {
                my: "left top+10",
                at: "right-20 bottom",
                using: function (position, feedback) {
                    $(this).css(position)
                }
            },
            content: function () {
                return $("<button>").css({
                    fontSize: 10,
                    cursor: "help"
                }).text(Format("{0}: {1}", TipText, Tip)).button({
                    icons: { primary: "ui-icon-help" }
                });
            },
            open: function (e, ui) {
                if (Tip === undefined)
                    Tip = $(this).attr("id");
                ui.tooltip.find("button").click(function () {
                    JendouxFree.JendouxWebService.GetTip(Tip, function (HtmlContent) {
                        ShowTipMessage(HtmlContent);
                    }, function (e) {
                        ShowTipMessage(Format("<p>{0}</p><p>{1}</p>", NetworkError, e.get_message()));
                    })
                });
            },
            tooltipClass: "TooltipStyle"
        });
    },
    JDXHTT: function () {
        /// <summary>convert HTML to text</summary>
        return this.each(function () {
            $(this).replaceWith(function () {
                return $(this).text().replace("<", "&lt;").replace(">", "&gt;");
            });

        });
    },
    JDXDTT: function () {
        /// <summary>convert descendent nodes to text</summary>
        return this.each(function () {
            $(this).html(function () {
                return $(this).text();
            });
        });
    },
    JDXSRZ: function (TextAnimator) {
        /// <summary>set resizable</summary>
        return this.resizable({
            helper: "resizable-helper",
            minWidth: JPDimensions.Min().x,
            minHeight: JPDimensions.Min().y,
            maxWidth: JPDimensions.Max().x,
            maxHeight: JPDimensions.Max().y,
            grid: [JPDimensions.CX(), JPDimensions.GLH()],
            stop: function (e, ui) {
                var dimension = JPDimensions.GWL(ui.size),
                    SetSliderValue = SettingPanelFunctions.SSV;

                SetSliderValue(WN, dimension.x);
                SetSliderValue(RN, dimension.y);
                SaveProfile(WN);
                SaveProfile(RN);
            }
        });
    },
    JDXPZB: function () {
        /// <summary>Playerizable</summary>
        return this.filter(function () {
            return ElementWithLongText(this);
            //&& $(this).width() > JPDimensions.P().x;
        });
    },
    JDXFOB: function () {
        /// <summary>Filter Out Bold Only</summary>
        return this.filter(function () {
            return !ContainsOnlyBold(this);
        });
    },
    JDXBCL: function () {
        /// <summary>Bind click link</summary>

        this.JDXFA().click(function (e) {

            var LinkWithJendoux = $(this).attr("href");
            if (LinkWithJendoux !== undefined) {
                var OriginalLink = RemoveCID(LinkWithJendoux.replace(JQS, ""));

                if (e.button == 0) {
                    e.preventDefault();
                    $HyperlinkMenu.css("display", "inline-block").position({
                        of: $(this),
                        my: "left top",
                        at: "right bottom",
                        collision: "flipfit flipfit"
                    }).find("li").unbind().end()
                    .find("li:eq(0)").click(function () {
                        window.open(LinkWithJendoux, "_self");
                    }).end()
                    .find("li:eq(1)").unbind("click").click(function () {
                        window.open(LinkWithJendoux, "_blank");
                        return false;
                    }).end()
                    .find("li:eq(2)").click(function () {
                        window.open(OriginalLink, "_self");
                        return false;
                    }).end()
                    .find("li:eq(3)").unbind("click").click(function () {
                        window.open(OriginalLink, "_blank");
                        return false;
                    }).end()
                    .find("li:eq(4)").mousedown(function () {
                        $(this).data("zclip-text", OriginalLink);
                    }).end();
                }
            }
        });


        return this;
    }
});

function GeneratejQueryNode(NodeName) {
    return $(Format("<{0}>", NodeName));
}

function ReloadPage() {
    $RP.empty().html(HtmlDoc);
    TextPlayerManager.init($RP.find(".jendoux").JDXPZB());
}

function FormatSpinner(target) {
    return $(target).parent().removeClass("ui-corner-all").find("[tabindex]").removeAttr("tabindex").end();
}

function GetSpinDirection(target) {
    return (-$(target).parent().find(".ui-state-active").index() + 1.5) * 2
}

