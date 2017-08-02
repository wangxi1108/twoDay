require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
//-----------自己数据启服务-----------

app.get("/api/Biglist",function(req,res){
  res.json(
      [
  {
         "title":"家居",
          "lei":["生活电器","个护健康","热门电器" ],
          "url":[
            "/static/img1/1499476874118_2.jpg",
            "/static/img1/1499476874118_2.jpg",
            "/static/img1/1499476874118_2.jpg",
            "/static/img1/1499476874118_2.jpg",
            "/static/img1/1499476874118_2.jpg",
            "/static/img1/1499476874118_2.jpg",
            "/static/img1/1499476874118_2.jpg",
            "/static/img1/1499476874118_2.jpg"
          ]
    },
    {
         "title":"珠宝首饰",
          "lei":["黄金首饰","钟表","眼镜" ],
          "url":[
            "/static/img1/1499400139048_2.jpg",
            "/static/img1/1499400139048_2.jpg",
            "/static/img1/1499400139048_2.jpg",
            "/static/img1/1499400139048_2.jpg",
            "/static/img1/1499400139048_2.jpg",
            "/static/img1/1499400139048_2.jpg",
            "/static/img1/1499400139048_2.jpg",
            "/static/img1/1499400139048_2.jpg"
          ]
    },
    {
         "title":"鞋子箱包",
          "lei":["男鞋","帽子","包子" ],
          "url":[
            "/static/img1/1496824061627_2.png",
            "/static/img1/1496824061627_2.png",
            "/static/img1/1496824061627_2.png",
            "/static/img1/1496824061627_2.png",
            "/static/img1/1500963177814_2.jpg",
            "/static/img1/1500963177814_2.jpg",
            "/static/img1/1500963177814_2.jpg",
            "/static/img1/1500963177814_2.jpg"
          ]
    },
    {
         "title":"鞋子箱包",
          "lei":["男鞋","帽子","包子" ],
          "url":[
            "/static/img1/1500963177814_2.jpg",
            "/static/img1/1500963177814_2.jpg",
            "/static/img1/1500963177814_2.jpg",
            "/static/img1/1500963177814_2.jpg",
            "/static/img1/1496824061627_2.png",
            "/static/img1/1496824061627_2.png",
            "/static/img1/1499070052533_2.jpg",
            "/static/img1/1499070052533_2.jpg"
          ]
    },
    {
         "title":"鞋子箱包",
          "lei":["男鞋","帽子","包子" ],
          "url":[
            "/static/img1/1499070052533_2.jpg",
            "/static/img1/1499070052533_2.jpg",
            "/static/img1/1499070052533_2.jpg",
            "/static/img1/1499070052533_2.jpg",
            "/static/img1/1496824061627_2.png",
            "/static/img1/1496824061627_2.png",
            "/static/img1/1496824061627_2.png",
            "/static/img1/1496824061627_2.png"
          ]
    },
    {
         "title":"户外运动",
          "lei":["男鞋","帽子","包子" ],
          "url":[
            "/static/img1/1494644521219_2.jpg",
            "/static/img1/1494644521219_2.jpg",
            "/static/img1/1494644521219_2.jpg",
            "/static/img1/1494644521219_2.jpg",
            "/static/img1/1494644521219_2.jpg",
            "/static/img1/1494644521219_2.jpg",
            "/static/img1/1494644521219_2.jpg",
            "/static/img1/1494644521219_2.jpg"
          ]
    }

]
    )
});


app.get("/api/next",function(req,res){
  res.json(
      [
  {"img":"/static/img1/1498014272450_2.jpg","name":"鱼缸"},
  {"img":"/static/img1/1498014272450_2.jpg","name":"鱼缸"},
  {"img":"/static/img1/1500451410111_2.jpg","name":"凉席"},
  {"img":"/static/img1/1500451410111_2.jpg","name":"凉席"}


  
]
    )
})








//----------完毕-------------------------

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {},
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
