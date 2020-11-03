const moment = require('moment');
const isodate = require("isodate");
const _ = require('lodash');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');


/**
 * it is connecting mongodb.
 */
async function mongodbConnection(){
    const uri ="mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true";
    const dbconn = await MongoClient.connect(uri, { useUnifiedTopology: true , nativeParser: true});
    var dbo = await dbconn.db("getir-case-study");
    return  dbo.collection("records");
  }


/**
 * 
 * @param {*} reqBody  this is object
 * @returns filter data based on date and count 
 */
async function dataFilter(reqBody) {
    try {
        const result = {};
        result.records = [];
        const isCheked = await isParameterControl(reqBody);
        if (!isCheked.status) throw isCheked.msg
        const startDate = moment(reqBody.startDate).format('YYYY-MM-DD');
        const endDate = moment(reqBody.endDate).format('YYYY-MM-DD');
        const dbo = await mongodbConnection();
        const query = {
            createdAt: {
                $gte: isodate(startDate),
                $lt: isodate(endDate),
            }

        }
        const dataFilter = await dbo.find(query).toArray();
        dataFilter.map(datum => {
            const obj = {};
            obj.key = datum.key;
            obj.createdAt = datum.createdAt;
            const sumCount = _.sum(datum.counts);
            obj.totalCount = sumCount;
            if (reqBody.minCount < sumCount && reqBody.maxCount > sumCount) 
            { 
                result.records.push(obj); 
            }
        });
        result.code = 0;
        result.msg = 'Success';
        return result;
    } catch (error) {
        throw error;
    }
}
/**
 * 
 * @param {*} reqBody  this is request body object
 * @description  it is checked request parameters.
 */
async function isParameterControl(reqBody) {
    const errorObj = {};
    if (!reqBody.startDate || reqBody.startDate == '' || !reqBody.endDate || reqBody.endDate == '') {
        errorObj.status = false;
        errorObj.msg = 'startDate and endDate is not empty!';
        return errorObj
    }
    if (!reqBody.minCount || !reqBody.maxCount) {
        errorObj.status = false;
        errorObj.msg = 'minCount and maxCount is not empty!';
        return errorObj
    }

    errorObj.status = true;
    return errorObj;
}
module.exports = {
    dataFilter,
}