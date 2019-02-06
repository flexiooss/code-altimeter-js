# code-altimeter-js
### Naive javascript test library

>Today code-altimeter-js can only be called by [hotballoon-shed](https://github.com/flexiooss/hotballoon-shed) who implements the *transformers* interface

#### Assertion
code-altimeter is detached from any library of assertions

### Project structure
- `__tests__` directory : the tests entries point files are into all ***\_\_tests\_\_/index.js*** files
- Test entry methods must be prefixed with 'test' like : `testMyFeature()`

```
-index.js
-package.json
-src
    |
    -__tests__
    -index.js
    -test1.js
    -test2.js
    -...
```

### Simple example
> index.js file
```javascript
import {TestCase} from 'code-altimeter-js'
const assert = require('assert')

class MyTest extends TestCase {

  testWhoFail() {
    assert(false, "Oups it's broken")
  }

}

TestRun(MyTest)
```


### Installation tips
> package.json file
```json
{
"scripts": {
    "hotballoon-shed": "node ./node_modules/hotballoon-shed",
    "test": "yarn hotballoon-shed --test"
  }
}
```

for usage :
```bash
yarn test
yarn test -v
```

### Advanced example
> index.js file
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
### Use executable import
> index.js file
```javascript
import './MyTest'
```

> MyTest.js
```javascript
import {TestCase} from 'code-altimeter-js'
const assert = require('assert')

class MyTest extends TestCase {

  testHappy() {
    assert(true, "Oups I did'nt break again")
  }

}

export {MyTest}
```
