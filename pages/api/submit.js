import {ELASTIC_SEARCH_SUBMIT} from '../../constants.js'
import axios from "axios";

export default async (req, res) => {
    const {
      body
    } = req

    const response = await axios.put( ELASTIC_SEARCH_SUBMIT + body.id,body)

    res.end(JSON.stringify(response.data))
  }

  export const config = {
    api: {
      bodyParser: true,
    },
  }