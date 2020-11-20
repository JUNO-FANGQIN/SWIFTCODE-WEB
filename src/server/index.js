import path from 'path'
import express from 'express'
import proxy from 'express-http-proxy'
import mcache from 'memory-cache'

import { getServerApp } from '../app'

// 定义服务器端全局变量
global.GATEWAY_API_URL = 'http://localhost:9999'

const app = express()

app.use(express.static('server'))
app.use('/api', proxy('https://gank.io', {
  proxyReqPathResolver: req => `/api/v2${req.url}`
  // proxyReqBodyDecorator: {},
  // proxyReqOptDecorator: {},
  // proxyErrorHandler: {}
}))
// 服务器端缓存
const cache = (duration) => (req, res, next) => {
  const key = `__memory_cache__${req.url}`
  const cachedHtml = mcache.get(key)
  if (cachedHtml) {
    return res.send(cachedHtml)
  } else {
    res.sendHtml = res.send
    res.send = (html) => {
      mcache.put(key, html, duration * 1000)
      res.sendHtml(html)
    }
    next()
  }
}
app.get('*', cache(1000), (req, res, next) => {
  getServerApp(req, res)
})
app.listen('9999', () => console.log('http://localhost:9999'))
