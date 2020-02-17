import React, { useState } from 'react'
import styled from 'styled-components'
import SingleResult from './SingleResult'

const SearchResultsContainer = styled.div`
    padding: 15px;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(3, auto);
    grid-template-rows: auto auto auto;
    grid-auto-flow: column;
    color: #82fa58;
    font: 20px menlo, monaco, monospace;
    background-color:  #F8F8F2;
    border-radius: 10px;
    border: solid 2px #FEDCD8;
    margin: 20px;
`

const TextInputWithAutoComplete = (props) => {
  return (
      <SearchResultsContainer>
        {
            props.results && props.results.map(result => (
                <SingleResult data={result}/>
            ))
        }
      </SearchResultsContainer>
  )
}

export default TextInputWithAutoComplete