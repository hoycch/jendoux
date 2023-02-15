/// <reference path="jQueryExtension.js" />
var TextContentRestyle = new function () {

    this.RB = RemoveHeadTailBlank;
    this.SS = StripStyles;
    this.RS = RemoveShells;
    function StripStyles(TextContainer) {
        /// <summary>Strip Styles</summary>
        TextContainer.find("a").removeClass().removeAttr("style").JDXDTT().end()
        .find("sup").css({
            verticalAlign: "top",
            position: "relative",
            top: "-.1em"
        }).JDXDTT().end()
        .children(":not(i, b, a, sup, br)").JDXHTT().end()
        .find("a").JDXTBG();

        if (CheckBrowserSafari())
            TextContainer.children("i, b").JDXHTT().end()
                .children("a").css({
                    fontWeight: "normal"
                });
        else
            TextContainer.children("i, b").JDXDTT();
    }
    function RemoveShells(TextContainer) {
        while (TextContainer.contents().length == 1 && TextContainer.contents().get(0).nodeType != 3) {
            TextContainer.children().replaceWith(function () {
                $(this).html();
            })
        }
        return TextContainer;
    }
    function RemoveHeadTailBlank(TextContainer) {
        /// <summary>Remove Blank space at head and tail</summary>
        TrimEmptyTextNode(TextContainer.contents().first());
        TrimEmptyTextNode(TextContainer.contents().last());

        while (TextContainer.contents().first().is("br"))
            TextContainer.contents().first().remove();
        while (TextContainer.contents().last().is("br"))
            TextContainer.contents().last().remove();
        return TextContainer;
    }
    function TrimEmptyTextNode($Node) {
        if ($Node.get(0).nodeType == 3 && $Node.text().trim().length == 0)
            $Node.remove();
    }
}
