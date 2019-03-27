const TestReport = require('./TestReport')

/**
 * @implements {Report}
 * @params {TestCaseReport}
 */
class TestCaseReport extends TestReport {
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
    this.testCount = 0
  }

  /**
   *
   * @param {number} n
   * @return {TestCaseReport}
   */
  withTestCount(n) {
    this.testCount = n
    return this
  }

  /**
   * @override
   * @return {TestCaseReport}
   */
  logReport() {
    if (this.failed()) {
      console.log(`Tests Pass : ${this.testPass} / ${this.testCount} `)

      console.log('\x1b[41m\x1b[30m%s\x1b[0m', ` Fail : ${this.testFail} / ${this.testCount} `)
    } else {
      console.log('\x1b[102m\x1b[30m%s\x1b[0m', ` Tests Pass : ${this.testPass} / ${this.testCount} `)
    }
    return this
  }
}

module.exports = TestCaseReport
