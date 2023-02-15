JendouxCapture = function (HTML) {

    var $Wrapper = $("<div>").html(HTML),
        conditions = "#mw-content-text p",
        $CurrentHead;
    $Wrapper.find(conditions + ":empty, script").remove();


    $Wrapper.find(conditions).each(function (i) {


        var $prev = $Wrapper.find(conditions).eq(i - 1)
        if (
            i > 0 &&
            $prev.parents().length == $(this).parents().length &&
            $prev.index() == $(this).index() - 1 &&
            $prev.get(0).outerHTML.split(">")[0] == this.outerHTML.split(">")[0]) {
            $CurrentHead.append("<br><br>", this.innerHTML);
            $(this).html("");
        }
        else {
            $CurrentHead = $(this);

        }

    });
    $Wrapper.find("#mw-head, script").remove();
    $Wrapper.find("#p-logo").css("position", "static");
    $Wrapper.find(conditions + ":not([style]), #mu-content-text ul").filter(function () {
        var Playerize = true;
        !$(this).parents().each(function () {
            var t = $(this);
            if (t.css("text-align") == "center" || t.is("[class*=right],#toc")) {
                Playerize = false;
            }
        });
        return Playerize;

    }).addClass("jendoux");
    return $Wrapper.html();
}