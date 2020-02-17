import {ELASTIC_SEARCH_API} from '../../constants.js'
import axios from "axios";

export default async (req, res) => {
    // Add "params" later 
    const {
      query: { term, scriptId },

    } = req
    const multi_match =  {
        query: term,
        fields :["name^4","ingredients^3","tags","categories","genericName"],
        fuzziness: "AUTO",
    }
    
    var script = {}
    if (scriptId) {
        script = {
            function_score : {
                query: { multi_match},
                functions: [
                    {
                        filter: { term: { "nameAsKey.keyword": {value: term}}},
                        weight: 40
                    },
                    {
                        filter: { match: { ingredients: term } },
                        script_score: {
                            script: {
                                id: scriptId
                            }
                        },
                        weight:4,
                    }
                ],
                score_mode: "multiply",
            },
        }
    }

    const finalObj = Object.keys(script).length > 0 && script || {multi_match};
    
    const query = {
        data: {
            query: {
                ...finalObj
            },
        }
    } 
    
    console.log(JSON.stringify(query, null, 2))
    const response = await axios.get( ELASTIC_SEARCH_API,query)
    if (response.error) {
        console.log(response.error)
    }
    res.end(JSON.stringify(response.data))
  }