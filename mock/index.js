var app = require('express')()
var request = require('request')
var glob = require('glob')
var path = require('path')
var config = require('./config')
var random = require('./random')

// CORS
app.all('*', function(req, res, next) {
  let requestOrigin = req.get('Origin')

  if (!requestOrigin) return next()

  if (req.method === 'OPTIONS') {
    let allowHeaders = req.get('Access-Control-Request-Headers')

    if (allowHeaders) {
      res.header("Access-Control-Allow-Headers", allowHeaders)
    }

    res.header("Access-Control-Allow-Origin", requestOrigin)
    // res.header("Access-Control-Max-Age", 1728000)
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    res.header("Access-Control-Allow-Credentials", true)

    res.send(204)
  } else {
    res.header("Access-Control-Allow-Origin", requestOrigin)
    res.header("Access-Control-Allow-Credentials", true)

    next()
  }
});

glob.sync(path.join(__dirname, './modules/*.js')).forEach(file => {
  const moduleObj = require(file)

  Object.keys(moduleObj).forEach(url => {
    let obj = moduleObj[url]
    let method = (obj.method || 'POST').toLowerCase()

    app[method](url, function(req, res, next) {
      if (obj.mock === false) return next()

      let data = random(JSON.parse(JSON.stringify(obj.data)))

      if (obj.delay > 0) {
        setTimeout(function() {
          res.send(data)
        }, obj.delay * 1e3)
      } else {
        res.send(data)
      }
    })
  })
})

// 匹配失败, 进行接口转发
app.use(function(req, res, next) {
  var method = req.method.toLowerCase()
  var url = config.originHost + req.originalUrl

  req.pipe(request(url)).pipe(res)
})

app.listen(config.port)