/**
 * @interface
 * @params {Report}
 */
class Report {
  /**
   *
   * @return {string}
   */
  get name() {
    throw Error('should be override')
  }

  /**
   * @return {Report}
   */
  logReport() {
    throw Error('should be override')
  }

  /**
   * @return {boolean}
   */
  failed() {
    throw Error('should be override')
  }
}

module.exports = Report
