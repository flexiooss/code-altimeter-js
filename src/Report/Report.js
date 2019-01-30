/**
 * @interface
 * @type {Report}
 */
class Report {
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
