[**@sundaeswap/core**](../README.md) • **Docs**

***

# Testing

## Testing
Writing unit tests for large packages can be a daunting
task. To help make this easier, we've developed some useful tests and mocks for your downstream project.

The Mocks can be used for mocking the imports in order to help reduce your API surface that must be tested.
For example, rather than loading the entire SundaeSDK library, you can mock it and just confirm that a method
from the SDK was actually called within your app.
