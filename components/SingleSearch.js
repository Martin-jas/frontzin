import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector, shallowEqual } from 'react-redux'
import Checkbox from './Checkbox'

const useClock = () => {
  return useSelector(
    state => ({
      lastUpdate: state.lastUpdate,
      light: state.light,
    }),
    shallowEqual
  )
}

const StyledSearchContainer = styled.div`
    padding: 15px;
    width: 600px;
    display: flex;
    flex-direction: column;
    color: #82fa58;
    font: 20px menlo, monaco, monospace;
    background-color:  #F8F8F2;
    border-radius: 10px;
    border: solid 2px #FEDCD8;
`
const StyledSearchInput = styled.input`
    padding: 15px;
    display: inline-block;
    color: #9F6164;
    font: 20px menlo, monaco, monospace;
    background-color: #F8DEBD;
`

const SingleSearch = () => {
    const [ checkedBox, setCheckBoxStates ] = useState(0)
    const handleCheckboxChange = (checkedBoxValue) => () => {
        setCheckBoxStates(checkedBoxValue)
    }
  return (
    <StyledSearchContainer>
      <Checkbox
        text="Search type 1"
        checked={checkedBox == 0}
        onChange={handleCheckboxChange(0)}
      />
       <Checkbox
        text="Search type 2"
        checked={checkedBox == 1}
        onChange={handleCheckboxChange(1)}
      />
       <Checkbox
        text="Search type 3"
        checked={checkedBox == 2}
        onChange={handleCheckboxChange(2)}
      />
      <StyledSearchInput/>
    </StyledSearchContainer>
  )
}

export default SingleSearch