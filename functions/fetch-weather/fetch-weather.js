require('dotenv').config()
const axios = require('axios');

const handler = async (event) => {
  const city = event.queryStringParameters.city;
  const API_SECRET = process.env.API_SECRET;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_SECRET}&lang=pt_br`;

  try {
    const { data } = await axios(url) 
    return{
      statusCode: 200,
      body: JSON.stringify(data)
    }
  }catch (error) {
    const {status, statusText, headers, data} = error.response
    return {
      statusCode: status,
      body: JSON.stringify({status, statusText, headers, data})
    }
  }

}

module.exports = { handler }
