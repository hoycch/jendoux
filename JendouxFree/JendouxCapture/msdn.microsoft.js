JendouxCapture = function (HTML) {



	var $Wrapper = $(HTML),
        conditions = ".sectionblock>p, .subsection>p, #mainSection>p",
        $CurrentHead;
	//p can be under li

	$Wrapper
		.find("a[href^=javascript]").removeAttr("href").end()
		.find(conditions).each(function (i) {
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
	$Wrapper.find(".sectionblock>p:empty, .subsection>p:empty, #mainSection>p:empty, script").remove();
	$Wrapper.find(conditions).addClass("jendoux");
	return $Wrapper[0].outerHTML;
}