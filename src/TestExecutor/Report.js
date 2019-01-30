const TestError = require('../TestError')
const {TEST_METHOD_PREFIX} = require('../constantes')
const VERBOSE = process.env.TEST_VERBOSE === 1
const TestCaseExecutor = require('./TestCaseExecutor')

module.exports = class Report {
  constructor() {
    /**
     *
     * @type {number}
     */
    this.testSuiteCount = 0
    /**
     *
     * @type {number}
     */
    this.testSuiteFail = 0
    /**
     *
     * @type {number}
     */
    this.testSuitePass = 0
    /**
     *
     * @type {number}
     */
    this.testCount = 0
    /**
     *
     * @type {number}
     */
    this.testFail = 0
    /**
     *
     * @type {number}
     */
    this.testPass = 0
  }

  /**
   *
   * @param {number}n
   * @return {module.Report}
   */
  withTestSuiteCount(n) {
    this.testSuiteCount = n
    return this
  }

  /**
   *
   * @param n
   * @return {module.Report}
   */
  withTestSuitePass(n) {
    this.testSuitePass = n
    return this
  }
  /**
   *
   * @param n
   * @return {module.Report}
   */
  withTestSuitFail(n) {
    this.testSuiteFail = n
    return this
  }

  /**
   *
   * @param n
   * @return {module.Report}
   */
  withTestCount(n) {
    this.testCount = n
    return this
  }

  /**
   *
   * @param n
   * @return {module.Report}
   */
  withTestPass(n) {
    this.testPass = n
    return this
  }

  /**
   *
   * @param n
   * @return {module.Report}
   */
  withTestFail(n) {
    this.testFail = n
    return this
  }
  /**
   *
   * @return {boolean}
   * @private
   */
  __hasError() {
    return this.testFail > 0
  }

  show() {
    console.log(`
------------------------------------------------------
  ############
 #  REPORT  #
############
`)

    if (this.__hasError()) {
      if (this.testSuiteCount > 0) {
        console.log(`TestSuite Pass : ${this.testSuitePass} / ${this.testSuiteCount} `)
      }
      console.log(`Tests Pass : ${this.testPass} / ${this.testCount} `)

      if (this.testSuiteCount > 0) {
        console.log(`TestSuite Fail : ${this.testSuiteFail} / ${this.testSuiteCount} `)
      }
      console.log('\x1b[41m\x1b[30m%s\x1b[0m', ` Fail : ${this.testFail} / ${this.testCount()} `)
      console.log('\x1b[31m%s\x1b[0m', `88888888888888888888888  TEST FAIL  888888888888888888888888   
888888888888888888888888888888888888888888888888888888888888
888888888888888888888888888888888888888888888888888888888888
8888888888888888888888888P""  ""9888888888888888888888888888
8888888888888888P"88888P          988888"9888888888888888888
8888888888888888  "9888            888P"  888888888888888888
888888888888888888bo "9  d8o  o8b  P" od88888888888888888888
888888888888888888888bob 98"  "8P dod88888888888888888888888
888888888888888888888888    db    88888888888888888888888888
88888888888888888888888888      8888888888888888888888888888
88888888888888888888888P"9bo  odP"98888888888888888888888888
88888888888888888888P" od88888888bo "98888888888888888888888
888888888888888888   d88888888888888b   88888888888888888888
8888888888888888888oo8888888888888888oo888888888888888888888
888888888888888888888888888888888888888888888888888888888888`)
      throw new TestError('TEST FAILED')
    } else {
      if (this.testSuiteCount > 0) {
        console.log('\x1b[102m\x1b[30m%s\x1b[0m', ` TestSuite Pass : ${this.testSuitePass} / ${this.testSuiteCount} `)
      }
      console.log('\x1b[102m\x1b[30m%s\x1b[0m', ` Tests Pass : ${this.testPass} / ${this.testCount} `)
      console.log('\x1b[92m%s\x1b[0m', `
           |
        __| |__ 
      (=========)
      |=========|
      |====_====|
      |== / \\ ==|
      |= / _ \\ =|
   _  |=| ( ) |=|
  /=\\ |=|     |=| /=\\
  |=| |=| --- |=| |=|
  |=| |=|  _  |=| |=|
  |=| |=|  |  |=| |=|
  |=| |=|  |  |=| |=|
  |=| |=|  |  |=| |=|
  |=| |/   |   \\| |=|
  |=|/     |     \\|=|
  |=/    FLEXIO   \\=|
  |(_______________)|
  |=| |_|__|__|_| |=|
  |=|   ( ) ( )   |=|
 /===\\           /===\\
|||||||         |||||||
-------         -------
 (~~~)           (~~~)`)
    }
  }
}
