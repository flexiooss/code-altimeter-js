const {TEST_METHOD_PREFIX} = require('../constantes')
const VERBOSE = process.env.TEST_VERBOSE === 1
const TestCaseReport = require('../Report/TestCaseReport')
const TestExecutor = require('./TestExecutor')

/**
 * @implements TestExecutor
 * @extends TestExecutor
 */
class TestCaseExecutor extends TestExecutor {
  /**
   *
   * @param {TestCase} test
   */
  constructor(test) {
    super()
    /**
     *
     * @type {TestCase}
     * @private
     */
    this.__test = test
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
    this.__report = new TestCaseReport()
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
    this.__test.constructor.beforeClass()
    if (VERBOSE) {
      console.log('\x1b[36m%s\x1b[0m', `
    
------------------------------------------------------
Start test case ${this.__test.constructor.name} `)
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
      this.__test.setUp()
      if (VERBOSE) {
        console.log(`Test  ${v}`)
      }
      try {
        this.__test[v]()
        if (VERBOSE) {
          console.log('\x1b[92m%s\x1b[0m', `Test pass ${v}`)
        }
        this.__incrementTestPass()
      } catch (e) {
        console.log('\x1b[31m%s\x1b[0m', `
       
########################################        
###### TEST FAIL      ${this.__test.constructor.name}:${v}
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
      this.__test.tearDown()
    })
    return this
  }

  /**
   *
   * @return {TestCaseExecutor}
   * @private
   */
  __updateTestsList() {
    this.__testsList.push(...this.__getInstanceMethodNames(this.__test)
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
    this.__test.constructor.afterClass()
    if (VERBOSE) {
      console.log('\x1b[36m%s\x1b[0m', `------------------------------------------------------
Finish test case ${this.__test.constructor.name} 
`)
    }
    return this
  }
}

module.exports = TestCaseExecutor
