JendouxCapture=function(n){var t=$("<div>").html(n),i=".flexible-content-body p, #article-body-blocks p",r;return t.find("input, button, select").prop("disabled",!0).end().find("p:empty").remove().end().find(i).each(function(n){var u=t.find(i).eq(n-1);n>0&&u.parents().length==$(this).parents().length&&u.index()==$(this).index()-1?(r.append("<br><br>",this.innerHTML),$(this).html("")):r=$(this)}),t.find("p:empty, script").remove().end().find(i).addClass("jendoux"),t.html()};