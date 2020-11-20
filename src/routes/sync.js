import React from 'react'
import { render } from 'react-dom'

const getSyncComponent = (name, module) => {
  const Component = module.default || module
  class SyncComponent extends React.Component {
    componentWillMount() {
      const { staticContext } = this.props
      if (staticContext && staticContext.preloadedChunks) staticContext.preloadedChunks.push(name)
    }
    render() {
      return <Component {...this.props} />
    }
  }
  if (Component && Component.loadData) {
    SyncComponent.loadData = Component.loadData
  }
  return SyncComponent
}

export const App = getSyncComponent('App', require('containers'))
export const Home = getSyncComponent('Home', require('containers/Dashboard/Home'))
export const Introduce = getSyncComponent('Introduce', require('containers/Dashboard/Introduce'))
export const NotMatch = getSyncComponent('NotMatch', require('containers/NotMatch'))