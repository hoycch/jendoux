JendouxCapture = function (HTML) {
    var $Wrapper = $("<div>").html(HTML),
        conditions = ".flexible-content-body p, #article-body-blocks p",
        $CurrentHead;

    $Wrapper
        .find("input, button, select").prop("disabled", true).end()

        .find("p:empty").remove().end()
        .find(conditions).each(function (i) {
            var $prev = $Wrapper.find(conditions).eq(i - 1);
            if (
                i > 0 &&
                $prev.parents().length == $(this).parents().length &&
                $prev.index() == $(this).index() - 1
                ) {
                $CurrentHead.append("<br><br>", this.innerHTML);
                $(this).html("");
            }
            else
                $CurrentHead = $(this);
        });
    $Wrapper.find("p:empty, script").remove().end()

    .find(conditions).addClass("jendoux");
    return $Wrapper.html();

}