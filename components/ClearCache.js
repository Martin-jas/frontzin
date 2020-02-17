import React from 'react'
import styled from 'styled-components'

const SubmitButton = styled.button`
    color: palevioletred;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
    flex: 1;
`;

const ClearCache = (props) => {
    const onSubmit = async () => {
        await fetch("/api/clear_cache", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }).catch( err => {
            console.log("Error submiting script")
            console.log(err)
        })
    }

  return (
        <SubmitButton onClick={onSubmit}>
            Clear ElasticDB Cache
        </SubmitButton>
  )
}

export default ClearCache