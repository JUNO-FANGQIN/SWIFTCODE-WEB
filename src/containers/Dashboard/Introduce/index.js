import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { renderList } from 'utils'
import * as actions from 'actions'
import Header from 'components/business/Header'

const renderItem = (x) => (
  <div>
    <div>{x.title}</div>
    <a href={x.url}>
      <img src={x.image} alt={x.title} style={{ height: '100px' }} />
    </a>
  </div>
)

class Introduce extends React.Component{
  componentDidMount() {
    this.props.getHomeData()
  }

  render(){
    return (
      <div>
        <Header />
        <div>introduce</div>
        <Fragment>
          <div>fhjkdshfkahkds</div>
          <div>ssfdfhjhdfhakshfss</div>
        </Fragment>
        <a href="/">home</a>
        {renderList(this.props.data, renderItem)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.home.get('data') && state.home.get('data').get('data').toJS()
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getHomeData: () => dispatch(actions.getHomeData())
  }
}

const EnhancedComponent = connect(mapStateToProps, mapDispatchToProps)(Introduce)

EnhancedComponent.loadData = (store) => {
  return store.dispatch(actions.getHomeData())
}

export default EnhancedComponent