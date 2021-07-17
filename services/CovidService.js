const axios = require('axios').default;

var options = {
    method: 'GET',
    url: `${process.env.ENDPOINT_COVID_DATA}/statistics` ,
    headers: {
        'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
        'x-rapidapi-host': process.env.X_RAPIDAPI_HOST
    }
};
  
const getStatisticsDataFromSource = () => axios.request(options);

module.exports = {
    getStatisticsDataFromSource
}