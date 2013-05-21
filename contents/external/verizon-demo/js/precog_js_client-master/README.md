# Precog Client for JavaScript

[Precog](http://www.precog.com/) is a powerful analytics platform for
JSON data. This JavaScript client allows easy streaming, uploading,
and querying of data.

## Installation

### Browser

Include `precog.min.js` to get a global `Precog` object:

```html
<script src="precog.min.js"></script>
```

### node.js

Install the `precog` library:

```bash
npm install precog
```

And load the library:

```javascript
var precog = require('precog');
```

## Getting Started

1. Create a new Precog API by specifying your API key.

    ```
    var api = new Precog.api({"apiKey": "[MY API KEY]", "analyticsService" : "https://beta.precog.com"});
    ```
2. Upload or stream some JSON data into a subdirectory of your base path. Your base path starts with your Precog account ID.

    ```
    api.append({path: '/[MY ACCOUNT ID]/test', value: {age: 29, gender: 'male'}});
    ```
3. Query your JSON data.

    ```
    api.execute({query: 'count(//[MY ACCOUNT ID]/test)'});
    ```

## Documentation

Visit the
[Precog Developer Center](http://www.precog.com/developers/)
for documentation on the REST API and client libraries.

## Development

If you would like to made modifications to the source, you can build a
distribution by running the following from the project directory:

```bash
npm install
```

Tests can be run from npm:

```bash
npm test
```

Or by loading `test-api.htm` under the `test` directory into a
browser.