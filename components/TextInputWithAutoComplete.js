import React, { useState } from 'react'
import styled from 'styled-components'

const StyledSearchInput = styled.input`
    padding: 15px;
    display: inline-block;
    color: #9F6164;
    font: 20px menlo, monaco, monospace;
    background-color: #F8DEBD;
    &.small{
        padding: 5px;
        display: inline-block;
        color: #9F6164;
        font: 10px black;
        background-color: #F8DEBD;
        flex:1;
    }
`

const TextInputWithAutoComplete = ({ selectedSearchType, className, small, onChange }) => {
    const [ searchTerm, setSearchTerm ] = useState("")
    const handleInputChange = (input) => {
        setSearchTerm(input.target.value)
        onChange && onChange(input.target.value)
    }

  return (
      <StyledSearchInput selectedSearchType={selectedSearchType}
      value={searchTerm}
      onChange={handleInputChange}
      className={`${className} ${small && "small"}`}
      />
  )
}

export default TextInputWithAutoComplete