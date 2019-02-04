const TestCase = require('../Testable/TestCase')
const TestSuite = require('../Testable/TestSuite')
const TestExecutor = require('./TestExecutor')
const TestCaseExecutor = require('./TestCaseExecutor')
const TestSuiteExecutor = require('./TestSuiteExecutor')

class TestExecutorBuilder {
  /**
   * @static
   * @param {Array<{test: HaveTestExecutor, testName: ?string}>} testDescription
   * @param {TestRun} runner
   * @return {TestExecutable}
   */
  static build(testDescription, runner) {
    if (testDescription.test instanceof TestCase && testDescription.testName !== null) {
      return new TestExecutor(testDescription.test, testDescription.testName, runner)
    } else if (testDescription.test instanceof TestCase) {
      return new TestCaseExecutor(testDescription.test, runner)
    } else if (testDescription.test instanceof TestSuite) {
      return new TestSuiteExecutor(testDescription.test, runner)
    } else {
      throw Error('This Test have no Executor')
    }
  }
}

module.exports = TestExecutorBuilder
