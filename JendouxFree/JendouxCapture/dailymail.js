JendouxCapture = function (HTML) {



    var $Wrapper = $("<div>").html(HTML),
        conditions = "#js-article-text p:has(font):not([id])",
        results = $Wrapper.find("p").filter(function () {
            return $(this).text().trim().length == 0;
        });

    while (results.length > 0) {
        results.remove();
        results = $Wrapper.find("p").filter(function () {
            return $(this).text().trim().length == 0;
        });
    }

    var Videos = $Wrapper.find("script:contains(linkBaseURL)");

    Videos.each(function (t) {
        var ParaString = $(this).text(), DataLink = "http://c.brightcove.com/services/viewer/federated_f9?&width=636&height=358&bgcolor=%23000000&includeAPI=true&isVid=true&isUI=true&optimizedContentLoad=true&wmode=transparent&autoStart=false&showNoContentMessage=true&debuggerID=&originalTemplateReadyHandler=templateReady&";
        ParaString = ParaString.substring(ParaString.indexOf(":") + 1, ParaString.indexOf("});") - 1), amp = "&",
        Parameters = $.parseJSON(ParaString.replace(/\n.*title.*/, "").replace(/\n.*typeof.*/, "").replace(/\n\s+/g, "").replace(/'/g, "\""));

        DataLink += "flashID=" + Parameters.objId + "video" + amp
                    + "playerId=" + Parameters.playerId + amp
                    + "playerKey=" +encodeURIComponent( Parameters.playerKey) + amp
                    + "linkBaseURL=" + encodeURIComponent(Parameters.linkBaseURL) + amp
                    + "%40videoPlayer=" + Parameters.videoPlayer;
                    
        


            VideoObject = $("<object width=\"636\" height=\"358\" class=\"BrightcoveExperience\" seamlesstabbing=\"undefined\"><param name=\"allowScriptAccess\" value=\"always\"><param name=\"allowFullScreen\" value=\"true\"><param name=\"seamlessTabbing\" value=\"false\"><param name=\"swliveconnect\" value=\"true\"><param name=\"wmode\" value=\"transparent\"><param name=\"quality\" value=\"high\"><param name=\"bgcolor\" value=\"#000000\"></object>")
            .attr("data", DataLink);

        $Wrapper.find("#" + Parameters.objId + " a").replaceWith(VideoObject);
    });



    $Wrapper
        .find("script, iframe").remove().end()
    .find("*").removeAttr("onclick").end()
    .find("input, button, select").prop("disabled", true).end()

    .find(conditions).each(function () {
        var $prev = $(this).prev();
        if (
            $prev.length > 0 &&
            $prev.get(0).outerHTML.split(">")[0] == this.outerHTML.split(">")[0] &&
            !$prev.is(":empty") &&
            $prev.has("font")

            ) {
            $prev.append("<br/><br/>", this.innerHTML);
            $(this).remove();
        }
    });

    $Wrapper.find(conditions).addClass("jendoux").find("font").each(function () {
        $(this).replaceWith(function () {
            return this.innerHTML;
        });
    });


    return $Wrapper.html();

}