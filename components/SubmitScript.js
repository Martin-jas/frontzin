import React, { useState } from 'react'
import styled from 'styled-components'
import TextInputWithAutoComplete from './TextInputWithAutoComplete'
import ControlledTextInput from './ControlledTextInput'

const StyledSubmitContainer = styled.div`
    padding: 5px;
    width: 600px;
    display: flex;
    flex-direction: column;
    color: #82fa58;
    background-color:  #F8F8F2;
    border-radius: 10px;
    border: solid 2px #FEDCD8;
`

const PropertyFieldContainer = styled.div`
    display: grid;
    grid-template-columns: 100px auto;
    color: #cEaCD8;
    font: 10px;
    background-color:  #F8F8F2;
    margin: 5px;
`
const SubmitButton = styled.button`
    color: palevioletred;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
    flex: 1;
`;
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
const Title = styled.div`
    color: palevioletred;
    font-size: 1.5em;
    padding: 0.25em 1em;
`;
const ButtonsHolder = styled.div`
    display: flex;
`;
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

const PropertyField = (props) => {
    return (
        <PropertyFieldContainer>
            <p>{props.propertyKey}</p>
            <ControlledTextInput onChange={props.handlePropertyChange(props.propertyKey)} small value={props.value}/>
        </PropertyFieldContainer>
    )
}

const PropertyMultiField = ({propertyKey, handlePropertyChange}) => {
    const [allValues, setValue] = useState([{name:"", defaultValue:0}])

    const handleArrayChange = (index, isNameChanging) => (value) => {
        const newValues = [...allValues]
        const newValue = {
            name: newValues[index] && newValues[index].name || "",
            defaultValue: newValues[index] && newValues[index].defaultValue || 0
        }
        if (isNameChanging){
            newValue.name = value
        }else{
            newValue.defaultValue = value
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
                    <p>Default Value</p>
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

const SubmitItem = (props) => {
    const [ item, setItem ] = useState({})
    const handlePropertyChange = (propertyKey) => (value) => {
        console.log("item", {
            ...item,
            [propertyKey]: value
        })
        setItem({
            ...item,
            [propertyKey]: value
        })
    }
    const onSubmit = async () => {
        await fetch("/api/script", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        }).catch( err => {
            console.log("Error submiting script")
            console.log(err)
        })
    }
    const onGet = async () => {
        if (!item.id) {
            return
        }
        const response = await fetch("/api/script?id=" + item.id, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).catch( err => {
            console.log("Error submiting script")
            console.log(err)
        })
        const respObj = await response.json()
        console.log(respObj)
        if (!respObj.found) return;
        setItem(
            {
                id: respObj._id,
                script: respObj.script.source,
            }
        )
    }
    const onDelete = async () => {
        await fetch("/api/script", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        }).catch( err => {
            console.log("Error deleting script")
            console.log(err)
            return
        })
    setItem({})
    }

  return (
    <StyledSubmitContainer>
        <Title>
            Create Item
        </Title>
      <PropertyField propertyKey="id" handlePropertyChange={handlePropertyChange} value={item.id}/>
      <PropertyField propertyKey="script" handlePropertyChange={handlePropertyChange} value={item.script}/>
      <PropertyMultiField propertyKey="params" handlePropertyChange={handlePropertyChange} value={item.params}/>
      <ButtonsHolder>
        <SubmitButton onClick={onSubmit}>
            Send Script to ElasticDB
        </SubmitButton>
        <SubmitButton onClick={onGet}>
            Get Script from ElasticDB
        </SubmitButton>
        <SubmitButton onClick={onDelete}>
            Delete Script from ElasticDB
            </SubmitButton>
          </ButtonsHolder>
    </StyledSubmitContainer>
  )
}

export default SubmitItem