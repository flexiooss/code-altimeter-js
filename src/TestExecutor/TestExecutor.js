const TestReport = require('../Report/TestReport')
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
     * @type {string}
     * @private
     */
    this.__testName = testName
    /**
     *
     * @type {TestCase}
     * @private
     */
    this.__testCase = testCase
    /**
     *
     * @type {TestReport}
     * @private
     */
    this.__report = new TestReport(testName)
    /**
     *
     * @type {TestRun}
     * @private
     */
    this.__runner = runner
  }
  /**
   * @return {TestReport}
   */
  exec() {
    if (this.__runner.isVerbose()) {
      console.log(`Test  ${this.__testName}`)
    }
    if (this.__runner.isVerbose()) {
      console.log('\x1b[90m%s\x1b[0m', `------------------------------------
Setup ${this.__testName} 
`)
    }
    this.__testCase.setUp()
    try {
      this.__testCase[this.__testName]()
      if (this.__runner.isVerbose()) {
        console.log('\x1b[92m%s\x1b[0m', `Test pass ${this.__testName}`)
      }
      this.__incrementTestPass()
    } catch (e) {
      console.log('\x1b[31m%s\x1b[0m', `
       
########################################        
###### TEST FAIL      ${this.__testCase.constructor.name}:${this.__testName}
########################################
`)
      console.log(e)
      console.log('\x1b[31m%s\x1b[0m', `
########################################
`)
      this.__incrementTestFail()
    }
    if (this.__runner.isVerbose()) {
      console.log('\x1b[90m%s\x1b[0m', `------------------------------
tearDown ${this.__testName} 
`)
    }
    this.__testCase.tearDown()
    return this.__report
  }

  /**
   *
   * @return {TestExecutor}
   * @private
   */
  __incrementTestPass() {
    this.__report.testPass++
    return this
  }

  /**
   *
   * @return {TestExecutor}
   * @private
   */
  __incrementTestFail() {
    this.__report.testFail++
    return this
  }
}

module.exports = TestExecutor
