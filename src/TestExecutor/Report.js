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
    this.__testCaseCount = 0
    /**
     *
     * @type {number}
     */
    this.__testCaseFail = 0
    /**
     *
     * @type {number}
     */
    this.__testCasePass = 0
    /**
     *
     * @type {number}
     */
    this.__testCount = 0
    /**
     *
     * @type {number}
     */
    this.__testFail = 0
    /**
     *
     * @type {number}
     */
    this.__testPass = 0
  }

  /**
   *
   * @param {number}n
   * @return {module.Report}
   */
  withTestCaseCount(n) {
    this.__testCaseCount = n
    return this
  }

  /**
   *
   * @param n
   * @return {module.Report}
   */
  withTestCasePass(n) {
    this.__testCasePass = n
    return this
  }
  /**
   *
   * @param n
   * @return {module.Report}
   */
  withTestSuitFail(n) {
    this.__testCaseFail = n
    return this
  }

  /**
   *
   * @param n
   * @return {module.Report}
   */
  withTestCount(n) {
    this.__testCount = n
    return this
  }

  /**
   *
   * @param n
   * @return {module.Report}
   */
  withTestPass(n) {
    this.__testPass = n
    return this
  }

  /**
   *
   * @param n
   * @return {module.Report}
   */
  withTestFail(n) {
    this.__testFail = n
    return this
  }
  /**
   *
   * @return {boolean}
   * @private
   */
  __hasError() {
    return this.__testFail > 0
  }

  show() {
    console.log(`
------------------------------------------------------
  ############
 #  REPORT  #
############
`)

    if (this.__hasError()) {
      if (this.__testCaseCount > 0) {
        console.log(`TestCase Pass : ${this.__testCasePass} / ${this.__testCaseCount} `)
      }
      console.log(`Tests Pass : ${this.__testPass} / ${this.__testCount} `)

      if (this.__testCaseCount > 0) {
        console.log(`TestCase Fail : ${this.__testCaseFail} / ${this.__testCaseCount} `)
      }
      console.log('\x1b[41m\x1b[30m%s\x1b[0m', ` Fail : ${this.__testFail} / ${this.__testCount()} `)
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
      if (this.__testCaseCount > 0) {
        console.log('\x1b[102m\x1b[30m%s\x1b[0m', ` TestCase Pass : ${this.__testCasePass} / ${this.__testCaseCount} `)
      }
      console.log('\x1b[102m\x1b[30m%s\x1b[0m', ` Tests Pass : ${this.__testPass} / ${this.__testCount} `)
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
