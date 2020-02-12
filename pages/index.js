import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { withRedux } from '../lib/redux'
import useInterval from '../lib/useInterval'
import Clock from '../components/clock'
import Counter from '../components/counter'
import SingleSearch from '../components/SingleSearch'
import Checkbox from '../components/Checkbox'

const Title = styled.h1`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.primary};
`
const IndexPage = () => {
  // Tick the time every second
//   const dispatch = useDispatch()
//   useInterval(() => {
//     dispatch({
//       type: 'TICK',
//       light: true,
//       lastUpdate: Date.now(),
//     })
//   }, 1000)
  return (
    <>
      {/* <Title> Relogin </Title>
      <Clock />
      <Counter /> */}
      <SingleSearch/>
    </>
  )
}

// IndexPage.getInitialProps = ({ reduxStore }) => {
//   // Tick the time once, so we'll have a
//   // valid time before first render
//   const { dispatch } = reduxStore
//   dispatch({
//     type: 'TICK',
//     light: typeof window === 'object',
//     lastUpdate: Date.now(),
//   })

//   return {}
// }

export default withRedux(IndexPage)