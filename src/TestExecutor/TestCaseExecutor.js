const {TEST_METHOD_PREFIX} = require('../constantes')
const TestCaseReport = require('../Report/TestCaseReport')
const TestExecutor = require('./TestExecutor')

/**
 * @implements TestExecutable
 */
class TestCaseExecutor {
  /**
   *
   * @param {TestCase} testCase
   * @param {TestRun} runner
   */
  constructor(testCase, runner) {
    /**
     *
     * @type {TestCase}
     * @private
     */
    this.__testCase = testCase
    /**
     *
     * @type {Array<string>}
     * @private
     */
    this.__testsList = []
    /**
     *
     * @type {TestCaseReport}
     * @private
     */
    this.__report = new TestCaseReport(this.__testCase.constructor.name)
    /**
     *
     * @type {TestRun}
     * @private
     */
    this.__runner = runner
  }

  /**
   *
   * @return {TestCaseReport}
   */
  exec() {
    this.__invokeBeforeClass()
      .__updateTestsList()
      .__updateTestCount(this.__testsList.length)
      .__runTests()
      .__invokeAfterClass()
    return this.__report
  }

  /**
   *
   * @return {TestCaseExecutor}
   * @private
   */
  __invokeBeforeClass() {
    this.__testCase.constructor.beforeClass()
    if (this.__runner.isVerbose()) {
      console.log('\x1b[36m%s\x1b[0m', `
    
------------------------------------------------------
Start test case ${this.__testCase.constructor.name} `)
    }
    return this
  }

  /**
   *
   * @return {TestCaseExecutor}
   * @private
   */
  __runTests() {
    /**
     * @type {Array<string>} tests
     */
    this.__testsList.forEach((v) => {
      this.__updateReport(new TestExecutor(
        this.__testCase, v, this.__runner)
        .exec()
      )
    })
    return this
  }

  /**
   *
   * @return {TestCaseExecutor}
   * @private
   */
  __updateTestsList() {
    this.__testsList.push(...this.__getInstanceMethodNames(this.__testCase)
      .filter((v) => {
        return v.startsWith(TEST_METHOD_PREFIX)
      }))
    return this
  }

  /**
   *
   * @param {number} n
   * @return {TestCaseExecutor}
   * @private
   */
  __updateTestCount(n) {
    this.__report.withTestCount(n)
    return this
  }

  /**
   *
   * @param {TestReport} testReport
   * @return {TestCaseExecutor}
   * @private
   */
  __updateReport(testReport) {
    this.__report
      .withTestFail(this.__report.testFail + testReport.testFail)
      .withTestPass(this.__report.testPass + testReport.testPass)
    return this
  }

  /**
   *
   * @param {TestCase} obj
   * @return {Array<string>}
   * @private
   */
  __getInstanceMethodNames(obj) {
    let array = []
    let proto = Object.getPrototypeOf(obj)
    while (proto) {
      Object.getOwnPropertyNames(proto)
        .forEach(name => {
          if (name !== 'constructor') {
            if (this.__hasMethod(proto, name)) {
              array.push(name)
            }
          }
        })
      proto = Object.getPrototypeOf(proto)
    }
    return array
  }

  /**
   *
   * @param {Object} obj
   * @param {string} name
   * @return {boolean}
   * @private
   */
  __hasMethod(obj, name) {
    const desc = Object.getOwnPropertyDescriptor(obj, name)
    return !!desc && typeof desc.value === 'function'
  }


}

module.exports = TestCaseExecutor
