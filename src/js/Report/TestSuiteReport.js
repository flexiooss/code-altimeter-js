const TestError = require('../runner/TestError')
const {TEST_METHOD_PREFIX} = require('../constantes')
const VERBOSE = process.env.TEST_VERBOSE === 1
const TestCaseExecutor = require('../TestExecutor/TestCaseExecutor')
const TestCaseReport = require('./TestCaseReport')

/**
 *
 * @implements {Report}
 * @extends {TestCaseReport}
 * @params {TestSuiteReport}
 */
class TestSuiteReport extends TestCaseReport {
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
    this.testCaseCount = 0
    /**
     *
     * @params {number}
     */
    this.testCaseFail = 0
    /**
     *
     * @params {number}
     */
    this.testCasePass = 0
  }

  /**
   *
   * @param {number} n
   * @return {TestSuiteReport}
   */
  withTestCaseCount(n) {
    this.testCaseCount = n
    return this
  }

  /**
   *
   * @param {number} n
   * @return {TestSuiteReport}
   */
  withTestCasePass(n) {
    this.testCasePass = n
    return this
  }

  /**
   *
   * @param {number} n
   * @return {TestSuiteReport}
   */
  withTestCaseFail(n) {
    this.testCaseFail = n
    return this
  }
  /**
   * @override
   * @return {TestCaseReport}
   */
  logReport() {
    if (this.failed()) {
      console.log(`TestCase Pass : ${this.testCasePass} / ${this.testCaseCount} `)
      console.log(`Tests Pass : ${this.testPass} / ${this.testCount} `)

      console.log('\x1b[41m\x1b[30m%s\x1b[0m', ` TestCase Fail : ${this.testCaseFail} / ${this.testCaseCount} `)
      console.log('\x1b[41m\x1b[30m%s\x1b[0m', ` Tests Fail : ${this.testFail} / ${this.testCount()} `)
    } else {
      console.log('\x1b[102m\x1b[30m%s\x1b[0m', ` TestCase Pass : ${this.testCasePass} / ${this.testCaseCount}  `)
      console.log('\x1b[102m\x1b[30m%s\x1b[0m', ` Tests Pass : ${this.testPass} / ${this.testCount} `)
    }
    return this
  }
}

module.exports = TestSuiteReport
