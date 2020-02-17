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
    display: grid;
    flex: 1;
    grid-template-columns: auto 20px;
    color: #cEaCD8;
    font: 10px;
    background-color:  #F8F8F2;
`
const PlusIcon = styled.button`
    color: palevioletred;
    font-size: 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
    margin: auto;
    margin-top: 10px;
    display: flex;
`;
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

const PropertyMultiField = ({propertyKey, handlePropertyChange}) => {
    const [allValues, setValue] = useState([""])

    const handleArrayChange = (index) => (value) => {
        const newValues = [...allValues]
        newValues[index] = value

        const toSubmit = newValues.filter(val => val !== "");
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
                        <TextInputWithAutoComplete onChange={handleArrayChange(index)} small/>
                </FieldWithPlus>
                ))
            }
            </Holder>
            <PlusIcon onClick={() => setValue([...allValues,""])}>+</PlusIcon>
            </Holder2>
        </PropertyFieldContainer>
    )
}
const PropertyField = ({propertyKey, handlePropertyChange}) => {
    return (
        <PropertyFieldContainer>
            <p>{propertyKey}</p>
            <TextInputWithAutoComplete onChange={handlePropertyChange(propertyKey)} small/>
        </PropertyFieldContainer>
    )
}
const SubmitItem = (props) => {
    const [ item, setItem ] = useState({})
    const handlePropertyChange = (propertyKey) => (value) => {
        setItem({
            ...item,
            [propertyKey]: value
        })
    }
    const onSubmit = async () => {
        const itemToSubmit = {...item}
       
        itemToSubmit.nameAsKey = item.name
        itemToSubmit.numFacets = item.facets && item.facets.length || 0 
        itemToSubmit.numIngredients = item.ingredients && item.ingredients.length || 0

        await fetch("/api/submit", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itemToSubmit)
        }).catch( err => {
            console.log("Error submiting item")
            console.log(err)
        })
    }
    const onDelete = async () => {
        await fetch("/api/delete", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        }).catch( err => {
            console.log("Error deleting item")
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
      <PropertyField propertyKey="id" handlePropertyChange={handlePropertyChange}/>
      <PropertyField propertyKey="name" handlePropertyChange={handlePropertyChange}/>
      <PropertyField propertyKey="description" handlePropertyChange={handlePropertyChange}/>
      <PropertyMultiField propertyKey="categories" handlePropertyChange={handlePropertyChange}/>
      <PropertyMultiField propertyKey="ingredients" handlePropertyChange={handlePropertyChange}/>
      <PropertyMultiField propertyKey="tags" handlePropertyChange={handlePropertyChange}/>
      <PropertyMultiField propertyKey="genericName" handlePropertyChange={handlePropertyChange}/>
      <ButtonsHolder>
        <SubmitButton onClick={onSubmit}>
            Send to ElasticDB
            </SubmitButton>
        <SubmitButton onClick={onDelete}>
            Delete from ElasticDB
            </SubmitButton>
          </ButtonsHolder>
    </StyledSubmitContainer>
  )
}

export default SubmitItem