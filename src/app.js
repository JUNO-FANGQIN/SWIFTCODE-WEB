import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter, StaticRouter } from 'react-router-dom'
import { renderRoutes, matchRoutes } from 'react-router-config'
import thunk from 'redux-thunk'
import transit from 'transit-immutable-js'
import Helmet from 'react-helmet'

import routes from './routes'
import rootReducer from './reducers'

export const getClientApp = () => {
  // transit.fromJSON参数似乎会先调用JSON.parse,所以必须是字符串
  const initState = window.__PRELOADED_STATE__ ? transit.fromJSON(window.__PRELOADED_STATE__) : {}
  const store = createStore(rootReducer, initState, applyMiddleware(thunk.withExtraArgument({ origin: 'client' })))
  return (
    <Provider store={store}>
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    </Provider>
  )
}

export const getServerApp = (req, res) => {
  const store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument({ origin: 'server' })))
  const matchedRoutes = matchRoutes(routes, req.path)
  const promises = []
  matchedRoutes.forEach(x => {
    const loadAction = x.route.loadData && x.route.loadData(store)
    if (loadAction && loadAction.then) {
      // 一个异步请求的失败不会影响其他异步请求
      const promise = new Promise((resolve) => {
        loadAction.then(resolve).catch(resolve)
      }).catch(e => console.log('##MATCHED_ROUTE_LOADDATA_EXCEPTION##', e))
      promises.push(promise)
    }
  })
  Promise.all(promises).then(() => {
    const context = { preloadedChunks: [] }
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter context={context} location={req.path}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    )
    const helmet = Helmet.renderStatic()

    // transit.toJSON返回字符串，JSON.stringify给字符串外面加上双引号
    const preloadedState = JSON.stringify(transit.toJSON(store.getState()))
    const preloadedChunks = JSON.stringify(context.preloadedChunks)

    // staticRouter会在<Redirect />组件里给context注入action:REPLACE
    if (context.action === 'REPLACE' && context.url) {
      res.redirect(301, context.url)
    }
    if (context.NotMatch) res.status(404)
    res.send(`
      <html>
        <head>
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
          <meta http-equiv="Pragma" content="no-cache" />
          <meta http-equiv="Expires" content="0" />
          <link href="/styles/bundle.css" rel="stylesheet" />
        </head>
        <body>
          <div id="root">${content}</div>
          <script>
            window.__PRELOADED_STATE__ = ${preloadedState}
            window.__PRELOADED_CHUNKS__ = ${preloadedChunks}
          </script>
          <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" /></script>
          <script src="/scripts/vendors.bundle.js"></script>
          <script src="/scripts/main.bundle.js"></script>
        </body>
      </html>
    `)
  }).catch((e) => console.log('##SERVER_SISE_RENDER_EXCEPTION##', e))
}