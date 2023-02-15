JendouxCapture = function (HTML) {
    var $Wrapper = $("<div>").html(HTML),
        conditions = ".article_body p, .post-entry p", $CurrentHead;

    $Wrapper.find(conditions).each(function (i) {
        var $prev = $Wrapper.find(conditions).eq(i - 1);
        if (
            i > 0 &&
            $prev.parents().length == $(this).parents().length &&
            $prev.index() == $(this).index() - 1 &&
            $prev.get(0).outerHTML.split(">")[0] == this.outerHTML.split(">")[0]
        )
        {
            $CurrentHead.append("<br><br>", this.innerHTML);
            $(this).empty();
        }
        else
            $CurrentHead = $(this);
    });
    //$Wrapper.find("script:not([src*=gotraffic])").remove();
    //$Wrapper.find("script:contains(Bcom.Ads)").remove();
    //var AppendScript = $("<script>");
    //$Wrapper.find("script:not([src*=application])").each(function(){
    //    AppendScript.append('$(function(){ $(document).append($("<script>").attr("src", "'+ $(this).attr("src")+ '"));});');
    //    $(this).remove()
    //});
    //$Wrapper.append(AppendScript);

    $Wrapper.find("script, p:empty, .main_head").remove().end().find(conditions).addClass("jendoux");
    return $Wrapper.html();
}