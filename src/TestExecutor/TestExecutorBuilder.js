const Test = require('../Testable/Test')
const TestCase = require('../Testable/TestCase')
const TestSuite = require('../Testable/TestSuite')
const TestExecutor = require('./TestExecutor')
const TestCaseExecutor = require('./TestCaseExecutor')
const TestSuiteExecutor = require('./TestSuiteExecutor')

class TestExecutorBuilder {
  /**
   * @static
   * @param {HaveTestExecutor} test
   * @return {TestExecutable}
   */
  static build(test) {
    switch (test.constructor) {
      case Test:
        return new TestExecutor(test)
      case TestCase:
        return new TestCaseExecutor(test)
      case TestSuite:
        return new TestSuiteExecutor(test)
      default:
        throw Error('This Test have no Executor')
    }
  }
}

module.exports = TestExecutorBuilder
