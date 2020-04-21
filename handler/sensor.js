const sensor = require('../dbInterface/sensor.js')

async function addSensor(idkelas,peoplecount){
    let result = await sensor.insertSensor(idkelas,peoplecount)
    if (result.Status == 'Success' ){
        result.Code = 200
    }
    else {
        result.Code = 500
    }
    return result
}

async function increasePeopleCount(idkelas) {
    const showResult = await sensor.showSensorByIdKelas(idkelas)
    let result = {};
    if (showResult.Status == 'Success'){
        let peoplecount = showResult.Message.peoplecount
        peoplecount+=1
        result = await sensor.updatePeopleCount(idkelas,peoplecount)
        if (result.Status == 'Success') {
            result.Code = 200
        }
        else {
            result.Code = 500
        }
    }
    else {
        result = showResult
        result.Code = 500
    }
    return result
}

async function decreasePeopleCount(idkelas){
    const showResult = await sensor.showSensorByIdKelas(idkelas)
    let result = {};
    if (showResult.Status == 'Success'){
        let peoplecount = showResult.Message.peoplecount
        if (peoplecount > 0){
            peoplecount-=1
            result = await sensor.updatePeopleCount(idkelas,peoplecount)
            if (result.Status == 'Success') {
                result.Code = 200
            }
            else {
                result.Code = 500
            }
        }
        else { //peoplecount <= 0
            result.Status = 'Failed'
            result.Code = 500
            result.Message = 'Counter is already 0'
        }
    }
    else {
        result = showResult
        result.Code = 500
    }
    return result
}

async function detailSensor(idkelas){
    let result = await sensor.showSensorByIdKelas(idkelas)
    if (result.Status == 'Success'){
        result.Code = 200
    }
    else {
        result.Code = 500
    }
    return result
}

module.exports ={
    addSensor : addSensor,
    increasePeopleCount : increasePeopleCount,
    decreasePeopleCount : decreasePeopleCount,
    detailSensor : detailSensor
}