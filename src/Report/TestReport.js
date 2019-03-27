/**
 * @implements {Report}
 * @params {TestReport}
 */
class TestReport {
  /**
   *
   * @param {string} name
   */
  constructor(name) {
    /**
     *
     * @params {string}
     * @private
     */
    this.__name = name

    /**
     *
     * @params {number}
     */
    this.testFail = 0
    /**
     *
     * @params {number}
     */
    this.testPass = 0
  }

  /**
   *
   * @return {string}
   */
  get name() {
    return this.__name
  }

  /**
   *
   * @param {number} n
   * @return {TestReport}
   */
  withTestPass(n) {
    this.testPass = n
    return this
  }

  /**
   *
   * @param {number} n
   * @return {TestReport}
   */
  withTestFail(n) {
    this.testFail = n
    return this
  }

  /**
   * @override
   * @return {TestReport}
   */
  logReport() {
    if (this.failed()) {
      console.log('\x1b[41m\x1b[30m%s\x1b[0m', ` Test Fail `)
    } else {
      console.log('\x1b[102m\x1b[30m%s\x1b[0m', ` Tests Pass `)
    }
    return this
  }

  /**
   *
   * @return {boolean}
   */
  failed() {
    return this.testFail > 0
  }
}

module.exports = TestReport
