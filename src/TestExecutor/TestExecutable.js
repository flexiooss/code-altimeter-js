/**
 * @interface
 */
class TestExecutable {
  /**
   * @return {Report}
   */
  exec() {
    throw Error('should be override')
  }
}

module.exports = TestExecutable
