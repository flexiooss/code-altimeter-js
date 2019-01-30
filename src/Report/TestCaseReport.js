const TestError = require('../TestError')
const {TEST_METHOD_PREFIX} = require('../constantes')
const VERBOSE = process.env.TEST_VERBOSE === 1
const TestCaseExecutor = require('../TestExecutor/TestCaseExecutor')
const Report = require('./Report')

/**
 * @implements {Report}
 * @type {TestCaseReport}
 */
class TestCaseReport extends Report {
  constructor() {
    super()
    /**
     *
     * @type {number}
     */
    this.testCount = 0
    /**
     *
     * @type {number}
     */
    this.testFail = 0
    /**
     *
     * @type {number}
     */
    this.testPass = 0
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
   *
   * @param {number} n
   * @return {TestCaseReport}
   */
  withTestPass(n) {
    this.testPass = n
    return this
  }

  /**
   *
   * @param {number} n
   * @return {TestCaseReport}
   */
  withTestFail(n) {
    this.testFail = n
    return this
  }

  /**
   * @override
   * @return {TestCaseReport}
   */
  logReport() {
    if (this.failed()) {
      console.log(`Tests Pass : ${this.testPass} / ${this.testCount} `)

      console.log('\x1b[41m\x1b[30m%s\x1b[0m', ` Fail : ${this.testFail} / ${this.testCount()} `)
    } else {
      console.log('\x1b[102m\x1b[30m%s\x1b[0m', ` Tests Pass : ${this.testPass} / ${this.testCount} `)
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

module.exports = TestCaseReport
