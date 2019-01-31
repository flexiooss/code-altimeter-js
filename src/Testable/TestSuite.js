const TestSuiteExecutor = require('../TestExecutor/TestSuiteExecutor')

/**
 * HaveTestExecutor
 */
class TestSuite {
  constructor() {
    /**
     *
     * @type {Array<TestCase>}
     * @private
     */
    this.__test = []
  }

  run() {
    new TestSuiteExecutor(this).exec()
  }

  /**
   *
   * @param {TestCase} test
   * @return {TestSuite}
   */
  addTestCase(test) {
    this.__test.push(test)
    return this
  }

  /**
   *
   * @return {number}
   */
  countOfTestCase() {
    return this.__test.length
  }

  /**
   *
   * @return {Array<TestCase>}
   */
  get testCases() {
    return this.__test
  }
}

module.exports = TestSuite
