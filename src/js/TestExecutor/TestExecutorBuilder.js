const TestSuite = require('../Testable/TestSuite')
const SingleTestExecutor = require('./SingleTestExecutor')
const AsyncSingleTestExecutor = require('./AsyncSingleTestExecutor')
const TestCaseExecutor = require('./TestCaseExecutor')
const TestSuiteExecutor = require('./TestSuiteExecutor')
const {TEST_METHOD_PREFIX, ASYNC_TEST_METHOD_PREFIX} = require('../constantes')

class TestExecutorBuilder {
  /**
   * @static
   * @param {{test: HaveTestExecutor, testName: ?string}} testDescription
   * @param {TestRun} runner
   * @return {TestExecutable}
   */
  static build(testDescription, runner) {
    if (testDescription.test instanceof TestSuite) {
      return new TestSuiteExecutor(
        testDescription.test,
        runner
      )
    } else if (testDescription.testName !== null) {
      if (testDescription.testName.startsWith(ASYNC_TEST_METHOD_PREFIX)) {
        return new AsyncSingleTestExecutor(
          testDescription.test,
          testDescription.testName,
          runner
        )
      } else if (testDescription.testName.startsWith(TEST_METHOD_PREFIX)) {
        return new SingleTestExecutor(
          testDescription.test,
          testDescription.testName,
          runner
        )
      }
      throw new Error('no test found')
    } else {
      return new TestCaseExecutor(
        testDescription.test,
        runner
      )
    }
  }
}

module.exports = TestExecutorBuilder
