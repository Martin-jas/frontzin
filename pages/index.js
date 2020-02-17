import React, {useState }from 'react'
import styled from 'styled-components'
import { withRedux } from '../lib/redux'
import SingleSearch from '../components/SingleSearch'
import SearchResults from '../components/SearchResults'
import SubmitItem from '../components/SubmitItem'
import SubmitScript from '../components/SubmitScript'
import ClearCache from '../components/ClearCache'

const UpperContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-template-rows: auto auto;
  grid-gap: 20px;
  width: fit-content;
`

const AppContainer = styled.div`
  display: block;
`

const IndexPage = () => {
  const [ results, setResults ] = useState([])
  const onHit = (hits) => {

    const allHits = hits.hits.map( hit => {
      return { ...hit._source, score: hit._score }
    })
    setResults(allHits)
  }
  return (
    <AppContainer>
      <ClearCache/>
      <UpperContainer>
        <SingleSearch onHit={onHit}/>
        <SubmitItem />
        <SubmitScript />
      </UpperContainer>
      <SearchResults results={results}/>
    </AppContainer>
  )
}

export default withRedux(IndexPage)