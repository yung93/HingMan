const moment = require('moment-timezone');
moment.tz.setDefault("Asia/Hong_Kong");
moment.defaultFormat = "YYYY-MM-DD HH:mm";

const getResidents = () => {
    return [
        {
            name: '黃美娟',
            mobileNo: '91234567',
            homeNo: '25604444',
            email: null,
            gender: 'F',
            birthday: moment("1989-05-18").toDate(),
            addressId: 1,
            log: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: '陳大明',
            mobileNo: '98880111',
            homeNo: null,
            email: null,
            gender: 'M',
            birthday: moment("1989-05-18").toDate(),
            addressId: 101,
            log: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];
};

module.exports = {
    getResidents,
};