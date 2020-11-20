import axios from 'axios'

const isProd = process.env.NODE_ENV === 'production'

export const setHomeData = (params) => ({ type: 'SET_HOME_DATA', payload: params })
export const getHomeData = () => (dispatch, getState, extra) => {
  const url = isProd ? `${GATEWAY_API_URL}/api/banners` : 'https://gank.io/api/v2/banners'
  return axios.get(url).then((result) => {
    dispatch(setHomeData(result.data))
  }).catch((error) => {
    console.log('error', error)
  })
}
// http://gank.io/api
// https://api.github.com/
// http://www.wanandroid.com/blog/show/2
// http://jsonplaceholder.typicode.com/
// https://www.apiopen.top/api.html