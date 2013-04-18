(function(){
var expose = window.PrecogWeb || (window.PrecogWeb = {});
var level1 = expose.game1level1 = {
  "levelName": "Level 1: Data & Operators",
  "welcome": "Welcome to the Quirrel Tutorial Game by Precog",
  "description": "In this level, we're going to learn about the Quirrel data model and some basic operators you can use to manipulate data. The Quirrel data model is a richer superset of <a href=\"http://json.org\" target=\"_blank\">JSON</a>.",
  "getStarted": "You will see your score in the top right corner and once you finish a level, you can share your score. Use the menu above to navigate between levels you have completed. The <em>run query</em> button allows you to experiment and try out a query.  Use the <em>submit answer</em> button when you are ready to submit your solution. Have fun!",
  "questions": [
    {"question": " Enter one of these values in the editor to the right and run your script to see what the output is.",
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
  },{"question": "Enter a whole number (like <strong>7</strong>) or a decimal number (like <strong>7.123</strong>).",
     "background": "Numbers contain numeric information, such as prices, counts, or positions. Numbers are not quoted (if you quote them, they represent strings and not numbers).",
     "questionName" : "Numeric Values",
     "verify": function(result, query) {
        return typeof result[0] === "number";
        },
     "correct": {"text": "Fantastic! Precog's implementation of Quirrel stores numbers losslessly, and lets you choose a target precision whenever you query, so you can safely use numbers to store currencies and other information where precision is very important.", "score": 10},
     "incorrect": {"text": "Oops. Let's try that one again! Enter a number like <strong>42</strong> and see what happens.", "score": -5}
  },{"question": "Try entering an array that is filled with other values, such as numbers, strings, or other arrays.",
     "background": "Arrays contain a sequence of other values. Arrays are denoted by enclosing their values in square brackets and placing comma characters between the elements of the arrays. For example, <span>[1, 2, 3]</span> is an array, and so is <span>[[[[\"a\"], \"long\"], \"time\"], \"ago\"]</span>.",
     "questionName" : "Array Values",
     "verify": function(result, query) {
        return  result[0] instanceof Array;
        },
     "correct": {"text": "Awesome job! Arrays are the primary difference between the Quirrel data model and the relational data model. Relational databases can only store \"flat\" data, so they aren't very good at doing data science, which usually requires array processing capabilities.", "score": 10},
     "incorrect": {"text": "Don't worry, you can try again! Try entering a simple array, like <span>[1, 2, 3]</span>, which is an array that stores three numbers.", "score": -5}
  },{"question": "Try entering an object now.",
     "background": "Objects are \"maps\" from one value to another. They are similar to records in a relational database. They let you give names to different pieces of data. Objects are denoted with curly braces. Inside the curly braces, you place a list of fields, separated by the comma character (,). Every field consists of a \"name\" and a \"value\", separated by the colon operator (:). For example, the object <span>{\"name\": \"John Doe\", \"age\": 29}</span> contains two pieces of data, one named <strong>\"name\"</strong> (equal to <strong>\"John Doe\"</strong>), and one named <strong>\"age\"</strong> (equal to <strong>29</strong>).",
     "questionName" : "Object Values",
     "verify": function(result, query) {
        return !(result[0] instanceof Array) && result[0] instanceof Object;
        },
     "correct": {"text": "Most excellent! Field values don't have to be strings or numbers, they can be any value in the Quirrel data model. Try entering an object that contains not just simple values, but at least one array or other object (such a thing is called a nested data structure).", "score": 10},
     "incorrect": {"text": "Uh oh. Did something go wrong? Try entering an object again, making sure you have opening and closing curly braces, that each field value is valid, and that fields are separated by the comma character. For example, {\"state\": \"Colorado\", \"country\": \"USA\"}.", "score": -5}
  },{"question": "Try entering either <strong>null</strong> directly, or an object or array that contains a <strong>null</strong> value.",
     "background": "Null values can be used for anything you want. They are often used as sentinel values, to indicate that information is missing or not appropriate. There is only one <strong>null</strong> value, and it's denoted <strong>null</strong>.",
     "questionName" : "Null Values",
     "verify": function(result, query) {
        var r = window.PrecogWeb.helper.walk(result,
            function(value){
                console.log(value);
                return value === null;
            }
        );
        console.log(r);
        return r;
    },
     "correct": {"text": "Nice job! Unlike in SQL, null values don't have any special meaning in Quirrel. This means, for example, that <strong>null</strong> is equal to <strong>null</strong>, just like <strong>5</strong> is equal to <strong>5</strong>.", "score": 10},
     "incorrect": {"text": "Not quite. Let's try that one again! Enter <strong>null</strong> directly, or an object or array containing a <strong>null</strong> value.", "score": -5}
  },{"question": "The undefined value is denoted with <strong>undefined</strong>. Try entering <strong>undefined</strong>.",
     "background": "Undefined is a very special value in Quirrel, which you can think of as a marker to indicate something has no value (you can also think of it as a special empty set).",
     "questionName" : "Undefined Values",
     "verify": function(result, query) {
        return (/undefined/).test(query) && result.length === 0;
        },
     "correct": {"text": "Awesome! Undefined is similar to SQL's <strong>null</strong>. For example, <strong>undefined</strong> is not equal to itself, and if you compare <strong>undefined</strong> with anything else, you'll get back an <strong>undefined</strong> result.", "score": 10},
     "incorrect": {"text": "Try again! Enter <strong>undefined</strong> and see what you get back.", "score": -5}
  },{"question": "Try writing an expression that uses the equality operator and see what you get back.",
     "background": "Quirrel supports <em>boolean operators</em>, which let you produce boolean values and combine boolean values to produce other boolean values. Let's start off by looking at the equality operator, which is represented with the equals symbol (=). The equality operator lets you determine if two values are equal. If you write an expression like <strong>4 = 2</strong>, the result will be a boolean value, either <strong>true</strong> (if they are equal) or <strong>false</strong> (if they are not equal).",
     "questionName" : "Boolean Operators: Equality",
     "verify": function(result, query) {
        return (/[^:][=]/).test(query) && result.length > 0;
        },
     "correct": {"text": "You're doing great! The equality operator in Quirrel is the same as the equality operator in SQL. Many programming languages, however, use the double-equals operator for equality (==), and reserve the single-equals operator for assignment. Quirrel uses colon-equals for assignment (:=). Be sure not to confuse the two!", "score": 10},
     "incorrect": {"text": "Oh well, you can always try again! Try entering some expression that uses the equality operator, like <strong>\"foo\" = \"foo\"</strong>.", "score": -5}
  },{"question": "Enter an expression like <strong>\"42\" != 42</strong> to see what the result is.",
     "background": "The inequality operator, represented by the exclamation-equals symbol (!=), lets you determine if two values are equal. In an expression like <strong>2 != 4</strong>, the result will be <strong>true</strong> if the values are not equal, and <strong>false</strong> if they are the same.",
     "questionName" : "Boolean Operators: Inequality",
     "verify": function(result, query) {
        return (/[!][=]/).test(query) && result.length > 0;
        },
     "correct": {"text": "Superb! The inequality operator is often pronounced \"not equals\". Most programming languages use the same symbol that Quirrel uses for inequality, although SQL and some programming languages use <span><><span>.", "score": 10},
     "incorrect": {"text": "Oh no, it looks like there was a problem! Try entering some expression that uses the inequality operator, such as <strong>false</strong> != <strong>true</strong>.", "score": -5}
  },{"question": "Try entering an expression that uses one of the boolean comparison operators.",
     "background": "Quirrel has four comparison operators which can be used to determine the relative ordering of two values. These operators are the less-than (<), less-than-or-equal (<=), greater-than (>), and greater-than-or-equal (>=) operators. All of the comparison operators return boolean values to indicate the truth or falsity of the specified ordering. For example, the expression <strong>2 > 1</strong> returns <strong>true</strong>, because <strong>2</strong> is in fact greater than <strong>1</strong>, while the expression <strong>1 > 2</strong> returns <strong>false</strong>.",
     "questionName" : "Boolean Operators: Comparison",
     "verify": function(result, query) {
        return (/[<>]/).test(query) && result.length > 0;
        },
     "correct": {"text": "Great job! Quirrel uses the same operators for comparison that most programming languages and query languages use.", "score": 10},
     "incorrect": {"text": "Oops! Let's try that one again. Please enter any expression that uses one of the four comparison operators, such as <strong>2 >= 1</strong>.", "score": -5}
  },{"question": "Try entering in a disjunction, such as <strong>1 > 2 | 2 > 1</strong>. You will get back a boolean value that tells you whether the expression is <strong>true</strong> or <strong>false</strong>.",
     "background": "Quirrel has support for disjunctions (logical or), represented with the vertical pipe symbol (|). Disjunctions let you determine if either or both of two expressions are <strong>true</strong>. For example, the expression <strong>1 = 2 | 1 = 1</strong> is <strong>true</strong>, because even though it is not <strong>true</strong> that <strong>1 = 2</strong>, it is <strong>true</strong> that <strong>1 = 1</strong>. Similarly, the expression <strong>true</strong> | <strong>true</strong> is <strong>true</strong>.",
     "questionName" : "Boolean Operators: Disjunctions",
     "verify": function(result, query) {
        return (/[|]/).test(query) && result.length > 0;
        },
     "correct": {"text": "Incredible! Disjunctions are sometimes defined by truth tables, which tell you what the result will be given some combination of boolean inputs. The truth table for disjunction looks something like: <strong>true</strong> | <strong>true</strong> = <strong>true</strong>, <strong>true</strong> | <strong>false</strong> = <strong>true</strong>, <strong>false</strong> | <strong>true</strong> = <strong>true</strong>, <strong>false</strong> | <strong>false</strong> = <strong>false</strong>.", "score": 10},
     "incorrect": {"text": "Don't be discouraged, you can try again! Just enter any expression that uses a disjunction, such as <strong>12 = \"12\" | 12 != \"12\"</strong>.", "score": -5}
  },{"question": "Try entering an expression with a conjunction, such as <strong>false & 2 > 0</strong>, to see what you get.",
     "background": "Quirrel has support for conjunctions (logical and), represented with the ampersand symbol (&). Conjunctions let you determine if both of two expressions are true. For example, the expression <strong>1 = 1 & 1 != \"1\"</strong> is <strong>true</strong>, because both <strong>1 = 1</strong> and <strong>1 != \"1\"</strong> are <strong>true</strong>. However, the expression <strong>\"foo\" != \"foo\" & \"bar\" = \"bar\"</strong> is <strong>false</strong>, because even though <strong>\"bar\" = \"bar\"</strong>, it is not the case that <strong>\"foo\" != \"foo\"</strong>.",
     "questionName" : "Boolean Operators: Conjunctions",
     "verify": function(result, query) {
        return (/[&]/).test(query) && result.length > 0;
        },
     "correct": {"text": "You're doing great! The truth table for conjunction looks something like: <strong>true | true = true</strong>, <strong>true | false = false</strong>, <strong>false | true = false</strong>, <strong>false</strong> | <strong>false</strong> = <strong>false</strong>.", "score": 10},
     "incorrect": {"text": "Oh no! There was some sort of problem. Try again by entering any expression that uses a conjunction, such as <strong>1 < 2 & 1 != 0</strong>.", "score": -5}
  },{"question": "Try entering any expression that uses logical negation.",
     "background": "The truth or falsity of any boolean expression can be negated with the logical negation symbol (!), which must precede the expression. For example, <strong>!(5 = 5)</strong> yields <strong>false</strong>, because <strong>5 = 5</strong> yields <strong>true</strong>, and the negation of <strong>true</strong> is <strong>false</strong>.",
     "questionName" : "Boolean Operators: Negation",
     "verify": function(result, query) {
        return (/[!]/).test(query) && result.length > 0;
        },
     "correct": {"text": "Perfect! The truth table for negation only has two cases: <strong>!true</strong> = <strong>false</strong>, <strong>!false</strong> = <strong>true</strong>. The exclamation mark symbol is widely used for logical negation.", "score": 10},
     "incorrect": {"text": "Not quite, but you can try again! Just enter any expression that uses the logical negation operator, such as <strong>!true</strong>.", "score": -5}
  },{"question": "This means you can use Quirrel as a fancy calculator! Try entering in a math expression, like <strong>2 + 2</strong> or <strong>10 / 2</strong>.",
     "background": "Quirrel supports all the standard mathematical operators, including addition (+), subtraction (-), multiplication (*), division (/), modulus (%), and exponentiation (^). They perform the same functions (and with the same precedence) as you would expect.",
     "questionName" : "Math Operators",
     "verify": function(result, query) {
        return (/[+*%\/^-]/).test(query) && result.length > 0;
        },
     "correct": {"text": "Fantastic work! These operators are just the beginning of Quirrel's support for mathematics. Through the standard library, Quirrel has many other functions that can help you perform mathematical calculations.", "score": 10},
     "incorrect": {"text": "Aww, shucks! Math isn't for everyone, but don't give up yet! Enter in some simple math expression, like <strong>1 + 1</strong>, and see what you get back.", "score": -5}
  },{"question": "Experiment with the conditional operator by entering some simple conditional.",
     "background": "Quirrel has a conditional operator similar to conditionals in other languages. The operator is called the if/then/else operator, and the syntax is <strong>if p then x else y</strong>, where <strong>p</strong> is a boolean expression. The expression if <strong>2 > 1 then \"greater\" else \"not greater\"</strong> yields the string \"greater\", because <strong>2</strong> is in fact greater than <strong>1</strong>.",
     "questionName" : "Conditional Operator",
     "verify": function(result, query) {
        return (/if(.+?)then(.+?)else.+/).test(query) && result.length > 0;
        },
     "correct": {"text": "Nice job! Unlike conditionals in most programming languages, the else part of the conditional is required. Every expression in Quirrel has to yield some value. If you don't have anything meaningful to yield, use the <strong>undefined</strong> value.", "score": 10},
     "incorrect": {"text": "It's not too late to try again! Just enter a simple conditional expression like, if <strong>true</strong> then <strong>1 else 2</strong>, and see what you get back.", "score": -5}
  },{"question": "Try performing an assignment and returning the result, such as: <strong>x := 2; x * x<strong>.",
     "background": "The assignment operator (:=) gives a name to an arbitrary Quirrel expression. The operator can be quite useful when you need to reuse some result in several places, or when you want to give a name to an expression to make its intended purpose clearer to someone reading it. The assignment x := 2 gives the name x to the expression 2. If you reference x later in your Quirrel script, then Quirrel will use the value 2 in place of that reference.",
     "questionName" : "Assignment Operator",
     "verify": function(result, query) {
        return (/[:][=]/).test(query) && result.length > 0;
        },
     "correct": {"text": "Absolutely correct! Assignments in Quirrel shadow whatever came before them by the same name. So, for example, if you create two assignments for <strong>x (x := 1; x := 2; x)</strong>, then the latter one will take precedence over the former one.", "score": 10},
     "incorrect": {"text": "Awww! Don't worry, try again. Give a name to any expression, and then return that expression. For example, the query <strong>name := \"Mary Jane\"</strong>; name will yield the string <strong>\"Mary Jane\"</strong>.", "score": -5}
  },{"question": "Try creating an array, naming that array, and using the array drilldown operator to extract one of the elements of the array.",
     "background": "Arrays have many elements, and sometimes, you need to inspect a certain element. For this, you can use the <strong>array drilldown operator</strong> (<strong>[]</strong>). If <strong>x</strong> is an array, then <strong>x[0]</strong> refers to the first element of the array. Similarly, <strong>x[1]</strong> is the second element of the array, and so on. If you try to access an element that isn't defined, the result will be <strong>undefined</strong>.",
     "questionName" : "Array Drilldown Operator",
     "verify": function(result, query) {
         return (/[:][=]\s*\[[^\[]+\[[^\]]\]/).test(query) && result.length > 0;
        },
     "correct": {"text": "Awesome! The array drilldown operator is most useful when you are using arrays as tuples or vectors, when you know the precise location of the element you are looking for.", "score": 10},
     "incorrect": {"text": "Crud! Please try again by creating an array, naming that array, and using the array drilldown operator (for example, <strong>x := [\"Egg\", \"&\", \"I\"]; x[1])</strong>.", "score": -5}
  },{"question": "Experiment with the object drilldown operator by creating an object, naming that object, and using the object drilldown operator to extract out one of the fields of the object.",
     "background": "Objects have many fields, and usually you are interested in only some of them. To help you access a single field value, you can use the <strong>object drilldown operator</strong> (<strong>.</strong>). If <strong>x</strong> is an object with fields named <strong>\"gender\"</strong>, <strong>\"name\"</strong>, and <strong>\"age\"</strong>, then you can access the <strong>\"gender\"</strong> field with the syntax <strong>x.gender</strong>. Similarly, you can access the <strong>\"age\"</strong> field with the syntax <strong>x.age</strong>.",
     "questionName" : "Object Drilldown Operator",
     "verify": function(result, query) {
        return (/[:][=]\s*\{[^\}]+}[^.]+\./).test(query) && result.length > 0;
        },
     "correct": {"text": "Great job! The object drilldown operator in Quirrel uses the same syntax and has the same purpose as the object dereference operator in JavaScript. It's also the same operator that SQL uses to specify a particular column from a table.", "score": 10},
     "incorrect": {"text": "Don't give up yet! Just create an object, give it a name, and use the object drilldown operator to extract out a single field (for example, <strong>x := {\"age\": 19}; x.age})</strong>.", "score": -5}
  },{"question": "For example, {\"name\": \"John Doe\"} with {\"age\": 29} adds the age field to the object which contains a name field. Try the feature out for yourself: create an object and add a field to it.",
     "background": "Sometimes, you need to add some information to an object (for example, add a field that is derived from other fields in the object). Quirrel supports this through the with operator. The syntax is quite simple: a with b, where a is the object you want to augment, and b is the augmentation object with the new fields.",
     "questionName" : "Object Augmentation",
     "verify": function(result, query) {
        return (/with(\n|.)*?\{(\n|.)*?\}/m).test(query) && result.length > 0;
        },
     "correct": {"text": "Nice work! Augmentation is often used to add or refine structure. Quirrel lets you start with semi-structured data, and slowly extract out more structure for subsequent analysis.", "score": 10},
     "incorrect": {"text": "Oops. Let's try that one again. Create any object and use the with operator to add one or more fields to the object.", "score": -5}
  }/*,{"question": "Try the operator for yourself below!",
     "background": "When writing more complicated Quirrel scripts, you may want to verify certain expectations. To help you do that, Quirrel has an assert operator. The syntax for the assert operator is simply assert x, where x is a boolean condition. The boolean condition does not hold in all cases, then you will get an error when you run the query.",
     "questionName" : "Assert Operator",
     "verify": function(result, query) {
        return typeof result === "string";
        },
     "correct": {"text": "Nice work! The assert operator can make your life a lot easier when you start doing very complicated things in Quirrel. For Quirrel that runs in production, consider removing your assert operators so your code won't fail at runtime.", "score": 10},
     "incorrect": {"text": "Oh no! Was there some problem? Try using the assert operator again in some simple query, like assert 2 > 4; "foo".", "score": -5}
  }*/],
  "conclusion":{
    "title": "Conclusion",
     "finished" : "Congratulations! You've finished the first level of Quirrel Game I! You now have a basic mastery of the Quirrel data model and all the core Quirrel operators.",
     "next" : "In the next level, you get to start working with whole data sets, as you learn about loading and manipulating data. Good luck!"
  }
}
})();