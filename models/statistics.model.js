const { Schema, model } = require('mongoose');

const CasesSchema = Schema({

    "new": {
        type: String,        
    },
    "active": {
        type: Number,        
    },
    "critical": {
        type: Number,        
    },
    "recovered": {
        type: Number,        
    },
    "1M_pop": {
        type: String,        
    },
    "total": {
        type: Number,        
    },

}, {collection: 'cases'});

const DeadthsSchema = Schema({
    new: {
        type: String,
    },
    '1M_pop': {
        type: String,
    },
    total: {
        type: Number
    },
}, {collection: 'deaths'});

const TestsSchema = Schema({
    '1M_pop': {
        type: String,
    },
    total: {
        type: Number
    },
}, {collection: 'tests'});

const StatisticsSchema = Schema({

    continent: {
        type: String,        
    },
    country: {
        type: String,        
    },
    population: {
        type: Number,        
    },
    cases: CasesSchema,
    deaths: DeadthsSchema,
    tests: TestsSchema,
    day: {
        type: String,        
    },
    time: {
        type: String,        
    },

}, {collection: 'statistics'});

CasesSchema.method('toJSON', function(){

    const {__v, ...object} = this.toObject();

    return object;

});

DeadthsSchema.method('toJSON', function(){

    const {__v, ...object} = this.toObject();

    return object;

});

TestsSchema.method('toJSON', function(){

    const {__v, ...object} = this.toObject();

    return object;

});

StatisticsSchema.method('toJSON', function(){

    const {__v, ...object} = this.toObject();

    return object;

});

const Cases = model('Cases', CasesSchema);
const Deadths = model('Deadths', DeadthsSchema);
const Tests = model('Tests', TestsSchema);
const Statistics = model('Statistics', StatisticsSchema);

module.exports = {
    Statistics, Cases, Deadths, Tests,
}