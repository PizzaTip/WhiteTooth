# WhiteTooth - Mock API
Mock API for teams with multi environment support

![WhiteTooth CI](https://github.com/PizzaTip/WhiteTooth/workflows/WhiteTooth%20CI/badge.svg)

## Alpha Version
This vesrion already supports basic fetures of the planned features for WhithTooth.

1. Basic mocking abilities - cross environments (based on url)
2. Mocking **Json responses only** - ideal for REST APIs.
3. Currently **supports only get** requests

### How to run the Mock API server?
Using your favourite shell pointed to `/API/Api` folder run `npm run api` and a basic mock API will be available on port 3000.

#### Configure an environment
Create new file `<environment_name>Environment.json` in the `Data/Environments` folder.
You can see the exiting examples of `StagingEnvironment.json` and `TestEnvironment.json`.

An environment must contain the following properties:

1. name
2. relativePath
3. responses

**Example environment configuration**:
```
{
  "name": "test",
  "relativePath": "/test",
  "responses": {
    "/test-endpoint": {
      "get": {
        "result": "I am test endpoint on test environment [get]"
      },
      "post": {}
    }
  }
}

```

When the API is running call `http://127.0.0.1:3000/test/test` will return the `get` response under `test-endpoint` under `test` environemnt.

## Roadmap
- Support POST/PUT/PATCH responses
- Support more response mime types:
  - text/html
  - image/jpeg, image/png
  - application/pdf
- UI Dashboard to control the environment management
  - CRUD environemnt
- More features to come... stay tuned


