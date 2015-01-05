module.exports = function (text) {
    if(!text)
        return [];

        var words = text.trim().split(" ");
        var normalized = [];

        var outer_quote = false;
        var tmp = [];
        for(var i = 0; i < words.length; i++) {
            if(!outer_quote && (words[i].charAt(0) == "\"" || words[i].charAt(0) == "\'")) {
                outer_quote = words[i].charAt(0);
                words[i] = words[i].slice(1);
            }

            if(outer_quote) {
                if(words[i])
                    tmp.push(words[i]);

                    if(words[i].charAt(words[i].length-1) == outer_quote) {
                        outer_quote = false;
                        var endQuote = tmp[tmp.length-1];
                        tmp[tmp.length-1] = endQuote.slice(0, endQuote.length-1);

                        normalized.push(tmp.join(" "));
                        tmp = [];
                    }
            } else if(words[i])
            normalized.push(words[i]);
        }

        return normalized;
};
