(function(){
var expose = window.PrecogWeb || (window.PrecogWeb = {});
var level2 = expose.game1level2 = {
  "levelName": "Level 2: Loading & Manipulating Data",
  "welcome": "Welcome to the first Quirrel Tutorial game by Precog",
  "description": "In this level, we're going to learn about loading data sets and manipulating them in a variety of useful ways. You'll build upon what you learned in Level 1, and reach a level of maturity that lets you begin solving real-world problems with Quirrel.",
  "getStarted": "In the top menu you can navigate to any previous games you have completed.  Click the start button below to start Level 2!",
  "questions": [
    {"question": " Try loading this data set by typing in <strong>load(\"/summer_games/london_medals\")</strong> and seeing what you get back.",
     "background" :"Quirrel embraces the metaphor of a file system for organizing data. All data is stored somewhere in the file system. To load data from some location, you can use the <strong>load()</strong> function, and specify a string that represents the location of the data you want to load. In the demo environment for this game, there are quite a few data sets already preloaded. One of them is stored in the <strong>/summer_games/london_medals</strong> directory. This contains data for winning athletes for the 2012 Olympic Summer Games held in London.",
     "questionName" : "Load Function",
     "verify": function(result, query) {
        return (/[(]["]\/summer_games\/london_medals["][)]/).test(query) && result.length === 1019;
      },
     "correct": {"text": "Superb! Notice that Quirrel uses the forward slash to separate paths in the file system, which is the same character used by the World Wide Web and most operating systems. Paths serve a similar purpose in Quirrel as databases, tables, and collections serve in other data management systems -- they let you organize information in a hierarchical fashion.", "score": 10},
     "incorrect": {"text": "Oh no, what went wrong? Please try again, and make sure you enclose the path in double quotes (for example, <strong>load(\"/summer_game/london_medals\")</strong>).", "score": -5}
  }, {"question": " Try loading the same data set you did in the last question <strong>(/summer_games/london_medals)</strong>, but this time using the path literal syntax.",
     "background" :"Loading data from directories is so common, there's a shorthand notation for it. To load all data in some directory <strong>foo</strong>, simply enter <strong>//foo</strong>. This is equivalent to <strong>load(\"/foo\")</strong>, with one exception you'll learn about in the next question.",
     "questionName" : "Path Literals",
     "verify": function(result, query) {
         return (/\/\/summer_games\/london_medals/).test(query) && result.length === 1019;
      },
     "correct": {"text": "Nice work! Precog's implementation of Quirrel lets you specify a limit on how many results will be returned from a query. This can be useful to prevent accidentally crashing browser-based tools, which cannot handle large amounts of data.", "score": 10},
     "incorrect": {"text": "Oops! Let's try that one again. Just specify the path literal <strong>//summer_games/london_medals</strong>, and see what you get back!", "score": -5}
  }, {"question": " Try loading all data in the children of the <strong>/summer_games/</strong> directory using globbing.",
     "background" :"In Quirrel, it's possible to perform analysis across data that spans different directories. One feature that makes this really easy is Quirrel's support for globbing. To load data in all subfolders of a directory <strong>foo</strong>, just use the syntax <strong>//foo/*</strong>. The asterisk symbol (*) can be thought of as a wildcard that stands for any child in the specified parent.",
     "questionName" : "Glob Patterns",
     "verify": function(result, query) {
        return (/\/summer_games\/\*/).test(query) && result.length === 25904;
      },
     "correct": {"text": "Fantastic! Precog is often used to build multi-tenant analytics solutions. In this use case, different paths can store data for different customers. Globbing can make it easy to perform cross-customer analysis.", "score": 10},
     "incorrect": {"text": "Not quite right, but you can try again! Please try loading a path using the globbing syntax (e.g. <strong>//summer_games/*</strong>).", "score": -5}
  },{"question": " Try loading the London data set, giving the set a name, and drilling down into the <strong>Age</strong> field of the set (hint: the London data set is located in <strong>/summer_games/london_medals</strong>).",
     "background" :"From this point onward, all the Quirrel scripts you write will be working with whole sets of data (instead of just single values). But don't worry, all the operators you learned about in Level 1 work just fine with sets of values. Quirrel's built-in operators are automatically applied in bulk across sets. For example, if <strong>foo</strong> is a set of objects, then <strong>foo.bar</strong> is another set, constructed by drilling down into the <strong>bar</strong> field for every object in the <strong>foo</strong> set.",
     "questionName" : "Bulk Processing: Object Drilldown",
     "verify": function(result, query) {
          return (/\/summer_games\/london_medals(\n|.)*?[\.]Age/m).test(query) && result.length === 1019;
      },
     "correct": {"text": "You're getting it! Quirrel is very similar to SQL and array processing languages. Manually iterating through elements is very uncommon. Instead, you usually apply operations in bulk across entire sets of data, which makes it easier for you to analyze large data sets.", "score": 10},
     "incorrect": {"text": "Don't give up! You're so close. If you are using path literals, and you aren't giving the data set a name, be sure to wrap parentheses around the path literal (e.g. (<strong>//summer_games/london_medals).Age</strong>) or else Quirrel will think you're loading a data set called <strong>/summer_games/london_medals.Age</strong>.", "score": -5}
  },{"question": " As another example of Quirrel's bulk processing, try multiplying every age in the London data set by 12, to see the age of all athletes in months.",
     "background" :"",
     "questionName" : "Bulk Processing: Scalar Multiplication",
     "verify": function(result, query) {
         return (/\/summer_games\/london_medals(\n|.)*?[.]Age(\n|.)*?[*](\n|.)*?12/m).test(query) && result.length === 1019;
      },
     "correct": {"text": "Awesome! ", "score": 10},
     "incorrect": {"text": "Aww, don't give up just yet! Just load the summer games data set <strong>(//summer_games/london_medals)</strong>, drill down into the Age field, and multiply by 12.", "score": -5}
  },{"question": " Try this feature for yourself on the London summer games data <strong>(/summer_games/london_medals)</strong>. Compute the body mass index for all the athletes by dividing their weight (<strong>Weight</strong>)  by their height in meters squared (<strong>HeightIncm</strong>). Make sure to convert centimeters to meters by dividing by 100.  Use the <strong>^2</strong> operator to square the denominator.",
     "background" :"In Quirrel, if you take one set, say <strong>foo</strong>, and apply an operation to it, for example, drilldown into the <strong>bar</strong> property of all the objects in <strong>foo</strong>, then the resulting set is said to be related to <strong>foo</strong>. For example, <strong>foo</strong> is related to <strong>foo.bar</strong>, and <strong>foo * 2</strong> is related to <strong>foo</strong>. Quirrel keeps track of these relations. In any derived set, Quirrel knows which values in the derived set came from which values in the original set. Quirrel uses relations to determine how to evaluate expressions like <strong>foo.a + foo.b</strong>. In this example, Quirrel matches up all the <strong>foo.a</strong> values to the <strong>foo.b</strong> values based on which value in <strong>foo</strong> they came from, and then adds those pairs. This means the expression <strong>orders.shipping + orders.handling</strong> does exactly what you think: for each order inside the set orders, it adds the shipping and handling, so you end up with a set containing the summed shipping and handling charges for all orders.",
     "questionName" : "Relatedness ",
     "verify": function(result, query) {
        // return (/[:][=](\n|.)*?\/summer_games\/london_medals(\n|.)*?[.]Weight(\n|.)*?[\/](\n|.)*?HeightIncm(\n|.)*?[\^](\n|.)*?2/).test(query) && result.length === 909;
         return (/[:][=](\n|.)*?\/summer_games\/london_medals(\n|.)*?[.]Weight(\n|.)*?[\/](\n|.)*?HeightIncm(\n|.)*?2/).test(query) && result.length === 909; //add and test above line when ^ operator is live
      },
     "correct": {"text": "Awesome! Try playing around for a few minutes with this feature so you gain an intuition for what happens when you apply operators like + to entire sets of data.", "score": 10},
     "incorrect": {"text": "Don't sweat it, you can try again! Load the data set and give it a name (<strong>medals := //summer_games/london_medals</strong>), then divide the <strong>Weight</strong> by the <strong>(HeightIncm/100)^2</strong>. Good luck!", "score": -5}
  },{"question": "Try loading the //clicks data set and manipulating the structure of objects in there (changing field names, removing fields, or adding fields).",
     "background" :"Quirrel is a very composable language. You can combine all the different features you've learned together in very powerful ways. For example, let's say you want to take a set of objects, and change their structure in some way. You can do this by combining several operators you learned in Level 1. The following query manipulates the structure of the London medals data set: london := //summer_games/london_medals {name: london.Name, age: london.Age} The resulting data set has only two fields (name and age).",
     "questionName" : "Bulk Processing: Object Manipulation ",
     "verify": function(result, query) {
        return (/\/clicks(\n|.)*?[{](\n|.)*?[}]/).test(query) && result.length > 0;
      },
     "correct": {"text": "Nice work! Quirrel has great support for reshaping data, as well as extracting structure out of unstructured data (such as raw strings).", "score": 10},
     "incorrect": {"text": "Don't be discouraged, you can always try again! Try loading the //clicks data set and changing the structure of some data in there.", "score": -5}
  },{"question": "Try filtering the Olympic data set (//summer_games/london_medals) so you only get back medal information for athletes under 20 years of age.",
     "background" :"One of the most common things you can do with a set of data is filter it: removing values that do not satisfy some constraint. For example, you might want to look at all sales where the gender of the person who placed the order is female. Quirrel supports filtering using the where operator. The syntax is a where b, where a is the set you want to filter, and b is a set of boolean values (of course, the sets have to be related). For example, the expression orders where orders.name != \"Mary Smith\" filters out all the orders where the name is equal to \"Mary Smith\".",
     "questionName" : "Filtering: Simple",
     "verify": function(result, query) {
        return (/\/summer_games\/london_medals(\n|.)*?where(\n|.)*?[.]Age(\n|.)*?[<](\n|.)*?20/).test(query) && result.length === 67;
      },
     "correct": {"text": "Nice work! Quirrel has great support for reshaping data, as well as extracting structure out of unstructured data (such as raw strings).", "score": 10},
     "incorrect": {"text": "Don't be discouraged, you can always try again! Try loading the //clicks data set and changing the structure of some data in there.", "score": -5}
  },{"question": "Try creating a complex filter yourself by combining some of the above operators on the /clicks data set.",
     "background" :"When you are filtering in Quirrel, you can express complex filters using the disjunction (|), conjunction (&), comparison (<, <=, >, >=), and inequality (!=) operators. Take, for example, the following expression orders where orders.name != \"Mary Smith\" & orders.age > 18 | orders.age < 10. This finds all orders by people who are less than 10, or by people who are greater than 18 and not named \"Mary Smith\".",
     "questionName" : "Filtering: Complex",
     "verify": function(result, query) {
        return (/\/\/clicks(\n|.)*?where(\n|.)*?[|&<>!]/).test(query) && result.length > 0;
      },
     "correct": {"text": "You're a natural! Complex filters let you find the exact part of a data set that you are interested in. In addition to the boolean operators introduced in Level 1, you'll soon learn about functions built into Quirrel that can be used to filter text and other unstructured data.", "score": 10},
     "incorrect": {"text": "Don't get discouraged! Try a more complex example of filtering, such as clicks where clicks.customer.gender = \"male\" & clicks.customer.age > 20.", "score": -5}
  },{"question": "Try unioning two different data sets together and see what results you get.",
     "background" :"Quirrel lets you take two different sets, and combine them into a single set. The operation that lets you do this is called union. To union sets foo and bar, simply write, foo union bar.",
     "questionName" : "Union",
     "verify": function(result, query) {
        return (/(\n|.)*?union(\n|.)*?/).test(query) && result.length > 0;
      },
     "correct": {"text": "Superb! Union is very useful when you are splitting data across a few different directories, and want to analyze data across all the directories.", "score": 10},
     "incorrect": {"text": "No worry, you can always try again. Load two data sets and union them together.", "score": -5}
  },{"question": "Try using the difference operator on the //clicks data set to find all the events that do not have a customer.income field.",
     "background" :"Similar to union, Quirrel lets you take the difference of two sets, which means taking one set, and removing all elements that are contained in another set. To take the difference of sets a and b, write a difference b. This will return a new set that contains all elements that are in a, which are not also in b. Difference is one way to find data that is missing fields. The expression foo difference (foo where foo.a = foo.a) will find all values of foo that do not have a field a. ",
     "questionName" : "Difference",
     "verify": function(result, query) {
        return (/\/\/clicks(\n|.)*?difference(\n|.)*?/).test(query) && result.length ===  65099;
      },
     "correct": {"text": "You've got it! When the <strong>where</strong> operator won't work, consider using the <strong>difference</strong> operator instead. ", "score": 10},
     "incorrect": {"text": "Awww! No matter, you can try again. Use the difference operator to return the events in the clicks dataset that don't have a a customer.income field.  Consider loading the following datasets:  <span>clicks := //clicks \n\nclicks' := clicks where clicks.customer.income\n\n = clicks.customer.income</span> and taking the difference of them.", "score": -5}
  },{"question": "Try taking the intersection of two sets and see what happens!",
     "background" :"Quirrel also supports taking the intersection of two sets, which gives you all the elements that are contained in both of the sets. To take the intersection of sets a and b, simply write a intersect b. The result is a set that contains all the elements that are in both a and b. If an element is in just a but not b, or in just b and not a, the element will not be in the result.",
     "questionName" : "Intersection",
     "verify": function(result, query) {
        return (/(\n|.)*?intersect(\n|.)*?/).test(query) && result.length > 0;
      },
     "correct": {"text": "Nice job! Notice that the intersection of any set with undefined is always empty. Similarly, the intersection of any set with itself is equal to that set.", "score": 10},
     "incorrect": {"text": "Try again! Perform the intersection on any two sets and see what you get back.", "score": -5}
  }
  ],
  "conclusion":{
    "title": "Conclusion",
     "finished" : "Congratulations! You've finished the second level of Quirrel Game I! You now have a basic mastery of the Quirrel data model and all the core Quirrel operators.",
     "next" : "In the next level, you get to start working with whole data sets, as you learn about loading and manipulating data. Good luck!"
  }
}
})();
