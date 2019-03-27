const TestSuiteExecutor = require('../TestExecutor/TestSuiteExecutor')

/**
 * @implements {HaveTestExecutor}
 */
class TestSuite {
  constructor() {
    /**
     *
     * @params {Array<TestCase>}
     * @private
     */
    this.__test = []
  }

  /**
   * @static
   * @constructor
   * @param {TestCase} test
   * @return {TestSuite}
   */
  static withTestCase(test) {
    return new this().addTestCase(test)
  }

  /**
   * @static
   * @param {TestSuite} testSuite
   * @param {TestRun} runner
   * @return {TestExecutable}
   */
  static executor(testSuite, runner) {
    return new TestSuiteExecutor(testSuite, runner)
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
