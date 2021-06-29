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
     * @params {Class<TestCase>}
     * @protected
     */
    this._testCase = testCase
    /**
     *
     * @params {string}
     * @protected
     */
    this._testName = testName
    /**
     *
     * @params {TestRun}
     * @protected
     */
    this._runner = runner
    /**
     *
     * @params {TestReport}
     * @protected
     */
    this._report = new TestReport(testName)
  }

  /**
   * @return {Promise<Report>}
   */
  async exec() {
    await this._execTest()
    return new Promise(resolve => {
      resolve(this._report)
    })
  }

  /**
   * @return {TestReport}
   * @protected
   */
   async _execTest() {
    const testCase = this._newTestCase()

    if (this._runner.isVerbose()) {
      console.log(`Test  ${this._testName}`)
    }

    if (this._runner.isVerbose()) {
      console.log('\x1b[90m%s\x1b[0m', `------------------------------------
Setup ${this._testName} 
`)
    }

    testCase.setUp()

    try {
      testCase[this._testName].call(testCase)

      this._logPass(testCase)
      this._incrementTestPass()
    } catch (e) {
      this._logError(testCase, e)
      this._incrementTestFail()
    }

    if (this._runner.isVerbose()) {
      console.log('\x1b[90m%s\x1b[0m', `------------------------------
tearDown ${this._testName} 
`)
    }
    testCase.tearDown()
    return this._report
  }

  /**
   * @param {TestCase} testCase
   * @protected
   */
  _logPass(testCase) {
    console.log('\x1b[92m%s\x1b[0m', `⛱   PASS ${this._testName}`)
  }

  /**
   *
   * @param {TestCase} testCase
   * @param {Error} error
   * @protected
   */
  _logError(testCase, error) {
    console.error('\x1b[31m%s\x1b[0m', `
       
########################################        
###### ⛑ TEST FAIL      ${testCase.constructor.name}:${this._testName}
########################################
`)
    console.error(error)
    console.error('\x1b[31m%s\x1b[0m', `
########################################
`)
  }

  /**
   * @return {TestCase}
   * @protected
   */
  _newTestCase() {
    return new this._testCase()
  }

  /**
   * @return {TestExecutor}
   * @protected
   */
  _incrementTestPass() {
    this._report.testPass++
    return this
  }

  /**
   * @return {TestExecutor}
   * @protected
   */
  _incrementTestFail() {
    this._report.testFail++
    return this
  }
}

module.exports = TestExecutor
