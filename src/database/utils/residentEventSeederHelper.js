const { getResidents } = require('../utils/residentSeederHelper');
const { getEvents } = require('../utils/eventSeederHelper');

const getResidentEvents = () => {
    const events = getEvents();
    const residents = getResidents();
    const rows = [];
    events.forEach((event, i) => {
        residents.forEach((resident, j) => {
            const item = {
                eventId: i+1,
                residentId: j+1,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            rows.push(item);
        })
    });
    return rows;
};

module.exports = {
    getResidentEvents,
};