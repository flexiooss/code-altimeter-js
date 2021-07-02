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

  static beforeClass() {
  }

  static afterClass() {
  }

  setUp() {
  }

  tearDown() {
  }

  /**
   * @param {*} v
   */
  log(v) {
    if (this.debug) {
      const prefix = `${new Date().toJSON()} [DEBUG]:  `
      if (typeof v === 'undefined') {
        console.log(`${prefix}[undefined]`)
      } else {
        console.log(`${prefix}${((v && typeof v === 'object') ? `[${v.constructor.name}${((Array.isArray(v) || v instanceof Array) ? `:${v.length}` : '')}]` : '')}${JSON.stringify(v, null, 2)}`)
      }
    }
  }
}

module.exports = TestCase
