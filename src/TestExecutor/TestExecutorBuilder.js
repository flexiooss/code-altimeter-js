const Test = require('../Testable/Test')
const TestCase = require('../Testable/TestCase')
const TestSuite = require('../Testable/TestSuite')
const TestExecutor = require('./TestExecutor')
const TestCaseExecutor = require('./TestCaseExecutor')
const TestSuiteExecutor = require('./TestSuiteExecutor')

class TestExecutorBuilder {
  /**
   * @static
   * @param {Array<{test: HaveTestExecutor, testName: ?string}>} test
   * @param {TestRun} runner
   * @return {TestExecutable}
   */
  static build(test, runner) {
    switch (test.test.constructor) {
      case Test:
        return new TestExecutor(test.test,test.testName, runner)
      case TestCase:
        return new TestCaseExecutor(test.test, runner)
      case TestSuite:
        return new TestSuiteExecutor(test.test, runner)
      default:
        throw Error('This Test have no Executor')
    }
  }
}

module.exports = TestExecutorBuilder
