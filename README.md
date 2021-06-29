# code-altimeter-js
### Naive javascript test library

>Today code-altimeter-js can only be called by [hotballoon-shed](https://github.com/flexiooss/hotballoon-shed) who implements the *transformers* interface

#### Assertion
code-altimeter is detached from any library of assertions

### Project structure

- Test entry methods must be prefixed with 'test' like : `testMyFeature()`
- Async Test entry methods must be prefixed with 'asyncTest' like : `asyncTestMyFeature()`

### Simple example
> myTest.test.js file
```javascript
import {TestCase} from 'code-altimeter-js'
const assert = require('assert')

class MyTest extends TestCase {

  testWhoFail() {
    assert(false, "Oups it's broken")
  }

  async asyncTestWhoFail2() {
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        reject('Oups it\'s broken too')
      },2000)

    })
  }

}

runTest(MyTest)
```

### Advanced example
> index.test.js file
```javascript
import {TestSuite} from 'code-altimeter-js'
import {MyTest} from './MyTest'
import {MyOtherTest} from './MyOtherTest'

// Run Test Suite
runTest(TestSuite.withTestCase(MyTest)
   .addTestCase( MyOtherTest)
)

// Run Test Case
runTest(MyTest)

// Run Test from Test Case
runTest(MyTest, 'testWhoFail')

```

> MyTest.js
```javascript
import {TestCase} from 'code-altimeter-js'
const assert = require('assert')

class MyTest extends TestCase {

  testWhoFail() {
    assert(false, "Oups it's broken")
  }

  setUp() {
    console.log('Executed before all tests from this TestCase')
  }

  tearDown() {
console.log('Executed after all tests from this TestCase')  }
  
  static beforeClass() {
    console.log('Executed before the first test of this TestCase')
    }
  
  static afterClass() {
    console.log('Executed after the last test of this TestCase')
  }
}

export {MyTest}
```
