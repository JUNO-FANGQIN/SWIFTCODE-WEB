import React, { Fragment } from 'react'

export const renderList = (list, format) => list && Array.isArray(list) && list.length ? list.map(x => (
  <Fragment key={x.key || Math.random()}>{format(x)}</Fragment>
)) : null