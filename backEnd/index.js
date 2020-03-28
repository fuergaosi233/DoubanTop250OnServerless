'use strict';
const getList = require('./spider')
exports.main_handler = async (event, context) => {
    let res = {
        "isBase64Encoded": false,
        "statusCode": 200,
        "headers": {"Content-Type":"application/json;charset=utf-8", "Access-Control-Allow-Origin":"*"},
        "body": JSON.stringify(await getList())
    }
    return res
};