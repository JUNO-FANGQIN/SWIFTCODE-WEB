import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, StaticRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import {
  App,
  Home,
  Introduce,
  NotMatch,
} from 'routes/sync'

const routes = [{
  path: '/',
  component: App,
  routes: [{
    path: '/',
    exact: true,
    component: Home,
    loadData: Home.loadData
  }, {
    path: '/introduce',
    exact: true,
    component: Introduce,
    loadData: Home.loadData
  }, {
    path: '*',
    component: NotMatch,
  }]
}]

export default routes
