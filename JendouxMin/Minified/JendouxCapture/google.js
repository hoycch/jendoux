JendouxCapture=function(n){var i=$(n),t=$(n).empty();return i.find("#GoogleStyle, .sp_cnt, #rso, .brs").appendTo(t),t.find(".action-menu-panel").remove().end().find("a[href^='/']").each(function(){var n=$(this).attr("href");$(this).attr("href","https://www.google.com"+n)}).end().find("#imagebox_bigimages, .rd-mrb, .preload").remove().end().find("a").removeAttr("onmousedown").end().find("img[id]").each(function(){i.find("script:contains("+$(this).attr("id")+"):not(:contains(google.))").appendTo(t)}).end(),t[0].outerHTML};