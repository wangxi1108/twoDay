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
          "xinxi":[
            {"img":"/static/img1/1499476874118_2.jpg","id":"401"},
            {"img":"/static/img1/1499476874118_2.jpg","id":"102"},
            {"img":"/static/img1/1499476874118_2.jpg","id":"103"},
            {"img":"/static/img1/1499476874118_2.jpg","id":"104"},
            {"img":"/static/img1/1499476874118_2.jpg","id":"105"},
            {"img":"/static/img1/1499476874118_2.jpg","id":"106"},
            {"img":"/static/img1/1499476874118_2.jpg","id":"107"},
            {"img":"/static/img1/1499476874118_2.jpg","id":"108"}
          
          ]
    },
    {
         "title":"珠宝首饰",
          "lei":["黄金首饰","钟表","眼镜" ],
          "xinxi":[
            {"img":"/static/img1/1499400139048_2.jpg","id":"201"},
            {"img":"/static/img1/1499400139048_2.jpg","id":"202"},
            {"img":"/static/img1/1499400139048_2.jpg","id":"203"},
            {"img":"/static/img1/1499400139048_2.jpg","id":"204"},
            {"img":"/static/img1/1499400139048_2.jpg","id":"205"},
            {"img":"/static/img1/1499400139048_2.jpg","id":"206"},
            {"img":"/static/img1/1499400139048_2.jpg","id":"207"},
            {"img":"/static/img1/1499400139048_2.jpg","id":"208"}

          ]
    },
    {
         "title":"鞋子箱包",
          "lei":["男鞋","帽子","包子" ],
          "xinxi":[
            {"img":"/static/img1/1496824061627_2.png","id":"301"},
            {"img":"/static/img1/1496824061627_2.png","id":"304"},
            {"img":"/static/img1/1496824061627_2.png","id":"305"},
            {"img":"/static/img1/1496824061627_2.png","id":"306"},
            {"img":"/static/img1/1496824061627_2.png","id":"307"},
            {"img":"/static/img1/1496824061627_2.png","id":"308"},
            {"img":"/static/img1/1496824061627_2.png","id":"302"},
            {"img":"/static/img1/1496824061627_2.png","id":"303"}

          ]
    },
    {
         "title":"鞋子箱包",
          "lei":["男鞋","帽子","包子" ],
          "xinxi":[
            {"img":"/static/img1/1496824061627_2.png","id":"101"},
            {"img":"/static/img1/1496824061627_2.png","id":"101"},
            {"img":"/static/img1/1496824061627_2.png","id":"101"},
            {"img":"/static/img1/1496824061627_2.png","id":"101"},
            {"img":"/static/img1/1496824061627_2.png","id":"101"},
            {"img":"/static/img1/1496824061627_2.png","id":"101"},
            {"img":"/static/img1/1496824061627_2.png","id":"101"},
            {"img":"/static/img1/1496824061627_2.png","id":"101"},

          ]
    },
    {
         "title":"鞋子箱包",
          "lei":["男鞋","帽子","包子" ],
          "xinxi":[
            {"img":"/static/img1/1496824061627_2.png","id":"101"},
            {"img":"/static/img1/1496824061627_2.png","id":"101"},
            {"img":"/static/img1/1496824061627_2.png","id":"101"},
            {"img":"/static/img1/1496824061627_2.png","id":"101"},
            {"img":"/static/img1/1496824061627_2.png","id":"101"},
            {"img":"/static/img1/1496824061627_2.png","id":"101"},
            {"img":"/static/img1/1496824061627_2.png","id":"101"},
            {"img":"/static/img1/1496824061627_2.png","id":"101"}

            ]
    },
    {
         "title":"户外运动",
          "lei":["男鞋","帽子","包子" ],
          "xinxi":[
            {"img":"/static/img1/1494644521219_2.jpg","id":"101"},
            {"img":"/static/img1/1494644521219_2.jpg","id":"101"},
            {"img":"/static/img1/1494644521219_2.jpg","id":"101"},
            {"img":"/static/img1/1494644521219_2.jpg","id":"101"},
            {"img":"/static/img1/1494644521219_2.jpg","id":"101"},
            {"img":"/static/img1/1494644521219_2.jpg","id":"101"},
            {"img":"/static/img1/1494644521219_2.jpg","id":"101"},
            {"img":"/static/img1/1494644521219_2.jpg","id":"101"}

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
});

// List商品列表里面的数据
app.get("/api/list",function(rep,res){
  res.json(
      [
        {"img":"/static/img1/1496807561335_2.png","dis":"爱华仕商务旅行箱20寸铝框拉杆箱24寸男飞机轮登机箱女箱子行李箱",
        "new":555,"old":877,"e":"50点"},
        {"img":"/static/img1/1496804690780_2.png","dis":"爱华仕商务旅行箱20寸铝框拉杆箱24寸男飞机轮登机箱女箱子行李箱",
        "new":666,"old":911,"e":"50点"},
        {"img":"/static/img1/1496806953600_2.png","dis":"爱华仕商务旅行箱20寸铝框拉杆箱24寸男飞机轮登机箱女箱子行李箱",
        "new":777,"old":900,"e":"50点"}
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
