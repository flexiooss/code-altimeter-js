const TestReport = require('../Report/TestReport')
const StaticInvoker = require('./StaticInvoker')

/**
 * @implements {TestExecutable}
 */
class TestExecutor {
  /**
   *
   * @param {TestCase} testCase
   * @param {string} testName
   * @param {TestRun} runner
   */
  constructor(testCase, testName, runner) {
    /**
     *
     * @params {TestCase}
     * @protected
     */
    this._testCase = testCase
    /**
     *
     * @params {string}
     * @private
     */
    this.__testName = testName
    /**
     *
     * @params {TestRun}
     * @private
     */
    this.__runner = runner
    /**
     *
     * @params {TestReport}
     * @protected
     */
    this._report = new TestReport(testName)
  }

  /**
   * @return {TestReport}
   */
  exec() {
    this._execTest()
    return this._report
  }

  /**
   *
   * @return {TestReport}
   * @protected
   */
  _execTest() {
    const testCase = this.__newTestCase()

    if (this.__runner.isVerbose()) {
      console.log(`Test  ${this.__testName}`)
    }

    if (this.__runner.isVerbose()) {
      console.log('\x1b[90m%s\x1b[0m', `------------------------------------
Setup ${this.__testName} 
`)
    }

    testCase.setUp()

    try {
      testCase[this.__testName]()

      this.__logPass(testCase)
      this.__incrementTestPass()
    } catch (e) {
      this.__logError(testCase, e)
      this.__incrementTestFail()
    }

    if (this.__runner.isVerbose()) {
      console.log('\x1b[90m%s\x1b[0m', `------------------------------
tearDown ${this.__testName} 
`)
    }
    testCase.tearDown()
    return this._report
  }

  /**
   *
   * @param {TestCase} testCase
   * @private
   */
  __logPass(testCase) {
    console.log('\x1b[92m%s\x1b[0m', `⛱   PASS ${this.__testName}`)
  }

  /**
   *
   * @param {TestCase} testCase
   * @param {Error} error
   * @private
   */
  __logError(testCase, error) {
    console.log('\x1b[31m%s\x1b[0m', `
       
########################################        
###### ⛑ TEST FAIL      ${testCase.constructor.name}:${this.__testName}
########################################
`)
    console.log(error)
    console.log('\x1b[31m%s\x1b[0m', `
########################################
`)
  }

  /**
   *
   * @return {TestCase}
   * @private
   */
  __newTestCase() {
    return new this._testCase()
  }

  /**
   *
   * @return {TestExecutor}
   * @private
   */
  __incrementTestPass() {
    this._report.testPass++
    return this
  }

  /**
   *
   * @return {TestExecutor}
   * @private
   */
  __incrementTestFail() {
    this._report.testFail++
    return this
  }
}

module.exports = TestExecutor
