const TestSuite = require('../Testable/TestSuite')
const SingleTestExecutor = require('./SingleTestExecutor')
const TestCaseExecutor = require('./TestCaseExecutor')
const TestSuiteExecutor = require('./TestSuiteExecutor')

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
      return new SingleTestExecutor(
        testDescription.test,
        testDescription.testName,
        runner
      )
    } else {
      return new TestCaseExecutor(
        testDescription.test,
        runner
      )
    }
  }
}

module.exports = TestExecutorBuilder
