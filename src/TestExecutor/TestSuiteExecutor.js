const TestError = require('../TestError')
const {TEST_METHOD_PREFIX} = require('../constantes')
const VERBOSE = process.env.TEST_VERBOSE === 1
const TestCaseExecutor = require('./TestCaseExecutor')

module.exports = class TestSuiteExecutor {
  /**
   *
   * @param {TestSuite} testSuite
   */
  constructor(testSuite) {
    /**
     *
     * @type {TestSuite}
     * @private
     */
    this.__testSuite = testSuite
    /**
     *
     * @type {Array<string>}
     * @private
     */
    this.__testsList = []

    /**
     *
     * @type {number}
     * @private
     */
    this.__testsPass = 0
    /**
     *
     * @type {number}
     * @private
     */
    this.__testsFail = 0
    /**
     *
     * @type {boolean}
     * @private
     */
    this.__error = false
  }

  exec() {
    this.__startTestSuite()

    this.__testSuite.__test.forEach((test) => {
      new TestCaseExecutor(test).exec()
    })
    this.__finishTestSuite()
  }

  /**
   *
   * @return {TestSuiteExecutor}
   * @private
   */
  __startTestSuite() {
    if (VERBOSE) {
      console.log(`
    
##########
################################################
Start ${this.__testSuite.constructor.name} `)
    }
    return this
  }

  /**
   *
   * @return {number}
   * @private
   */
  __testsCount() {
    return this.__testsList.length
  }

  /**
   *
   * @return {TestExecutor}
   * @private
   */
  __incrementTestPass() {
    this.__testsPass++
    return this
  }

  /**
   *
   * @return {TestExecutor}
   * @private
   */
  __incrementTestFail() {
    this.__testsFail++
    return this
  }

  /**
   *
   * @return {TestExecutor}
   * @private
   */
  __finishTestSuite() {

    return this
  }
}
