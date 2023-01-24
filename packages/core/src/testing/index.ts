/**
 * ## Testing
 * Writing unit tests for large packages, especially those that use WASM like Lucid, can be a daunting
 * task. To help make this easier, we've developed some useful tests and mocks for your downstream project.
 *
 * The Mocks can be used for mocking the imports in order to help reduce your API surface that must be tested.
 * For example, rather than loading the entire SundaeSDK library, you can mock it and just confirm that a method
 * from the SDK was actually called within your app. See {@link Testing.Mocks}
 *
 * In addition, for those who build custom {@link Core.TxBuilder} and {@link Core.DatumBuilder} classes, we've added
 * base tests that you can run on these classes to ensure that your Order builds output the expected
 * hex-encoded CBOR when writing your own unit tests on them. See {@link Testing.DatumBuilderTests}
 *
 * @group Testing
 * @module Testing
 * @packageDescription
 */
import * as DatumBuilderTests from "./DatumBuilder";
import * as Mocks from "./mocks";

export { DatumBuilderTests, Mocks };
