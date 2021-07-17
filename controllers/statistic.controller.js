const { response } = require('express');
const {
    setInitialStatisticDataFromSource, 
    getAllStatistics,
    getFilteredStatisticsByCountry, 
    saveItemStatistic
  } = require('../services/StatisticService');

const getStatistics = async (req, resp = response) => {

    try {
        
        const data = await getAllStatistics();

        resp.json({
            data
        });

    } catch (error) {

        resp.status(500).json({
            ok: false,
            msg: "Oops! Something went wrong."
        });

    }

};

const getfilteredStatistics = async (req, resp = response) => {

    try {
        
        const search = req.params.country_id;
        const data = await getFilteredStatisticsByCountry(search);

        return resp.json({
            data
        });

    } catch (error) {
        resp.status(500).json({
            ok: false,
            msg: "Oops! Something went wrong."
        });

    }

};

const saveStatistic = async (req, resp = response) => {

    try {

        const result = await saveItemStatistic(req.body);

        return resp.json({
            ok: true,
            result
        });

    } catch (error) {

        return res.status(400).json({
            ok: false,
            msg: "Data structure no valid."
        });

    }

};

const setInitialStatistic = async (req, resp = response) => {

    try {
        
        setInitialStatisticDataFromSource();

        resp.json({
            ok:true
        });

    } catch (error) {

        resp.status(500).json({
            ok: false,
            msg: "Oops! Something went wrong."
        });

    }

};

module.exports = {
    getStatistics,
    getfilteredStatistics,
    saveStatistic,
    setInitialStatistic,    
}