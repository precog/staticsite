(function(){
var expose = window.PrecogWeb || (window.PrecogWeb = {});
var level4 = expose.game1level4 = {
  "levelName": "Level 1: Data & Operators",
  "welcome": "Welcome to the first Quirrel Tutorial game by Precog",
  "description": "In this level, we're going to learn about the Quirrel data model and some basic operators you can use to manipulate data. The Quirrel data model is a richer superset of <a href=\"http://json.org\">JSON</a>. Any valid JSON is also valid Quirrel data, so Quirrel can work with strings, booleans, numbers, multi-dimensional arrays, nested objects, nulls, and other types of data.",
  "getStarted": "In the top menu you can find all the tutorial games and keep track of your score. Please click <a href=\"#\">next --></a>",
  "questions": [
    {"question": " Enter one of these values below and run your script to see what the output is.",
     "background" :"Boolean values represent truth and falsity. There are two boolean values: <strong>true</strong>, and <strong>false</strong>.",
     "questionName" : "Boolean Values",
     "verify": function(result, query) {
        return typeof result[0] === "boolean";
        },
     "correct": {"text": "Nice job! Notice that when you enter some data (such as <strong>true</strong> or <strong>false</strong>), Quirrel returns that data back to you. Quirrel is an expression-oriented language, and returns the value of the last line in your Quirrel script. In this case, your last value was raw data, so Quirrel returned that data to you.", "score": 10},
     "incorrect": {"text": "Oops! You did not enter <strong>true</strong> or <strong>false</strong>. There is no need to quote these values. They are literals, so you enter them just as they appear (<strong>true</strong> and <strong>false</strong>, without quotes).", "score": -5}
  }, {"question": "Try entering your email address, like \"zombie@precog.com\" (including the quotes!).",
     "background" :"String values contain textual information. Like JSON, Quirrel supports <a href=\"http://www.unicode.org/standard/WhatIsUnicode.html\">Unicode</a>, instead of plain ASCII, so you can store text in any language. String values have to be quoted with the double-quote character (\").",
     "questionName" : "String Values",
     "verify": function(result, query) {
        return typeof result[0] === "string";
        },
     "correct": {"text": "Excellent! Strings are often used to store user-generated content (emails, names, locations, etc.) and categories (gender, age range, province). In addition, strings can be used to contain unstructured text, such as log lines. (Quirrel makes it easy to extract structure out of unstructured text later.)", "score": 10},
     "incorrect": {"text": "Oh no, did something go wrong? Try to enter in some textual information enclosed in double-quotes, such as <strong>\"All work and no play makes Jack a dull boy.\"</strong>", "score": -5}
  },{"question": "Enter a whole number (like <strong>7</strong>) or a decimal number (like <strong>7.123</strong>) below.",
     "background": "Numbers contain numeric information, such as prices, counts, or positions. Numbers are not quoted (if you quote them, they represent strings and not numbers).",
     "questionName" : "Numeric Values",
     "verify": function(result, query) {
        return typeof result[0] === "number";
        },
     "correct": {"text": "Fantastic! Precog's implementation of Quirrel stores numbers losslessly, and lets you choose a target precision whenever you query, so you can safely use numbers to store currencies and other information where precision is very important.", "score": 10},
     "incorrect": {"text": "Oops. Let's try that one again! Enter a number like <strong>42</strong> and see what happens.", "score": -5}
  }],
  "conclusion":{
    "title": "Conclusion",
     "finished" : "Congratulations! You've finished the first level of Quirrel Game I! You now have a basic mastery of the Quirrel data model and all the core Quirrel operators.",
     "next" : "In the next level, you get to start working with whole data sets, as you learn about loading and manipulating data. Good luck!"
  }
}
})();