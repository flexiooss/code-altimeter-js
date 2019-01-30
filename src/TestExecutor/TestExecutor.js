/**
 * @interface
 */
class TestExecutor {
  /**
   * @return {Report}
   */
  exec() {
    throw Error('should be override')
  }
}

module.exports = TestExecutor
