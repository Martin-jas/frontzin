import {ELASTIC_SEARCH_SCRIPT} from '../../constants.js'
import axios from "axios";


export default async (req, res) => {
    const {
        body,
        query: {id}
    } = req

    if (id) {
        console.log("get script " + id)
        const response = await axios.get( ELASTIC_SEARCH_SCRIPT + id)
        return res.end(JSON.stringify(response.data))
    }



    console.log(body)
    const response = await axios.post( ELASTIC_SEARCH_SCRIPT + body.id,{
        script: {
            lang: "painless",
            source: body.script,
            params: body.params || undefined
        }
    })

    res.end(JSON.stringify(response.data))
}

  export const config = {
    api: {
      bodyParser: true,
    },
  }