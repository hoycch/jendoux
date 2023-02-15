JendouxCapture = function (HTML) {
    var $Wrapper = $("<div>").html(HTML),
        conditions = "p", $CurrentHead;

    $Wrapper.find(conditions+">span").replaceWith(function () {
        return $(this).html();
    }).end()

        .find(conditions + ":empty, script").remove().end()
        .find("p").filter(function () {
            return $(this).children().length == 0 && $(this).text().trim().length == 0
        }).remove();


    $Wrapper.find(conditions).each(function (i) {
        var $prev = $Wrapper.find(conditions).eq(i - 1);


        if (
                i > 0 &&
                $prev.parents().length == $(this).parents().length &&
                $prev.index() == $(this).index() - 1 &&
                $prev.get(0).outerHTML.split(">")[0] == this.outerHTML.split(">")[0]
            ) {
            $CurrentHead.append("<br><br>", this.innerHTML);
            $(this).empty();
        }
        else
            $CurrentHead = $(this);
    });

    $Wrapper.find("p:empty, p:has(ins)").remove().end().find(conditions).addClass("jendoux");
    
    return $Wrapper.html();
}