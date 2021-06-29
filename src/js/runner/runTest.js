/* global TestRun */
/**
 *
 * @param {HaveTestExecutor} test
 * @param {?string} testName
 */
const runTest = function(test, testName = null) {
  TestRun.addTest(test, testName)
}

module.exports = runTest
