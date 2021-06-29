const TestReport = require('./TestReport')
const TestCaseReport = require('./TestCaseReport')
const TestSuiteReport = require('./TestSuiteReport')

class ReportContainer {
  /**
   *
   * @param {TestRunReport} testRunReport
   */
  constructor(testRunReport) {
    /**
     *
     * @params {Array<TestReport>}
     * @private
     */
    this.__testReport = []
    /**
     *
     * @params {Array<TestCaseReport>}
     * @private
     */
    this.__testCaseReport = []
    /**
     *
     * @params {Array<TestSuiteReport>}
     * @private
     */
    this.__testSuiteReport = []
    /**
     *
     * @params {TestRunReport}
     * @private
     */
    this.__testRunReport = testRunReport
  }

  /**
   *
   * @return {TestRunReport}
   */
  get testRunReport() {
    return this.__testRunReport
  }

  /**
   *
   * @param {Report} report
   * @return {ReportContainer}
   */
  addReport(report) {
    switch (report.constructor) {
      case TestReport:
        this.__testReport.push(report)
        break
      case TestCaseReport :
        this.__testCaseReport.push(report)
        break
      case TestSuiteReport:
        this.__testSuiteReport.push(report)
        break
      default:
        throw Error('Report not supported')
    }
    return this
  }

  /**
   *
   * @return {ReportContainer}
   */
  buildTestRunReport() {
    this.__testReport.forEach((v) => {
      this.__updateTest(v)
    })
    this.__testCaseReport.forEach((v) => {
      this.__updateTest(v)
    })
    this.__testSuiteReport.forEach((v) => {
      this
        .__updateTest(v)
        .__updateSuiteCase(v)
    })
    return this
  }

  /**
   *
   * @param {Report} v
   * @return {ReportContainer}
   * @private
   */
  __updateTest(v) {
    this.testRunReport
      .withTestPass(this.testRunReport.testPass + v.testPass)
      .withTestFail(this.testRunReport.testFail + v.testFail)
      .withTestCount(this.testRunReport.testCount + (v.testPass + v.testFail))
    return this
  }

  /**
   *
   * @param {Report} v
   * @return {ReportContainer}
   * @private
   */
  __updateSuiteCase(v) {
    this.testRunReport
      .withTestSuiteCount(this.testRunReport.testSuiteCount + 1)
      .withTestCaseCount(this.testRunReport.testCaseCount + v.testCaseCount)
      .withTestCasePass(this.testRunReport.testCasePass + v.testCasePass)
      .withTestCaseFail(this.testRunReport.testCaseFail + v.testCaseFail)
    if (v.failed()) {
      this.testRunReport
        .withTestSuiteFail(this.testRunReport.testSuiteFail + 1)
    } else {
      this.testRunReport
        .withTestSuitePass(this.testRunReport.testSuitePass + 1)
    }

    return this
  }
}

module.exports = ReportContainer
