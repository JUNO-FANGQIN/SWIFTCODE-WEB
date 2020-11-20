import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import * as actions from 'actions'
import { renderList } from 'utils'
import Header from 'components/business/Header'
import Select from 'components/common/Select'

const renderItem = (x) => (
  <div>
    <div>{x.title}</div>
    <a href={x.url}>
      <img src={x.image} alt={x.title} style={{ height: '100px' }} />
    </a>
  </div>
)

class Home extends React.Component{
  componentDidMount() {
    this.props.getHomeData()
  }

  render(){
    return (
      <div>
        <Helmet>
          <title>首页</title>
          <meta name="description" content="首页描述" />
        </Helmet>
        <Header />
        <div onClick={() => alert('click home')}>tst cache</div>
        <Fragment>
          <div>fsdkhfkhadsfkah</div>
          <div>ssss</div>
        </Fragment>
        <a href="/introduce">introduce</a>
        <br />
        <Link to="/introduce">introduce</Link>
        {renderList(this.props.data, renderItem)}
        <Select />
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

const EnhancedComponent = connect(mapStateToProps, mapDispatchToProps)(Home)

EnhancedComponent.loadData = (store) => {
  return store.dispatch(actions.getHomeData())
  // dispatch 返回的结果正是函数action的返回结果
}

export default EnhancedComponent
