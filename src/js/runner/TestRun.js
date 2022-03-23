const Reporter = require('../Report/Reporter')
const TestExecutorBuilder = require('../TestExecutor/TestExecutorBuilder')
const TestRunReport = require('../Report/TestRunReport')
const ReportContainer = require('../Report/ReportContainer')

if (typeof window.atob === 'undefined') {
  global.atob = (str) => {
    return Buffer.from(str, 'base64').toString()
  }
}

if (typeof window.btoa === 'undefined') {
  global.btoa = (str) => {
    return Buffer.from(str).toString('base64')
  }
}

class TestRun {
  /**
   * @param {ReportContainer} reportContainer
   */
  constructor(reportContainer) {
    /**
     * @params {Array<{test: HaveTestExecutor,testName: ?string}>}
     * @private
     */
    this.__testable = []
    /**
     * @params {ReportContainer}
     * @private
     */
    this.__reportContainer = reportContainer
    /**
     * @params {boolean}
     * @private
     */
    this.__verbose = false
    /**
     * @params {Reporter}
     * @private
     */
    this.__reporter = new Reporter(this.__reportContainer.testRunReport, this)
  }

  /**
   * @param {HaveTestExecutor} test
   * @param {?string} testName
   * @return {TestRun}
   */
  addTest(test, testName = null) {
    this.__testable.push({test: test, testName: testName})
    return this
  }

  welcome() {
    if (this.isVerbose()) {
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
  }

  /**
   *
   * @return {Promise<TestRun>}
   */
  async run() {
    return new Promise(resolve => {

        Promise.all(this.__testable.map(async(testDescription) => {
          return TestExecutorBuilder
            .build(testDescription, this)
            .exec()
        })).then(values => {
          values.forEach((report) => {
            this.__addReport(report)
          })

          resolve(this)
        })
      }
    )
  }

  /**
   * @param {Report} report
   * @private
   * @return {TestRun}
   */
  __addReport(report) {
    this.__reportContainer.addReport(report)
    return this
  }

  /**
   * @param {boolean} v
   * @return {TestRun}
   */
  withVerbose(v) {
    this.__verbose = v
    return this
  }

  /**
   * @return {boolean}
   */
  isVerbose() {
    return this.__verbose === true
  }

  /**
   * @param {ReportContainer} reportContainer
   * @return {TestRun}
   */
  withReportContainer(reportContainer) {
    this.__reportContainer = reportContainer
    return this
  }

  /**
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
    this.__reportContainer.buildTestRunReport()
    this
      .__reporter
      .show()
    return this
  }

  /**
   * @throws {TestError}
   * @return {TestRun}
   */
  ensureThrow() {
    this
      .__reporter
      .ensureThrow()
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

module.exports = instance
