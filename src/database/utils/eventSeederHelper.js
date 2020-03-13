const moment = require('moment-timezone');
moment.tz.setDefault("Asia/Hong_Kong");
moment.defaultFormat = "YYYY-MM-DD HH:mm";

const getEvents = () => {
    return [
        {
            name: '派漂白水',
            startDate: moment("2020-03-07 11:00").toDate(),
            endDate: moment("2020-03-08 16:00").toDate(),
            description: '派漂白水',
            passcode: '8092',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: '派口罩',
            startDate: moment("2020-02-18 11:00").toDate(),
            endDate: moment("2020-02-18 16:00").toDate(),
            description: '派口罩',
            passcode: '6709',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];
};

module.exports = {
    getEvents,
}