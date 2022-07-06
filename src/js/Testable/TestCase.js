const TestCaseExecutor = require('../TestExecutor/TestCaseExecutor')

/**
 * @implements {HaveTestExecutor}
 * @abstract
 */
class TestCase {
  /**
   * @type {boolean}
   */
  debug = false
  /**
   * @static
   * @param {TestCase} testCase
   * @param {TestRun} runner
   * @return {TestExecutable}
   */
  static executor(testCase, runner) {
    return new TestCaseExecutor(testCase, runner)
  }
  /**
   * @desc called once before TestCase
   * @return {void}
   * @abstract
   */
  static beforeClass() {
  }
  /**
   * @desc called once after TestCase
   * @return {void}
   * @abstract
   */
  static afterClass() {
  }

  /**
   * @desc called before all tests
   * @return {void}
   * @abstract
   */
  setUp() {
  }

  /**
   * @desc called after all tests
   * @return {void}
   * @abstract
   */
  tearDown() {
  }

  /**
   * @param {*} v
   * @param {?string} [message=null]
   */
  log(v, message=null) {
    if (this.debug) {
      const prefix = `${new Date().toJSON()} [DEBUG][${this.constructor.name}] ${message !==null ? message : '' }:  `
      if (typeof v === 'undefined') {
        console.log(`${prefix}[undefined]`)
      } else {
        console.log(`${prefix}${((v && typeof v === 'object') ? `[${v.constructor.name}${((Array.isArray(v) || v instanceof Array) ? `:${v.length}` : '')}]` : '')}${JSON.stringify(v, null, 2)}`)
      }
    }
  }
}

module.exports = TestCase
