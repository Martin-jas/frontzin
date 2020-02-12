import React from 'react'
import styled from 'styled-components'
import { useSelector, shallowEqual } from 'react-redux'

const useClock = () => {
  return useSelector(
    state => ({
      lastUpdate: state.lastUpdate,
      light: state.light,
    }),
    shallowEqual
  )
}

const formatTime = time => {
  // cut off except hh:mm:ss
  return new Date(time).toJSON().slice(11, 19)
}

const StyledClock = styled.div`
    padding: 15px;
    display: inline-block;
    color: #82fa58;
    font: 50px menlo, monaco, monospace;
    background-color: #000;
`

const Clock = () => {
  const { lastUpdate, light } = useClock()
  return (
    <StyledClock className={light ? 'light' : ''}>
      {formatTime(lastUpdate)}
    </StyledClock>
  )
}

export default Clock