const fs = require('fs')
const path = require('path')

/**
 *
 * @param dir
 * @param {fileWalker~doneCallback} done
 */
function fileWalker(dir, done) {
  let results = []

  fs.readdir(dir, function(err, list) {
    if (err) return done(err)

    var pending = list.length

    if (!pending) return done(null, results)

    list.forEach(function(file) {
      file = path.resolve(dir, file)

      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          results.push(file)

          fileWalker(file, function(err, res) {
            results = results.concat(res)
            if (!--pending) done(null, results)
          })
        } else {
          results.push(file)

          if (!--pending) done(null, results)
        }
      })
    })
  })
}

const regexpEntryFile = new RegExp('.*\.test\.js$')
const regexpDirTest = new RegExp('.*/__tests__/.*')
const regexpNodesModules = new RegExp('.*/node_modules/.*')
/**
 *
 * @callback fileWalker~doneCallback
 * @param {Error} err
 * @param {Array<string>} data
 */

/**
 *
 * @param {string} path
 * @param {testsPathCallback} clb
 */
module.exports = function(path, clb) {
  fileWalker(path, function(err, data) {
    if (err) {
      throw err
    }

    const ret = (data.filter((v) => {
      return !regexpNodesModules.test(v) && regexpEntryFile.test(v)
    }))
    clb(ret)
  }
  )
}
/**
 *
 * @callback testsPathCallback
 * @param {Array<string>} data
 */
