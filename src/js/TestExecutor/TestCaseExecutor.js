const {TEST_METHOD_PREFIX, ASYNC_TEST_METHOD_PREFIX} = require('../constantes')
const TestCaseReport = require('../Report/TestCaseReport')
const TestExecutor = require('./TestExecutor')
const AsyncTestExecutor = require('./AsyncTestExecutor')
const StaticInvoker = require('./StaticInvoker')

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
     * @params {TestCase}
     * @private
     */
    this.__testCase = testCase
    /**
     *
     * @params {Array<string>}
     * @private
     */
    this.__testsList = []
    /**
     *
     * @params {Array<string>}
     * @private
     */
    this.__asyncTestsList = []
    /**
     *
     * @params {TestCaseReport}
     * @private
     */
    this.__report = new TestCaseReport(this.__testCase.name)
    /**
     *
     * @params {TestRun}
     * @private
     */
    this.__runner = runner
    /**
     * @params {StaticInvoker}
     * @private
     */
    this.__staticInvoker = new StaticInvoker(this.__testCase, this.__runner)
  }

  /**
   * @return {Promise<unknown>}
   */
  async exec() {
    this.__staticInvoker.invokeBeforeClass()

    await this.__updateTestsList()
      .__updateTestCount(this.__testsList.length)
      .__runTests()

    this.__staticInvoker.invokeAfterClass()

    return this.__report
  }

  /**
   * @return {Promise<Report[][]>}
   * @private
   */
  async __runTests() {

    for (const test of this.__testsList) {
      const report = await new TestExecutor(this.__testCase, test, this.__runner).exec()
      this.__updateReport(report)
    }

    for (const test of this.__asyncTestsList) {
      const report = await new AsyncTestExecutor(this.__testCase, test, this.__runner).exec()
      this.__updateReport(report)
    }

    return this
  }

  /**
   * @return {TestCaseExecutor}
   * @private
   */
  __updateTestsList() {
    this.__testsList
      .push(...this.__getInstanceMethodNames(new this.__testCase())
        .filter((v) => {
          return v.startsWith(TEST_METHOD_PREFIX)
        }))

    this.__asyncTestsList
      .push(...this.__getInstanceMethodNames(new this.__testCase())
        .filter((v) => {
          return v.startsWith(ASYNC_TEST_METHOD_PREFIX)
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
   * @param {Report} testReport
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
