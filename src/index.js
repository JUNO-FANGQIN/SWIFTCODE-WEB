import React from 'react'
import ReactDOM from 'react-dom'
import * as asyncChunks from 'routes/async'
import { getClientApp } from './app'

// 定义客户端全局变量
window.GATEWAY_API_URL = ''

const App = getClientApp()

const chunks = window.__PRELOADED_CHUNKS__

async function run() {
  if (chunks && Array.isArray(chunks) && chunks.length) {
    await Promise.all(chunks.map(chunk => asyncChunks[chunk].loadComponent()))
  }
  (chunks ? ReactDOM.hydrate : ReactDOM.render)(App, document.getElementById('root'))
}

run()
