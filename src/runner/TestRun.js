const Reporter = require('../Report/Reporter')
const TestExecutorBuilder = require('../TestExecutor/TestExecutorBuilder')
const TestRunReport = require('../Report/TestRunReport')
const ReportContainer = require('../Report/ReportContainer')

class TestRun {
  /**
   *
   * @param {ReportContainer} reportContainer
   */
  constructor(reportContainer) {
    /**
     *
     * @type {Array<HaveTestExecutor>}
     * @private
     */
    this.__testable = []
    /**
     *
     * @type {ReportContainer}
     * @private
     */
    this.__reportContainer = reportContainer
    /**
     *
     * @type {boolean}
     * @private
     */
    this.__verbose = false
    /**
     *
     * @type {Reporter}
     * @private
     */
    this.__reporter = new Reporter(this.__reportContainer.testRunReport)
  }

  /**
   *
   * @param {HaveTestExecutor} test
   * @return {TestRun}
   */
  addTest(test) {
    this.__testable.push(test)
    return this
  }

  welcome() {
    console.log(`
###########################################################################
###########################################################################

               _              _ _   _                _            
              | |            | | | (_)              | |           
  ___ ___   __| | ___    __ _| | |_ _ _ __ ___   ___| |_ ___ _ __ 
 / __/ _ \\ / _\` |/ _ \\  / _\` | | __| | '_ \` _ \\ / _ \\ __/ _ \\ '__|
| (_| (_) | (_| |  __/ | (_| | | |_| | | | | | |  __/ ||  __/ |   
 \\___\\___/ \\__,_|\\___|  \\__,_|_|\\__|_|_| |_| |_|\\___|\\__\\___|_|   
                                                                  
  by Flexio
###########################################################################
`)
  }

  /**
   *
   * @return {TestRun}
   */
  start() {
    this.__testable.forEach((test) => {
      /**
       *
       * @type {Report}
       */
      const report = TestExecutorBuilder.build(test)
        .exec()
    })
    return this
  }

  /**
   *
   * @param {Report} report
   * @private
   * @return {TestRun}
   */
  __addReport(report) {
    this.__reportContainer.addReport(report)
    return this
  }

  /**
   *
   * @param {boolean} v
   * @return {TestRun}
   */
  withVerbose(v) {
    this.__verbose = v
    return this
  }

  /**
   *
   * @param {ReportContainer} reportContainer
   * @return {TestRun}
   */
  withReportContainer(reportContainer) {
    this.__reportContainer = reportContainer
    return this
  }

  /**
   *
   * @return {?Reporter}
   */
  get reportContainer() {
    return this.__reportContainer
  }

  /**
   *
   * @return {TestRun}
   */
  showReport() {
    this
      .__reporter
      .show()
    return this
  }

  /**
   * @throws {TestError}
   * @return {TestRun}
   */
  throw() {
    this
      .__reporter
      .throw()
    return this
  }
}

const instance = new TestRun(
  new ReportContainer(
    new TestRunReport(
      new Date().toString()
    )
  )
)

// Object.freeze(instance)

module.exports = instance
