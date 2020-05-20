const rp = require('request-promise')

module.exports = async function(city) {
  if (!city) {
    throw new Error ('Имя города не может быть пустым')
  }

  const KEY = 'e1309b23a0aa0afee0064d9c4ffc9f0c'
  const uri = 'http://api.openweathermap.org/data/2.5/weather'

  const options = {
    uri,
    qs: {
      appid: KEY,
      q: city, 
      units: 'imperial'
    },
    json: true
  }

  try {
    const data = await rp(options)
    const celcius = (data.main.temp - 32) / 1.8
    // console.log(data)

    return {
      weather: `${data.name}: ${celcius.toFixed(1)}`,
      error: null
    }
  } catch (error) {
    return {

      weather: null,
      error: error.error.massage
    }
  }
}