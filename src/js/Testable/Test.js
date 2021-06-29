const TestExecutor = require('../TestExecutor/TestExecutor')

/**
 * @implements {HaveTestExecutor}
 */
class Test {
  /**
   *
   * @param {TestCase} testCase
   * @param {string} testName
   * @param {TestRun} runner
   * @return {TestExecutable}
   */
  static executor(testCase, testName, runner) {
    return new TestExecutor(testCase, testName, runner)
  }
}
module.exports = Test
