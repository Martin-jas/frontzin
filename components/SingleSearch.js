import React, { useState } from 'react'
import styled from 'styled-components'
import Checkbox from './Checkbox'
import TextInputWithAutoComplete from './TextInputWithAutoComplete'
import ScriptParams from './ScriptParams'

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

const calculateScriptQueryString = (scriptObj) => {
  console.log({scriptObj})
  if (!scriptObj.id){
    return ""
  }
  const initialStr = "&scriptId="+scriptObj.id
  console.log({initialStr})
  const finalStr = scriptObj.params && scriptObj.params.reduce((acc, param) => {
    return acc + "&" + param.name + "=" + param.value
  }, initialStr) ||  initialStr
  return finalStr
}

const getAutocompleteSuggestion = (onHit, scriptObj) => async (term) => {
  console.log(term, "getAutocompleteSuggestion", scriptObj)
  const baseSearchUrl = "/api/searches?term="+term
  const scriptQueryString = scriptObj ? calculateScriptQueryString(scriptObj) : "";
  const response = await fetch(baseSearchUrl+scriptQueryString, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  const {hits, ...respRest} = await response.json()
  console.log(respRest)
  if (hits) {
    console.log(hits)
    onHit(hits)
  }
}

const SingleSearch = (props) => {
    const [ checkedBox, setCheckBoxStates ] = useState(0)
    const [script, setScript] = useState({})
    const handleCheckboxChange = (checkedBoxValue) => () => {
        setCheckBoxStates(checkedBoxValue)
    }
    const onChangeScriptParams = (script) => {
      setScript(script)
    }
    const isRegularSearch = checkedBox == 0
    const isScriptedSearch = checkedBox == 1;
  return (
    <StyledSearchContainer>
      <Checkbox
        text="Search As Is"
        checked={isRegularSearch}
        onChange={handleCheckboxChange(0)}
      />
       <Checkbox
        text="Use Script By ID"
        checked={isScriptedSearch}
        onChange={handleCheckboxChange(1)}
      />
      <ScriptParams 
        isVisible={isScriptedSearch}
        onChange={onChangeScriptParams}
      />
       <Checkbox
        text="Send Weights"
        checked={checkedBox == 2}
        onChange={handleCheckboxChange(2)}
      />
      <TextInputWithAutoComplete selectedSearchType={checkedBox} onChange={getAutocompleteSuggestion(props.onHit, isScriptedSearch && script || null)}/>
    </StyledSearchContainer>
  )
}

export default SingleSearch