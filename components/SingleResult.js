import React from 'react'
import styled from 'styled-components'
const SingleResultContainer = styled.div`
    padding: 15px;
    display: inline-block;
    flex-shrink: 1;
    color: #FE0C08;
    font: 10px #FEDCD8;
    background-color:  #F8F8F2;
    border-radius: 10px;
    grid-row: 1;
    border: solid 2px #FEDCD8;
    margin: 20px;
`

const SingleResult = (props) => {
  return (
      <SingleResultContainer>
        <p>id: {props.data.id}</p>
        <p>score: {props.data.score}</p>
        <p>name: {props.data.name}</p>
        <p>description: {props.data.description}</p>
        <p>numIngredients: {props.data.numIngredients}</p>
        <p>nameAsKey: {props.data.nameAsKey}</p>
        { props.data.ingredients && props.data.ingredients.map( ing => {
            return (<p>ingredient: {ing}</p>)
            })
        }
        { props.data.tags && props.data.tags.map( (tag, index) => {
            return (<p>tag-{index+1}: {tag}</p>)
            })
        }
        { props.data.categories && props.data.categories.map( (cat, index) => {
            return (<p>category-{index+1}: {cat}</p>)
            })
        }
        

      </SingleResultContainer>
  )
}

export default SingleResult