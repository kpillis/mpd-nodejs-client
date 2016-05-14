module.exports = function () {
    return function(req,res,next){
        var lines = res.msg.split('\n');
        var jsonString = "[{";
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (line != "") {
                if (i != 0 && line.indexOf("file") > -1) {
                    jsonString = jsonString.concat('},{');
                } else if (i != 0) {
                    jsonString = jsonString.concat(",");
                }

                var lineItems = line.split(':');
                jsonString = jsonString.concat("\"" + lineItems[0] + "\":" + "\"" + lineItems[1].trim() + "\"");
            }
        }
        jsonString = jsonString.concat("}]");
        res.JSON = JSON.parse(jsonString);
        return next();
    }
};