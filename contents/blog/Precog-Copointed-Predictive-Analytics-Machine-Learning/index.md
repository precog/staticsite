title: Precog Copointed Predictive Analytics and Machine Learning in Quirrel
author: Nathan Lubchenco
date: 2012-04-25 10:00
template: post.jade

One feature that sets Precog apart from many embedded reporting solutions is the possibility to perform advanced analytics.  This includes the ability to perform predictive analytics.  Among other things, predictions can be used to create personalizations, recommendations or other sales optimizations.

In this blog post, we will cover simple introductory examples of clustering, linear regression, logistic regression and applying evaluation metrics.  The code snippets included will use data included in the demo version of Labcoat so that you can run the queries and modify if desired.

Clustering
----------
Cluster analysis is the process of finding groups in a set of data that are similar to each other.  The notion of similarity can vary depending on the specific clustering algorithm used, but the general idea is to find points in the data that minimize the distance between those points and the rest of the points in the data.  For more details, see an overview or the details on the specific algorithm we use.

Suppose we had some demographic data and wanted to do customer segmentation.  A query like the this would automatically find natural segments in the data and allow us to examine if there is any meaningful difference in customer behavior.

>import std::stats::*
>conversions := //conversions
>
>input := { age : conversions.customer.age }
>model := kMedians( input, 7 )
>
>conversions' := conversions with {cluster : assignClusters(input, model) }
>
>solve 'cluster
>  {
>  cluster: 'cluster,
>  mean : mean(conversions'.product.price where conversions'.cluster.model1.clusterId = 'cluster)
>  }  

Check out this query in Labcoat.

Creating clusters is as easy as passing data to cluster on to the kMedians function and deciding how many clusters to create.  The resulting model will contain centroids that minimize the distance between each datapoint and its closest centroid. This model can then be used to assign existing data to a particular cluster for historical analysis or assign incoming data to a cluster for near real-time usage.

While many of the clusters have similar mean sales in this example there is still a significant discrepancy between the cluster with the highest mean sales being over 22% higher than the cluster with the lowest mean sales. Depending upon the demographics and cost of acquiring customers in the various clusters, this could be a meaningful insight that boosts average sales and revenue.

Linear Regression
-----------------

Linear regression is a statistical technique for modeling the best fit line through a set of data points.  Given its name of linear, it should be clear that linear regression can have difficulty predicting relationships that are non-linear, but linear regression is the best linear unbiased estimator of non-linear relationships.

A regression equation is of the form:

> y = x0 + ẞ1x1 + ẞ2x2 + ...

where y is the dependent variable being predicted, x0 is a constant y-intercept, x1 through xn are dependent variables and ẞ1 through ẞn are the coefficients.  The interpretation of a regression is that for each 1 unit increase in x1 there will on average be associated a ẞ1 change in y.  

A common example from economics is to look at the relationship between years of education and annual income.  In this example, years of education will be an independent variable and we are attempting to determine its relationship to annual income which will be the dependent variable :

> annual income in dollars = some constant + ẞ1 * years of education + ....

The ... is important here.  These represent control variables that attempt to narrow the comparison as much as possible.  In this example, they might be things like race, gender, region and industry.  This helps isolate specifically the relationship that years of education has with annual income. Suppose that ẞ1 is 3,000.  Then, on average, a 1 year increase in years of education is associated with a $3,000 increase in annual earnings.

Part of what is so nice about linear regression is that it has such a clean and useful explanatory capability.  For raw predictive power, random forest will typically outperform linear regression, but linear regression still has a place in understanding specific relationships and their magnitude.  

In this example, we examine the relationship between an athlete’s weight and their height, age and medals won at the summer games in london.

>medals := //summer_games/london_medals
>
>indVars :=
>{
>HeightIncm : medals.HeightIncm,
>Age : medals.Age,
>Total : medals.Total
>}
>
>std::stats::linearRegression(medals.Weight, indVars)

Run this query in Labcoat.

And a look at a subset of the output:

>"model2": {
>     "coefficients": [
>       {
>         "HeightIncm": {
>           "estimate": 1.0997392523919332,
>           "standardError": 0.031407749767906355
>         },
>         "Total": {
>           "standardError": 0.7136294756726215,
>           "estimate": 1.5812939398407877
>         },
>         "Age": {
>           "estimate": 0.11920578883597059,
>           "standardError": 0.06478117116040236
>         }
>       },
>       {
>         "estimate": -125.49027015629706,
>         "standardError": 5.802076482230592
>       }
>     ],
>     "residualStandardError": {
>       "estimate": 10.505454174431426,
>       "degreesOfFreedom": 905
>     },
>     "RSquared": 0.5814684929851268
>   }

Some things to notice above, starting from the bottom.  The RSquared value is a measure of percentage of variance explained by the regression.  Evaluating a RSquared value is typically quite domain dependent but gives some initial indication as to the explanatory power of the model.  Next, looking at the dependent variables of height, age and medals we notice the estimate which is the coefficient and a standard error.  The ratio of the estimate to the standard error helps indicate what is statistically significant (a ratio of 2 or higher is generally meaningful). Both age and total are borderline, while height (unsurprisingly) is quite significant.  Each additional centimeter of height is on average associated with an additional kilogram of weight.  Notice also the high negative value of the y-intercept that this has to overcome.

Logistic Regression
-------------------

Logistic regression is regression designed for classification as opposed to predicting a continuous value.  It is appropriate when the dependent variable is categorical. An example of a  categorical variable would be a set of colors.  If "green" is coded as 4 in our data and "blue" is coded as "2" it does not mean that we would expect to see twice the effect from a "green" than from a "blue".  Our current implementation of logistic regression is limited to the binary case of predicting 1s and 0s.  To classify a multinomial categorical variable, you can use random forest.

We might also be interested in attempting to predict demographic data from other data we have access to.  These predictions might be fuzzy in their accuracy, but imputed values may still provide additional opportunities to make custom recommendations or sales optimizations.  For example, there may be recommendations that can be made based on gender.  So we can create a model that will predict gender based on the price of the product purchased and the age of the customer.

>import std::stats::*
>
>conversions := //conversions
>conversions' := conversions with {female : if conversions.customer.gender = "female" then 1 else 0 }
>
>indVars :=
> {
> price : conversions'.product.price,
> age : conversions'.customer.age
> }
>
>logisticRegression( conversions'.female, indVars)

View in Labcoat.

The resulting model will give us a probability  estimate based on the price of the product being considered and the age of the customer that the customer is female. This can then be used to impute missing values in historical data or as a real-time prediction to generate dynamic content in an application.  

Evaluation Metrics
-----------------

It is often helpful to have some means of evaluating the quality of a prediction.  There are a multitude of such evaluation metrics and deciding on the correct one is an important part of the process (which is beyond the scope of this post).  For a list of a number of metrics and their implementations in number of languages, see Ben Hamner’s repository of metrics used in Kaggle competitions.

Let’s focus on creating and deploying a single evaluation metric in Quirrel.  We’ll use root mean squared error (RMSE) because its relatively common.

RMSE = sqrt(mean(observed - predicted)^2)

In Quirrel, we can create a user-defined function that will calcluate the RMSE:

>rmse(observed, predicted) :=
>
> diff := observed - predicted
>
> std::math::sqrt((mean(diff^2)))

Now we just need some observed and predicted values to feed into our function. Let’s return the olympics data, split it into a training and test set and use our model to predict the weight of athletes in the test set.

>medals := //summer_games/london_medals
>
>filter := observe(medals, std::random::uniform(38))
>train := medals where filter <= 0.8
>test := medals where filter > 0.8
>
>indVars :=
>{
>HeightIncm : train.HeightIncm,
>Age : train.Age,
>Total : train.Total
>}
>
>model := std::stats::linearRegression(train.Weight, indVars)
>prediction := std::stats::predictLinear(test, model)
>
>results := test with {prediction : prediction}
>
>rmse(predicted, observed) :=
> diff := observed - predicted
> std::math::sqrt((mean(diff^2)))
>
>{
>model1rmse : rmse(results.prediction.model1.fit, results.Weight),
>model2rmse : rmse(results.prediction.model2.fit, results.Weight)
>}

See the results in Labcoat.

Note that the results include rmse for two different models.  This is because Precog supports heterogeneous data.  So linear regression will create a model for each schema in the data.  Some observations are missing data for height, which dramatically reduces the quality of the prediction.  Notice that the RMSE for the model with height is almost twice as good as the model without.  This can help you understand your data better and the value that each component provides.

These examples just scratch the surface of the ability to use Precog to leverage your data to create meaningful, revenue enhancing predictions in your application.  But they show how Precog is different from many traditional BI platforms and is focused on data science for deep, useful analysis.  