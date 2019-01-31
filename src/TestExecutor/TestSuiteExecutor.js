const TestError = require('../runner/TestError')
const {TEST_METHOD_PREFIX} = require('../constantes')
const TestCaseExecutor = require('./TestCaseExecutor')
const TestSuiteReport = require('../Report/TestSuiteReport')
const TestExecutor = require('./TestExecutor')
const Reporter = require('../Report/Reporter')
const VERBOSE = process.env.TEST_VERBOSE === 1

/**
 * @implements TestExecutor
 * @extends TestExecutor
 */
class TestSuiteExecutor extends TestExecutor {
  /**
   *
   * @param {TestSuite} testSuite
   */
  constructor(testSuite) {
    super()
    /**
     *
     * @type {TestSuite}
     * @private
     */
    this.__testSuite = testSuite

    /**
     *
     * @type {TestSuiteReport}
     * @private
     */
    this.__report = new TestSuiteReport()
  }

  /**
   *
   * @return {TestSuiteReport}
   */
  exec() {
    this
      .__startTestSuite()
      .__updateTestCaseCount()
      .__runAllTestCase()
      .__finishTestSuite()
    new Reporter(this.__report).show().throw()
    return this.__report
  }

  /**
   *
   * @return {TestSuiteExecutor}
   * @private
   */
  __updateTestCaseCount() {
    this.__report.testSuiteCount = this.__testSuite.countOfTestCase()
    return this
  }

  /**
   *
   * @return {TestSuiteExecutor}
   * @private
   */
  __runAllTestCase() {
    this.__testSuite.testCases.forEach((test) => {
      const report = new TestCaseExecutor(test).exec()
      const testCasePass = report.testFail === 0
      this.__report = this.__report
        .withTestCaseCount(this.__report.testCaseCount + 1)
        .withTestCasePass(this.__report.testCaseFail + (testCasePass ? 1 : 0))
        .withTestCaseFail(this.__report.testCaseFail + (testCasePass ? 0 : 1))
        .withTestCount(this.__report.testCount + report.testCount)
        .withTestFail(this.__report.testFail + report.testFail)
        .withTestPass(this.__report.testPass + report.testPass)
    })
    return this
  }

  /**
   *
   * @return {TestSuiteExecutor}
   * @private
   */
  __startTestSuite() {
    if (VERBOSE) {
      console.log('\x1b[46m%s\x1b[0m', ` Start ${this.__testSuite.constructor.name} `)
    }
    return this
  }

  /**
   *
   * @return {TestExecutor}
   * @private
   */
  __finishTestSuite() {
    if (VERBOSE) {
      console.log('\x1b[46m%s\x1b[0m', ` Finish ${this.__testSuite.constructor.name} `)
    }
    return this
  }
}

module.exports = TestSuiteExecutor
