JendouxCapture=function(n){var t=$(n),i=".sectionblock>p, .subsection>p, #mainSection>p",r;return t.find("a[href^=javascript]").removeAttr("href").end().find(i).each(function(n){var u=t.find(i).eq(n-1);n>0&&u.parents().length==$(this).parents().length&&u.index()==$(this).index()-1&&u.get(0).outerHTML.split(">")[0]==this.outerHTML.split(">")[0]?(r.append("<br><br>",this.innerHTML),$(this).html("")):r=$(this)}),t.find(".sectionblock>p:empty, .subsection>p:empty, #mainSection>p:empty, script").remove(),t.find(i).addClass("jendoux"),t[0].outerHTML};