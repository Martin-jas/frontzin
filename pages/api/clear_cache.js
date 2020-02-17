import {ELASTIC_SEARCH_CLEAR_CACHE} from '../../constants.js'
import axios from "axios";

export default async (req, res) => {
    const response = await axios.post( ELASTIC_SEARCH_CLEAR_CACHE)

    res.end(JSON.stringify(response.data))
  }

  export const config = {
    api: {
      bodyParser: true,
    },
  }