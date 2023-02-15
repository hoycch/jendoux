JendouxCapture = function (HTML) {
    var $Original = $(HTML),
        //$Returner = $("<div>").html(HTML),
        $Wrapper = $(HTML).empty();

    $Original.find("#GoogleStyle, .sp_cnt, #rso, .brs").appendTo($Wrapper); //, #navcnt
    $Wrapper.find(".action-menu-panel").remove().end()
        .find("a[href^='/']").each(function () {
            var UnsolvedUrl = $(this).attr("href");
            $(this).attr("href", "https://www.google.com" + UnsolvedUrl)

        }).end()
        .find("#imagebox_bigimages, .rd-mrb, .preload").remove().end()
        .find("a").removeAttr("onmousedown").end()
        .find("img[id]").each(function () {
            $Original.find("script:contains(" + $(this).attr("id") + "):not(:contains(google.))").appendTo($Wrapper);
        }).end();

    return $Wrapper[0].outerHTML;
}