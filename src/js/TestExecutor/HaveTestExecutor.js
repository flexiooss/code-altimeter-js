/**
 * @interface
 */
class HaveTestExecutor {
  /**
   * @static
   * @param {HaveTestExecutor} testable
   * @param {TestRun} runner
   * @return {TestExecutable}
   */
  static executor(testable, runner) {
  }
}
module.exports = HaveTestExecutor
