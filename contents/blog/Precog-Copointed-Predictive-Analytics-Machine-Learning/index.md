title: "Precog Copointed: Predictive Analytics and Machine Learning in Quirrel"
author: Nathan Lubchenco
date: 2013-04-25 01:00
template: post.jade

One feature that sets Precog apart from many embedded reporting solutions is the possibility to perform advanced analytics.  This includes the ability to perform predictive analytics.  Among other things, predictions can be used to create personalizations, recommendations or other sales optimizations.

In this blog post, we will cover simple introductory examples of clustering, linear regression, logistic regression and applying evaluation metrics.  The code snippets included will use data included in the demo version of <a href="http://labcoat.precog.com/">Labcoat</a> so that you can run the queries and modify if desired.

Clustering
----------
<a href="http://en.wikipedia.org/wiki/Cluster_analysis">Cluster analysis</a> is the process of finding groups in a set of data that are similar to each other.  The notion of similarity can vary depending on the specific clustering algorithm used, but the general idea is to find points in the data that minimize the distance between those points and the rest of the points in the data.  For more details, see an overview or the details on the <a href="http://valis.cs.uiuc.edu/~sariel/papers/03/kcoreset/kcoreset.pdf">specific algorithm we use</a>.

Suppose we had some demographic data and wanted to do customer segmentation.  A query like the this would automatically find natural segments in the data and allow us to examine if there is any meaningful difference in customer behavior.

`import std::stats::*
conversions := //conversions

input := { age : conversions.customer.age }
model := kMedians( input, 7 )

conversions' := conversions with {cluster : assignClusters(input, model) }

solve 'cluster
  {
  cluster: 'cluster,
  mean : mean(conversions'.product.price where conversions'.cluster.model1.clusterId = 'cluster)
  }`  

<a href="https://labcoat.precog.com/?q=import+std%3A%3Astats%3A%3A*%0Aconversions+%3A%3D+%2F%2Fconversions%0A%0Ainput+%3A%3D+{+age+%3A+conversions.customer.age+}%0Amodel+%3A%3D+kMedians%28+input%2C+7+%29%0A%0Aconversions%27+%3A%3D+conversions+with+{cluster+%3A+assignClusters%28input%2C+model%29+}%0A%0Asolve+%27cluster%0A++{%0A++cluster%3A+%27cluster%2C%0A++mean+%3A+mean%28conversions%27.product.price+where+conversions%27.cluster.model1.clusterId+%3D+%27cluster%29%0A++}&apiKey=5CDA81E8-9817-438A-A340-F34E578E86F8&analyticsService=https%3A%2F%2Flabcoat.precog.com%2F">Check out this query in Labcoat.</a>

Creating clusters is as easy as passing data to cluster on to the kMedians function and deciding how many clusters to create.  The resulting model will contain centroids that minimize the distance between each datapoint and its closest centroid. This model can then be used to assign existing data to a particular cluster for historical analysis or assign incoming data to a cluster for near real-time usage.

While many of the clusters have similar mean sales in this example there is still a significant discrepancy between the cluster with the highest mean sales being over 22% higher than the cluster with the lowest mean sales. Depending upon the demographics and cost of acquiring customers in the various clusters, this could be a meaningful insight that boosts average sales and revenue.

Linear Regression
-----------------

<a href="http://en.wikipedia.org/wiki/Linear_regression">Linear regression</a> is a statistical technique for modeling the best fit line through a set of data points.  Given its name of linear, it should be clear that linear regression can have difficulty predicting relationships that are non-linear, but linear regression is the best linear unbiased estimator of non-linear relationships.

A regression equation is of the form:

` y = x0 + ẞ1x1 + ẞ2x2 + ... `

where y is the dependent variable being predicted, x0 is a constant y-intercept, x1 through xn are dependent variables and ẞ1 through ẞn are the coefficients.  The interpretation of a regression is that for each 1 unit increase in x1 there will on average be associated a ẞ1 change in y.  

A common example from economics is to look at the relationship between years of education and annual income.  In this example, years of education will be an independent variable and we are attempting to determine its relationship to annual income which will be the dependent variable :

` annual income in dollars = some constant + ẞ1 * years of education + .... `

The ... is important here.  These represent control variables that attempt to narrow the comparison as much as possible.  In this example, they might be things like race, gender, region and industry.  This helps isolate specifically the relationship that years of education has with annual income. Suppose that ẞ1 is 3,000.  Then, on average, a 1 year increase in years of education is associated with a $3,000 increase in annual earnings.

Part of what is so nice about linear regression is that it has such a clean and useful explanatory capability.  For raw predictive power, random forest will typically outperform linear regression, but linear regression still has a place in understanding specific relationships and their magnitude.  

In this example, we examine the relationship between an athlete’s weight and their height, age and medals won at the summer games in london.

`medals := //summer_games/london_medals

indVars :=
{
HeightIncm : medals.HeightIncm,
Age : medals.Age,
Total : medals.Total
}

std::stats::linearRegression(medals.Weight, indVars)`

<a href"https://labcoat.precog.com/?q=medals+%3A%3D+%2F%2Fsummer_games%2Flondon_medals%0A%0AindVars+%3A%3D%0A{%0AHeightIncm+%3A+medals.HeightIncm%2C%0AAge+%3A+medals.Age%2C%0ATotal+%3A+medals.Total%0A}%0A%0Astd%3A%3Astats%3A%3AlinearRegression%28medals.Weight%2C+indVars%29&apiKey=5CDA81E8-9817-438A-A340-F34E578E86F8&analyticsService=https%3A%2F%2Flabcoat.precog.com%2F">Run this query in Labcoat.</a>

And a look at a subset of the output:

`"model2": {
     "coefficients": [
       {
         "HeightIncm": {
           "estimate": 1.0997392523919332,
           "standardError": 0.031407749767906355
         },
         "Total": {
           "standardError": 0.7136294756726215,
           "estimate": 1.5812939398407877
         },
         "Age": {
           "estimate": 0.11920578883597059,
           "standardError": 0.06478117116040236
         }
       },
       {
         "estimate": -125.49027015629706,
         "standardError": 5.802076482230592
       }
     ],
     "residualStandardError": {
       "estimate": 10.505454174431426,
       "degreesOfFreedom": 905
     },
     "RSquared": 0.5814684929851268
   }`

Some things to notice above, starting from the bottom.  The RSquared value is a measure of percentage of variance explained by the regression.  Evaluating a RSquared value is typically quite domain dependent but gives some initial indication as to the explanatory power of the model.  Next, looking at the dependent variables of height, age and medals we notice the estimate which is the coefficient and a standard error.  The ratio of the estimate to the standard error helps indicate what is statistically significant (a ratio of 2 or higher is generally meaningful). Both age and total are borderline, while height (unsurprisingly) is quite significant.  Each additional centimeter of height is on average associated with an additional kilogram of weight.  Notice also the high negative value of the y-intercept that this has to overcome.

Logistic Regression
-------------------

Logistic regression is regression designed for classification as opposed to predicting a continuous value.  It is appropriate when the dependent variable is categorical. An example of a  categorical variable would be a set of colors.  If "green" is coded as 4 in our data and "blue" is coded as "2" it does not mean that we would expect to see twice the effect from a "green" than from a "blue".  Our current implementation of logistic regression is limited to the binary case of predicting 1s and 0s.  To classify a multinomial categorical variable, you can use random forest.

We might also be interested in attempting to predict demographic data from other data we have access to.  These predictions might be fuzzy in their accuracy, but imputed values may still provide additional opportunities to make custom recommendations or sales optimizations.  For example, there may be recommendations that can be made based on gender.  So we can create a model that will predict gender based on the price of the product purchased and the age of the customer.

`import std::stats::*

conversions := //conversions
conversions' := conversions with {female : if conversions.customer.gender = "female" then 1 else 0 }

indVars :=
 {
 price : conversions'.product.price,
 age : conversions'.customer.age
 }

logisticRegression( conversions'.female, indVars)`

<a href="https://labcoat.precog.com/?q=import+std%3A%3Astats%3A%3A*%0Aconversions+%3A%3D+%2F%2Fconversions%0Aconversions%27+%3A%3D+conversions+with+{female+%3A+if+conversions.customer.gender+%3D+%22female%22+then+1+else+0+}%0A%0AindVars+%3A%3D%0A+{%0A+price+%3A+conversions%27.product.price%2C%0A+age+%3A+conversions%27.customer.age%0A+}%0A%0AlogisticRegression%28+conversions%27.female%2C+indVars%29&apiKey=5CDA81E8-9817-438A-A340-F34E578E86F8&analyticsService=https%3A%2F%2Flabcoat.precog.com%2F">View in Labcoat.</a>

The resulting model will give us a probability  estimate based on the price of the product being considered and the age of the customer that the customer is female. This can then be used to impute missing values in historical data or as a real-time prediction to generate dynamic content in an application.  

Evaluation Metrics
-----------------

It is often helpful to have some means of evaluating the quality of a prediction.  There are a multitude of such evaluation metrics and deciding on the correct one is an important part of the process (which is beyond the scope of this post).  For a list of a number of metrics and their implementations in number of languages, see <a href="https://github.com/benhamner/Metrics">Ben Hamner’s repository</a> of metrics used in <a href="http://www.kaggle.com/"Kaggle competitions</a>.

Let’s focus on creating and deploying a single evaluation metric in Quirrel.  We’ll use root mean squared error (RMSE) because its relatively common.

RMSE = sqrt(mean(observed - predicted)^2)

In Quirrel, we can create a user-defined function that will calcluate the RMSE:

`rmse(observed, predicted) :=

 diff := observed - predicted

 std::math::sqrt((mean(diff^2)))`

Now we just need some observed and predicted values to feed into our function. Let’s return the olympics data, split it into a training and test set and use our model to predict the weight of athletes in the test set.

`medals := //summer_games/london_medals

filter := observe(medals, std::random::uniform(38))
train := medals where filter <= 0.8
test := medals where filter > 0.8

indVars :=
{
HeightIncm : train.HeightIncm,
Age : train.Age,
Total : train.Total
}

model := std::stats::linearRegression(train.Weight, indVars)
prediction := std::stats::predictLinear(test, model)

results := test with {prediction : prediction}

rmse(predicted, observed) :=
 diff := observed - predicted
 std::math::sqrt((mean(diff^2)))

{
model1rmse : rmse(results.prediction.model1.fit, results.Weight),
model2rmse : rmse(results.prediction.model2.fit, results.Weight)
}`

<a href="https://labcoat.precog.com/?q=medals+%3A%3D+%2F%2Fsummer_games%2Flondon_medals%0A%0Afilter+%3A%3D+observe%28medals%2C+std%3A%3Arandom%3A%3Auniform%2838%29%29%0Atrain+%3A%3D+medals+where+filter+%3C%3D+0.8%0Atest+%3A%3D+medals+where+filter+%3E+0.8%0A%0AindVars+%3A%3D%0A{%0AHeightIncm+%3A+train.HeightIncm%2C%0AAge+%3A+train.Age%2C%0ATotal+%3A+train.Total%0A}%0A%0Amodel+%3A%3D+std%3A%3Astats%3A%3AlinearRegression%28train.Weight%2C+indVars%29%0Aprediction+%3A%3D+std%3A%3Astats%3A%3ApredictLinear%28test%2C+model%29%0Aresults+%3A%3D+test+with+{prediction+%3A+prediction}%0A%0Armse%28predicted%2C+observed%29+%3A%3D%0A+diff+%3A%3D+observed+-+predicted%0A+std%3A%3Amath%3A%3Asqrt%28%28mean%28diff^2%29%29%29%0A%0A{%0Amodel1rmse+%3A+rmse%28results.prediction.model1.fit%2C+results.Weight%29%2C%0Amodel2rmse+%3A+rmse%28results.prediction.model2.fit%2C+results.Weight%29%0A}&apiKey=5CDA81E8-9817-438A-A340-F34E578E86F8&analyticsService=https%3A%2F%2Flabcoat.precog.com%2F">See the results in Labcoat</a>.

Note that the results include rmse for two different models.  This is because Precog supports heterogeneous data.  So linear regression will create a model for each schema in the data.  Some observations are missing data for height, which dramatically reduces the quality of the prediction.  Notice that the RMSE for the model with height is almost twice as good as the model without.  This can help you understand your data better and the value that each component provides.

These examples just scratch the surface of the ability to use Precog to leverage your data to create meaningful, revenue enhancing predictions in your application.  But they show how Precog is different from many traditional BI platforms and is focused on data science for deep, useful analysis.  