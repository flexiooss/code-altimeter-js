/**
 * @interface
 */
class TestExecutable {
  /**
   * @return {Promise<Report>}
   */
  async exec() {
    throw Error('should be override')
  }
}

module.exports = TestExecutable
