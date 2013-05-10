title: Rest API
author: Matthew De Goes
date: 2013-03-26 12:20
template: page-devcntr.jade

## Accounts API

The API calls below are given relative to an analytics service. For example, create an account is documented as: POST /accounts/v1/accounts/. The full call will include the analytics service such as https://beta.precog.com:

    POST https://beta.precog.com/accounts/v1/accounts/

Tic variables such as <span class="tool-tip-account-id">'accountId</span>, <span class="tool-tip-path">'path</span>, <span class="tool-tip-apikey tool-tip-apikey">'apiKey</span>, and <span class="tool-tip-grant-id">'grantId</span> are used to indicate a place where you should replace the tic variable with the relevant information. For example, to describe account 0001205271:

    GET /accounts/v1/accounts/<span class="tool-tip-account-id">'accountId</span>/

becomes:

    GET /accounts/v1/accounts/0001205271/

## Accounts API

The accounts API is responsible for account management on the Precog platform. Accounts are identified by an account number, which is tied to a unique email address. Each email address can be associated with only one account.

All use of the accounts API must be encrypted using SSL/TLS. All API methods except creating a new account must be authenticated using HTTP basic authentication. Any attempt to use the accounts API without proper encryption and / or authentication will fail with an access denied error.

### Create Account

  * JSON{.rest-request}
  * POST
  * POST /accounts/v1/accounts/
  * description
  * Creates a new account ID, accessible by the specified email address and password, or returns the existing account ID. An email address may be associated with at most one account. This is the only accounts API method that does not require HTTP Basic authentication. Anyone can create an account on the Precog platform, which will be subscribed to the free plan by default and provisioned with a new account root directory (the path to which is the same as the newly created account ID) and API key providing grants to all available permissions for that directory. To retrieve the API key and other information, use the &Ocirc;describe' call described below.
  * request body
  *    {
    "email": "jdoe@gmail.com",
    "password": "someFancyString"
    }
  * response body
  * Returns the account id of the new (or existing) account. Account IDs are not secure identifiers, and may appear in publicly available URLs and so forth without compromising account security.
  *    {"accountId": "2389482834"}  

### Describe an Account

  * JSON
  * GET
  * GET /accounts/v1/accounts/<span class="tool-tip-account-id">'accountId</span>
  * description
  * Retrieves the details about a particular account. This call is the primary mechanism by which you can retrieve your master API key.
  * response body
  *    {
    "accountId": 9384923423,
    "email": "jdoe@gmail.com",
    "accountCreationDate": "09-21-2001",
    "apiKey": "[masterAPIKey]",
    "rootPath": "/jdoe/",
    "plan": {
    "type": "developer",
    }
    }

### Add a Grant to an Account

  * JSON
  * POST
  * POST /accounts/v1/accounts/<span class="tool-tip-account-id">'accountId</span>/grants/
  * description
  * Adds a grant to an account's API key. This method is conceptually equivalent to retrieving the API key of the account, and then using the security API to add the specified grant to the API key. The main difference is that this method does not require the client to know the API key of the account. Therefore, this method represents a secure, anonymous way to add additional grants to a third-party account, without first knowing the API key of that account. This request requires HTTP Basic authentication.
  * request body
  *     {"grantId": "[Grant Id]"}
  
### Describe an Account's Plan

  * JSON
  * GET
  * GET /accounts/v1/accounts/<span class="tool-tip-account-id">'accountId</span>/plan
  * response body
  *    {"type": "free"}

### Change an Account's Plan

  * JSON
  * PUT
  * PUT /accounts/v1/accounts/<span class="tool-tip-account-id">'accountId</span>/plan
  * description
  * Changes an account's plan (only the plan type itself may be changed). Billing for the new plan, if appropriate, will be prorated.
  * request body
  *    {"type": "bronze"}

### Change an Account's Password

  * JSON
  * PUT
  * PUT /accounts/v1/accounts/<span class="tool-tip-account-id">'accountId</span>/password
  * description
  * Changes your account access password. This call requires HTTP Basic authentication using the current password.
  * request body
  *    {"password": "myPassword"}

### Delete an Account's Plan

  * JSON
  * DELETE
  * DELETE /accounts/v1/accounts/<span class="tool-tip-account-id">'accountId</span>/plan
  * description
  * Deletes an account's plan. This is the same as switching a plan to the free plan.