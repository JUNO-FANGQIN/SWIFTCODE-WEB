import React from 'react'
import { render } from 'react-dom'

const getAsyncComponent = (getModule) => {
  class AsyncComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        Component: null
      }
    }
    componentDidMount() {
      if (!AsyncComponent.Component) {
        setTimeout(() => {
          AsyncComponent.loadComponent().then(Component => {
            this.setState({ Component })
          }, 3000)
        })
      }
    }
    render() {
      const Component = this.state.Component || AsyncComponent.Component
      return Component ? <Component {...this.props} /> : <div>loading</div>
    }
  }
  AsyncComponent.loadComponent = () => getModule().then((module) => {
    const Component = (module && module.default) || module
    AsyncComponent.Component = Component
    // AsyncComponent.loadData = Component.loadData
    return Component
  })
  return AsyncComponent
}

export const App = getAsyncComponent(() => import('containers' /* webpackChunkName: 'App' */))
export const Home = getAsyncComponent(() => import('containers/Dashboard/Home' /* webpackChunkName: 'Home' */))
export const Introduce = getAsyncComponent(() => import('containers/Dashboard/Introduce' /* webpackChunkName: 'Introduce' */))
export const NotMatch = getAsyncComponent(() => import('containers/NotMatch' /* webpackChunkName: 'NotMatch' */))