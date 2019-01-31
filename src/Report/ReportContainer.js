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
     * @type {Array<TestReport>}
     * @private
     */
    this.__testReport = []
    /**
     *
     * @type {Array<TestCaseReport>}
     * @private
     */
    this.__testCaseReport = []
    /**
     *
     * @type {Array<TestSuiteReport>}
     * @private
     */
    this.__testSuiteReport = []
    /**
     *
     * @type {TestRunReport}
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
        this.__testCaseReport.push(test)
        break
      case TestSuiteReport:
        this.__testSuiteReport.push(test)
        break
      default:
        throw Error('Report not supported')
    }
    return this
  }
}

module.exports = ReportContainer
