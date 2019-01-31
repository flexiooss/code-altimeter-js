const {TEST_METHOD_PREFIX} = require('../constantes')
const VERBOSE = process.env.TEST_VERBOSE === 1
const TestCaseReport = require('../Report/TestCaseReport')
const TestExecutor = require('./TestExecutor')

/**
 * @implements TestExecutable
 */
class TestCaseExecutor {
  /**
   *
   * @param {TestCase} testCase
   */
  constructor(testCase) {
    /**
     *
     * @type {TestCase}
     * @private
     */
    this.__testCase = testCase
    /**
     *
     * @type {Array<string>}
     * @private
     */
    this.__testsList = []
    /**
     *
     * @type {TestCaseReport}
     * @private
     */
    this.__report = new TestCaseReport(this.__testCase.constructor.name)
  }

  /**
   *
   * @return {TestCaseReport}
   */
  exec() {
    this.__invokeBeforeClass()
      .__updateTestsList()
      .__updateTestCount(this.__testsList.length)
      .__runTests()
      .__invokeAfterClass()
    return this.__report
  }

  /**
   *
   * @return {TestCaseExecutor}
   * @private
   */
  __invokeBeforeClass() {
    this.__testCase.constructor.beforeClass()
    if (VERBOSE) {
      console.log('\x1b[36m%s\x1b[0m', `
    
------------------------------------------------------
Start test case ${this.__testCase.constructor.name} `)
    }
    return this
  }

  /**
   *
   * @return {TestCaseExecutor}
   * @private
   */
  __runTests() {
    /**
     * @type {Array<string>} tests
     */
    this.__testsList.forEach((v) => {
      if (VERBOSE) {
        console.log('\x1b[90m%s\x1b[0m', `------------------------------------
Setup ${v} 
`)
      }
      this.__testCase.setUp()
      if (VERBOSE) {
        console.log(`Test  ${v}`)
      }
      try {
        this.__testCase[v]()
        if (VERBOSE) {
          console.log('\x1b[92m%s\x1b[0m', `Test pass ${v}`)
        }
        this.__incrementTestPass()
      } catch (e) {
        console.log('\x1b[31m%s\x1b[0m', `
       
########################################        
###### TEST FAIL      ${this.__testCase.constructor.name}:${v}
########################################
`)
        console.log(e)
        console.log('\x1b[31m%s\x1b[0m', `
########################################
`)
        this.__incrementTestFail()
      }
      if (VERBOSE) {
        console.log('\x1b[90m%s\x1b[0m', `------------------------------
tearDown ${v} 
`)
      }
      this.__testCase.tearDown()
    })
    return this
  }

  /**
   *
   * @return {TestCaseExecutor}
   * @private
   */
  __updateTestsList() {
    this.__testsList.push(...this.__getInstanceMethodNames(this.__testCase)
      .filter((v) => {
        return v.startsWith(TEST_METHOD_PREFIX)
      }))
    return this
  }

  /**
   *
   * @param {number} n
   * @return {TestCaseExecutor}
   * @private
   */
  __updateTestCount(n) {
    this.__report.withTestCount(n)
    return this
  }

  /**
   *
   * @return {TestCaseExecutor}
   * @private
   */
  __incrementTestPass() {
    this.__report.testPass++
    return this
  }

  /**
   *
   * @return {TestCaseExecutor}
   * @private
   */
  __incrementTestFail() {
    this.__report.testFail++
    return this
  }

  /**
   *
   * @param {TestCase} obj
   * @return {Array<string>}
   * @private
   */
  __getInstanceMethodNames(obj) {
    let array = []
    let proto = Object.getPrototypeOf(obj)
    while (proto) {
      Object.getOwnPropertyNames(proto)
        .forEach(name => {
          if (name !== 'constructor') {
            if (this.__hasMethod(proto, name)) {
              array.push(name)
            }
          }
        })
      proto = Object.getPrototypeOf(proto)
    }
    return array
  }

  /**
   *
   * @param {Object} obj
   * @param {string} name
   * @return {boolean}
   * @private
   */
  __hasMethod(obj, name) {
    const desc = Object.getOwnPropertyDescriptor(obj, name)
    return !!desc && typeof desc.value === 'function'
  }

  /**
   *
   * @return {TestCaseExecutor}
   * @private
   */
  __invokeAfterClass() {
    this.__testCase.constructor.afterClass()
    if (VERBOSE) {
      console.log('\x1b[36m%s\x1b[0m', `------------------------------------------------------
Finish test case ${this.__testCase.constructor.name} 
`)
    }
    return this
  }
}

module.exports = TestCaseExecutor
