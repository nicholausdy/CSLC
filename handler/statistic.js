const statistic = require('../dbInterface/statistic.js');
const kelasHandler = require('./kelas.js');

async function createTimestamp(){
    let result = {};
    try {
        const d = new Date();
        const yearString = d.getFullYear().toString();
        const monthString = dateFormatter(d.getMonth() + 1);
        const dayString=  dateFormatter(d.getDate());
        const hourString = dateFormatter(d.getHours());
        const minuteString = dateFormatter(d.getMinutes());
        const secondsString = dateFormatter(d.getSeconds());
        const finalResult = [yearString, await monthString, await dayString, await hourString, await minuteString, await secondsString].join('');
        result.Status = 'Success';
        result.Message = parseInt(finalResult);  
    }
    catch (e) {
        result.Status = 'Failed';
        result.Message = e;
    }
    finally {
        return result;
    }

    async function dateFormatter(num){
        const numString = ((num < 10) ? ('0'.concat(num.toString())) : (num.toString())) // (condition) ? (true) : (false)
        return numString
    }     
}

async function createDetailStatistic(idkelas){
    let result = {};
    const query_result = await kelasHandler.detailKelas(idkelas);
    if (query_result.Status == 'Success'){
        result.Message = {};
        result.Message.idkelas = query_result.Message.idkelas; 
        result.Message.idgedung = query_result.Message.idgedung;
        result.Message.lampumenyala = query_result.Message.lampumenyala; 
        const timestamp_result = await createTimestamp();
        if (timestamp_result.Status == 'Success'){
            result.Message.timestamp = timestamp_result.Message;
            result.Status = timestamp_result.Status;
        } 
        else {
            result = timestamp_result;
        } 
    }
    else {
        result = query_result;
    }
    return result;
}

async function addStatistic(idkelas){
    let result = {};
    const query_result = await createDetailStatistic(idkelas);
    if (query_result.Status == 'Success'){
        result = await statistic.insertStatistic(query_result.Message.idkelas, query_result.Message.lampumenyala, query_result.Message.timestamp, query_result.Message.idgedung)
        if (result.Status == 'Success'){
            result.Code = 200;
        }
        else {
            result.Code = 500;
        }
    }
    else {
        result = query_result
        result.Code = 500;
    }
    return result;
}




module.exports = {
    addStatistic : addStatistic
}