import React from 'react'
import { renderRoutes } from 'react-router-config'

import sence from 'resources/images/sence.jpg'

import style from './style.less'

class App extends React.Component {
  render() {
    const { route } = this.props
    return (
      <div className={style.app}>
        <div>tttt</div>
        <img src={sence} width="200" />
        <div className="app-1">{renderRoutes(route.routes)}</div>
      </div>
    )
  }
}

export default App