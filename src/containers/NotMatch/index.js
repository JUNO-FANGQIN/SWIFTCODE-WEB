import React, { Fragment } from 'react'
import { connect } from 'react-redux'

export default class NotMatch extends React.Component{
  componentWillMount() {
    const { staticContext } = this.props
    if (staticContext) staticContext.NotMatch = true
  }
  render(){
    return (
      <div>not match</div>
    )
  }
}
