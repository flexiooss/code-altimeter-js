const TestCaseExecutor = require('../TestExecutor/TestCaseExecutor')

/**
 * @implements {HaveTestExecutor}
 */
class TestCase {
  /**
   * @static
   * @param {TestCase} testCase
   * @param {TestRun} runner
   * @return {TestExecutable}
   */
  static executor(testCase, runner) {
    return new TestCaseExecutor(testCase, runner)
  }

  static beforeClass() {
  }

  static afterClass() {
  }

  setUp() {
  }

  tearDown() {
  }
}

module.exports = TestCase
