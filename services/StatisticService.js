const {Statistics, Cases, Deadths, Tests} = require('../models/statistics.model');
const {getStatisticsDataFromSource} = require('./CovidService');

const removeStatistcs = async () => {
    await Statistics.deleteMany();
}

const setInitialStatisticDataFromSource = () => {

    const data = getStatisticsDataFromSource();

    data.then(function async (response) {
        
        removeStatistcs();

        response.data.response.map(async item => {
           
            await saveItemStatistic(item);

        });

    }).catch(function (error) {
        console.error(error);
    });

}

const getAllStatistics = () => {
    return Statistics.find({});
}

const getFilteredStatisticsByCountry = (search) => {
    const expRegx = new RegExp(search, 'i');
    return Statistics.find({'country': expRegx});
}

const saveItemStatistic = async (item) => {

    var _cases = new Cases({
        new:item['cases'].new,
        active:item['cases'].active,
        critical:item['cases'].critical,
        recovered:item['cases'].recovered,
        '1M_pop':item['cases']['1M_pop'], 
        total:item['cases'].total,
    });

    var _deaths = new Deadths({
        new:item['cases'].new,
        '1M_pop':item['cases']['1M_pop'], 
        total:item['cases'].total,
    });

    var _test = new Tests({
        '1M_pop':item['cases']['1M_pop'], 
        total:item['cases'].total,
    });

   var _statistics = new Statistics({
    continent:item['continent'],
    country:item['country'],
    population:item['population'],
    cases:_cases,
    deaths:_deaths,
    tests:_test,
    day:item['day'],
    time:item['time'],
   });
   
   await _statistics.save();

   return _statistics;

}

module.exports = {
    setInitialStatisticDataFromSource, 
    getAllStatistics, 
    getFilteredStatisticsByCountry, 
    saveItemStatistic,
}
