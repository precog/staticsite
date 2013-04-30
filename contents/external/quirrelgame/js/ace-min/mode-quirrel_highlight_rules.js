define(
function(require, exports, module) {
    "use strict";

    var oop = require("../lib/oop");
    var lang = require("../lib/lang");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

    var QuirrelHighlightRules = function() {

        var keywords = lang.arrayToMap(
            ("difference|else|solve|if|import|intersect|new|then|union|where|with").split("|")
        );

        var builtinConstants = lang.arrayToMap(
            ("true|false|null").split("|")
        );

        var builtinFunctions = lang.arrayToMap(
            ("count|distinct|load|max|mean|geometricMean|sumSq|variance|median|min|mode|stdDev|sum").split("|")
        );
 
        var start = [{
                token : "comment",
                regex : "--.*$"
            }, {
                token : "comment",
                regex  : '\\(-',
                merge : true,
                next : "comment"
            }, {
                token : "string",           // " string
                regex : '"(?:[^\n\r\\\\"]|\\\\.)*"'
            }, {
                token : "constant.numeric", // float
                regex : "[0-9]+(?:\\\\.[0-9]+)?(?:[eE][0-9]+)?"
            }, {
                token : "variable",
                regex : "'[a-zA-Z_0-9]['a-zA-Z_0-9]*\\b"
            }, {
                token : "string",
                regex : "/(?:/[a-zA-Z_0-9-]+)+\\b"
            }, {
                token : "keyword.operator",
                regex : "~|:=|\\+|\\/|\\-|\\*|&|\\||<|>|<=|=>|!=|<>|=|!|neg\\b"
            }, {
                token : function(value) {
                    if (keywords.hasOwnProperty(value))
                        return "keyword";
                    else if (builtinConstants.hasOwnProperty(value))
                        return "constant.language";
                    else if (builtinFunctions.hasOwnProperty(value))
                        return "support.function";
                    else
                        return "identifier";
                },
                regex : "([a-zA-Z]['a-zA-Z_0-9]*|_['a-zA-Z_0-9]+)\\b"
            }, {
                token : "invalid",
                regex : "//"
            }, {
                token : "identifier",
                regex : "\\{",
                next : "object-start"
            }, {
                token : "identifier",
                regex : '`(?:[^`\\\\]|\\\\.)+`'
            }
        ];
        this.$rules = {
            "start" : start,
            "comment" : [
                {
                    token : "comment", // closing comment
                    regex : ".*?-\\)",
                    next : "start"
                }, {
                    token : "comment", // comment spanning whole line
                    merge : true,
                    regex : ".+"
                }
            ],
            "object-start" : [ {
                token : "entity.name.function",
                regex :  '(?:[a-zA-Z_][a-zA-Z_0-9]*|`(?:[^`\\\\]|\\\\.)+`|"(?:[^"\\\\]|\\\\.)+"):',
                next : "object-contents"
            }, {
              token : "identifier",
              regex : '\\}',
              next : "start"
            }
        ],
			
			// TODO if we have nested objects, we will abort the state stack prematurely
			"object-contents" : start.concat([{
				token : "identifier",
				regex : ',',
				next : "object-start"
			}, {
                token : "identifier",
                regex : '\\}',
                next : "start"
            }])
        };
        
//        this.$rules = rules;
    };

    oop.inherits(QuirrelHighlightRules, TextHighlightRules);

    exports.QuirrelHighlightRules = QuirrelHighlightRules;
});
