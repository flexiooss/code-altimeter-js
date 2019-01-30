module.exports = (() => {
  if (typeof window === 'undefined') {
    global.window = {}
    window.__ASSERT__ = true
    window.__DEBUG__ = true
    window.__DEVELOPMENT__ = true
  }
})()
