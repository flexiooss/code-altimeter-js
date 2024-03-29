const TestCaseExecutor = require('./TestCaseExecutor')
const TestSuiteReport = require('../Report/TestSuiteReport')

/**
 * @implements TestExecutable
 */
class TestSuiteExecutor {
  /**
   *
   * @param {TestSuite} testSuite
   * @param {TestRun} runner
   */
  constructor(testSuite, runner) {
    /**
     *
     * @params {TestSuite}
     * @private
     */
    this.__testSuite = testSuite

    /**
     *
     * @params {TestSuiteReport}
     * @private
     */
    this.__report = new TestSuiteReport(this.__testSuite.constructor.name)
    /**
     *
     * @params {TestRun}
     * @private
     */
    this.__runner = runner
  }

  /**
   * @return {Promise<Report>}
   */
  async exec() {
    await this
      .__startTestSuite()
      .__updateTestCaseCount()
      .__runAllTestCase()

    this.__finishTestSuite()
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
  async __runAllTestCase() {
    for (const test of   this.__testSuite.testCases ){

      const report = await new TestCaseExecutor(test, this.__runner).exec()
      const testCasePass = report.testFail === 0
      this.__report = this.__report
        .withTestCaseCount(this.__report.testCaseCount + 1)
        .withTestCasePass(this.__report.testCaseFail + (testCasePass ? 1 : 0))
        .withTestCaseFail(this.__report.testCaseFail + (testCasePass ? 0 : 1))
        .withTestCount(this.__report.testCount + report.testCount)
        .withTestFail(this.__report.testFail + report.testFail)
        .withTestPass(this.__report.testPass + report.testPass)
    }

    return this
  }

  /**
   *
   * @return {TestSuiteExecutor}
   * @private
   */
  __startTestSuite() {
    if (this.__runner.isVerbose()) {
      console.log('\x1b[46m%s\x1b[0m', ` Start ${this.__testSuite.constructor.name} `)
    }
    return this
  }

  /**
   *
   * @return {TestSuiteExecutor}
   * @private
   */
  __finishTestSuite() {
    if (this.__runner.isVerbose()) {
      console.log('\x1b[46m%s\x1b[0m', ` Finish ${this.__testSuite.constructor.name} `)
    }
    return this
  }
}

module.exports = TestSuiteExecutor
