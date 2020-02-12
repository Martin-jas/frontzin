import React from 'react'
import styled from 'styled-components'

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`
const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`
const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  background-color: ${props => (props.checked ? 'salmon' : 'papayawhip')};
  border-radius: 4px;
  transition: all 150ms;
  border: solid 0.5px #FEDCD8;
  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }
  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')}
  }
`
const ExternalContainer = styled.div`
  display: flex;
  height: 16px;
  font-size: 12px;
  color: #9F6164;
  font: caption;
  font-weight: bold;
  margin: 10px;
`

const Checkbox = ({ className, checked, text, ...props }) => (
  <ExternalContainer>
    <label>
        <CheckboxContainer className={className}>
            <HiddenCheckbox checked={checked} {...props}/>
            <StyledCheckbox checked={checked} >
            <Icon viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
            </Icon>
            </StyledCheckbox>
        </CheckboxContainer>
        <span style={{ marginLeft: 8 }}>{text || "Nothing"}</span>
    </label>
  </ExternalContainer>
)

export default Checkbox
