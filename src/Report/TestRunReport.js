const TestSuiteReport = require('./TestSuiteReport')

/**
 *
 * @implements {Report}
 * @extends {TestSuiteReport}
 */
class TestRunReport extends TestSuiteReport {
  /**
   *
   * @param {string} name
   */
  constructor(name) {
    super(name)
    /**
     *
     * @params {number}
     */
    this.testSuiteCount = 0
    /**
     *
     * @params {number}
     */
    this.testSuiteFail = 0
    /**
     *
     * @params {number}
     */
    this.testSuitePass = 0
  }

  /**
   *
   * @param {number} n
   * @return {TestRunReport}
   */
  withTestSuiteCount(n) {
    this.testSuiteCount = n
    return this
  }

  /**
   *
   * @param {number} n
   * @return {TestRunReport}
   */
  withTestSuitePass(n) {
    this.testSuitePass = n
    return this
  }

  /**
   *
   * @param {number} n
   * @return {TestRunReport}
   */
  withTestSuiteFail(n) {
    this.testSuiteFail = n
    return this
  }

  /**
   * @override
   * @return {TestRunReport}
   */
  logReport() {
    if (this.failed()) {
      if (this.testSuiteCount) {
        console.log(`TestSuite Pass : ${this.testSuitePass} / ${this.testSuiteCount} `)
      }
      if (this.testCaseCount) {
        console.log(`TestCase Pass : ${this.testCasePass} / ${this.testCaseCount} `)
      }
      console.log(`Tests Pass : ${this.testPass} / ${this.testCount} `)

      if (this.testSuiteCount) {
        console.log('\x1b[41m\x1b[30m%s\x1b[0m', ` TestSuite Fail : ${this.testSuiteFail} / ${this.testSuiteCount} `)
      }
      if (this.testCaseCount) {
        console.log('\x1b[41m\x1b[30m%s\x1b[0m', ` TestCase Fail : ${this.testSuiteFail} / ${this.testSuiteCount} `)
      }
      console.log('\x1b[41m\x1b[30m%s\x1b[0m', ` Tests Fail : ${this.testFail} / ${this.testCount} `)
    } else {
      if (this.testSuiteCount) {
        console.log('\x1b[102m\x1b[30m%s\x1b[0m', ` TestSuite Pass : ${this.testSuitePass} / ${this.testSuiteCount}  `)
      }
      if (this.testCaseCount) {
        console.log('\x1b[102m\x1b[30m%s\x1b[0m', ` TestCase Pass : ${this.testCasePass} / ${this.testCaseCount}  `)
      }
      console.log('\x1b[102m\x1b[30m%s\x1b[0m', ` Tests Pass : ${this.testPass} / ${this.testCount} `)
    }
    return this
  }
}

module.exports = TestRunReport
