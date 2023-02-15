JendouxCapture = function (HTML) {


    var $Wrapper = $("<div>").html(HTML),
        conditions = "article p",
        $CurrentHead, KeepScript = $Wrapper.find("script[src$='posttv-video-embed.js']").eq(0);

    $Wrapper.find(String.format("{0}:has(iframe),{0}:has(object)", conditions)).each(function () {
        $(this).replaceWith(function () {
            return this.innerHTML;
        });
    });

    $Wrapper.find(".wp-inline-bb, script:not(:contains(pbSsiSingle)), .pb-f-page-recommended-strip, .pb-f-page-trending-strip, .pb-f-page-comments").remove().end()

        .find("input, button, select").prop("disabled", true).end()

        .find(conditions).removeAttr("id").each(function (i) {


            var $prev = $Wrapper.find(conditions).eq(i - 1);
            if (
                i > 0 &&
                $prev.parents().length == $(this).parents().length &&
                $prev.index() == $(this).index() - 1 &&
                $prev.get(0).outerHTML.split(">")[0] == this.outerHTML.split(">")[0]) {
                $CurrentHead.append("<br><br>", this.innerHTML);
                $(this).empty();
            }
            else {
                $CurrentHead = $(this);

            }

        });
    $Wrapper.find(conditions + ":empty, .pb-one, .pb-f-page-header-v2, .pb-f-ad-leaderboard, .pb-f-page-trending-strip").remove();
    $Wrapper.find(conditions + ":not(:has(object)):not([style])").addClass("jendoux");
    //extract object from p
    $Wrapper.append(KeepScript);
    return $Wrapper.html();
}