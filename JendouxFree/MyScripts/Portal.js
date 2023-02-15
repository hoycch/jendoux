/// <reference path="ApplicationConstants.js" />
/// <reference path="UIBehavior.js" />
/// <reference path="jQueryExtension.js" />
function InitFrontPage() {
    $("#JendouxNewsFeed button").click(function () {
        var $thisButton = $(this);
        $thisButton.css("display", "none");
        ToggleLoadingState();
        JendouxFree.JendouxWebService.GetNewsLinks($thisButton.attr("id").replace("Btn", ""), function (ReturnHtml) {
            ToggleLoadingState();
            var $Replacement = $(AddJendouxQueryUrl(ReturnHtml));

            $thisButton.replaceWith($Replacement);
            $Replacement.find("a[data-desc], a[data-img]")
                .attr("title", "").tooltip({
                    content: function () {
                        var c = $("<div>")
                            .append($("<div>").css({
                                fontSize: 10,
                                marginBottom: 5
                            }).text($(this).data("desc")));
                        if ($(this).data("img") != null)
                            c.append($(Format("<img src='{0}'>", $(this).data("img"))).css("width", 292));
                        return c;
                    },
                    position: {
                        my: "right-20 top",
                        at: "left top"
                    },
                    show: {
                        delay: 500,
                        effect: "drop"
                    },
                    close: function () {
                        $("div.ui-effects-wrapper").remove();
                    }
                }).end()
            .find("a").JDXBCL().end()
            .find("h3").each(function () {
                $(this).parent().before($(this));
            }).end()
            .wrap("<div class='PaperContainer'>").accordion({
                collapsible: true,
                heightStyle: "fill",
                create: function (event, ui) {
                    $(this).find("h3:eq(0)").click().end()
                    .find(".Section").css({
                        padding: "16px 25px",
                        background: "none"
                    })
                    .each(function () {
                        var maxNews = 20,
                            AnchorFontHeight = 18,
                            maxHeight = AnchorFontHeight * maxNews,
                            NewsNo = $(this).find("a").length;
                        if (NewsNo > maxNews)
                            $(this).css("height", maxHeight);
                        else
                            $(this).css("height", NewsNo * AnchorFontHeight);
                    });
                }
            }).find("h3, .Section").css({
                margin: 0,
                border: 0
            }).end()
            .find("h3").css({
                fontSize: 18,
                padding: "10px 2.2em"
            }).each(function () {
                $(this).css({
                    backgroundImage: Format("url(images/{0}.png)", $(this).parent().attr("id")),
                    backgroundPosition: Format("0 -{0}px", $(this).index() * 21.7),
                    color: "#190606"
                })
            }).end();
        }, function (e) {
            ToggleLoadingState();
            DisplayErrorMsg(e);
        });

        return false;
    });
};
//    .find("a:gt(-3)").mouseover(function () {
//        var $Section = $(this).parent();
//        var num = $Section.find("a").length;
//        if ($(this).height() > AnchorFontHeight)
//            $(this).parent().scrollTop(num * AnchorFontHeight + $(this).height());
//    }).end();


//}