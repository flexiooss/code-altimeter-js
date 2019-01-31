/* global TestRun */
/**
 *
 * @param {HaveTestExecutor} test
 */
const runTest = function(test) {
  TestRun.addTest(test)
}

module.exports = runTest
