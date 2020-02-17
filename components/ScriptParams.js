import React, { useState } from 'react'
import styled from 'styled-components'
import TextInputWithAutoComplete from './TextInputWithAutoComplete'

const StyledSubmitContainer = styled.div`
    padding: 5px;
    width: 600px;
    display: flex;
    flex-direction: column;
    color: #82fa58;
    background-color:  #F8F8F2;
    border-radius: 10px;
    border: solid 2px #FEDCD8;
    transition: all linear 300ms;
    overflow: hidden;
    max-height:600px;
    ${props => !props.isVisible && 'max-height: 0px; transition: all linear 300ms;' || ''}
`
const PropertyFieldContainer = styled.div`
    display: grid;
    grid-template-columns: 100px auto;
    color: #cEaCD8;
    font: 10px;
    background-color:  #F8F8F2;
    margin: 5px;
`
const FieldWithPlus = styled.div`
    display: flex;
    flex: 1;
    grid-template-columns: auto 20px;
    color: #cEaCD8;
    font: 10px;
    background-color:  #F8F8F2;
    .param{
        flex: 1;
        margin-left:5px;
    }
`
const Holder = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
const Holder2 = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;
const PlusIcon = styled.button`
    color: palevioletred;
    font-size: 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
    margin: auto;
    margin-top: 10px;
    display: flex;
`;

const PropertyField = ({propertyKey, handlePropertyChange}) => {
    return (
        <PropertyFieldContainer>
            <p>{propertyKey}</p>
            <TextInputWithAutoComplete onChange={handlePropertyChange(propertyKey)} small/>
        </PropertyFieldContainer>
    )
}

const PropertyMultiField = ({propertyKey, handlePropertyChange}) => {
    const [allValues, setValue] = useState([{name:"", value:0}])

    const handleArrayChange = (index, isNameChanging) => (value) => {
        const newValues = [...allValues]
        const newValue = {
            name: newValues[index] && newValues[index].name || "",
            value: newValues[index] && newValues[index].value || 0
        }
        if (isNameChanging){
            newValue.name = value
        }else{
            newValue.value = value
        }
        newValues[index] = newValue

        const toSubmit = newValues.filter(val => val.name !== "");
        handlePropertyChange(propertyKey)(toSubmit)
        setValue(newValues)
    }
    return (
        <PropertyFieldContainer>
            <p>{propertyKey}</p>
            <Holder2>
            <Holder>
            {
                allValues.map((_, index) => (
                <FieldWithPlus key={index}>
                    <p>Name</p>
                    <TextInputWithAutoComplete className="param" onChange={handleArrayChange(index, true)} small/>
                    <p>Value</p>
                    <TextInputWithAutoComplete className="param" onChange={handleArrayChange(index)} small/>
                </FieldWithPlus>
                ))
            }
            </Holder>
            <PlusIcon onClick={() => setValue([...allValues,""])}>+</PlusIcon>
            </Holder2>
        </PropertyFieldContainer>
    )
}

const ScriptParams = ({isVisible, onChange}) => {
    const [ item, setItem ] = useState({})
    const handlePropertyChange = (propertyKey) => (value) => {
        const scriptParams = {
            ...item,
            [propertyKey]: value
        }
        setItem(scriptParams)
        onChange(scriptParams)
    }

  return (
    <StyledSubmitContainer isVisible={isVisible}>
      <PropertyField propertyKey="id" handlePropertyChange={handlePropertyChange}/>
      <PropertyMultiField propertyKey="params" handlePropertyChange={handlePropertyChange}/>
    </StyledSubmitContainer>
  )
}

export default ScriptParams