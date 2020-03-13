import EventService from '../../services/eventService';
import Util from '../../utils/Util';
import ResidentService from "../../services/residentService";
import ResidentEventService from "../../services/residentEventService";

const util = new Util();

const passcodes = JSON.parse(process.env.EVENT_PASSCODES);

class EventController {
    static async getAllEvents(req, res) {
        const {
            sortBy,
            order,
            limit,
            offset,
            ...filter
        } = req.query;
        const sort = sortBy ? { sortBy, order: order || 'ASC' } : null;
        const pagination = limit ? { limit, offset: offset || 0 } : null;
        try {
            const allEvents = await EventService.getAllEvents(filter, sort, pagination);
            if (pagination && allEvents.rows.length > 0 || !pagination && allEvents.length > 0) {
                util.setSuccess(200, 'Events retrieved', allEvents);
            } else {
                util.setSuccess(200, 'No events found');
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async addEvent(req, res) {
        if (!req.body.name) {
            util.setError(400, 'Please provide complete details');
            return util.send(res);
        }
        const newEvent = req.body;
        try {
            const count = await EventService.countEvents();
            newEvent.passcode = passcodes[count%1000];
            const createdEvent = await EventService.addEvent(newEvent);
            util.setSuccess(201, 'Event Added!', createdEvent);
            return util.send(res);
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async updatedEvent(req, res) {
        const alteredEvent = req.body;
        const { id } = req.params;
        if (!Number(id)) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            const updateEvent = await EventService.updateEvent(id, alteredEvent);
            if (!updateEvent) {
                util.setError(404, `Cannot find event with the id: ${id}`);
            } else {
                util.setSuccess(200, 'Event updated', updateEvent);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async getEvent(req, res) {
        const { id } = req.params;

        if (!Number(id)) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }

        try {
            const foundEvent = await EventService.getEvent(id);

            if (!foundEvent) {
                util.setError(404, `Cannot find event with the id ${id}`);
            } else {
                util.setSuccess(200, 'Found Event', foundEvent);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async deleteEvent(req, res) {
        const { id } = req.params;

        if (!Number(id)) {
            util.setError(400, 'Please provide a numeric value');
            return util.send(res);
        }

        try {
            const eventToDelete = await EventService.deleteEvent(id);

            if (eventToDelete) {
                util.setSuccess(200, 'Event deleted');
            } else {
                util.setError(404, `Event with the id ${id} cannot be found`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async registerEvent(req, res) {
        const { id } = req.params;
        let { userId, ...user } = req.body;
        try {
            if (userId) {
                await ResidentService.updateResident(user);
            } else {
                const newUser = await ResidentService.addResident(user);
                userId = newUser.id;
            }
            await ResidentEventService.addResidentEvent({ userId, eventId: id });
            util.setSuccess(200, 'Registered');
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    };
}

export default EventController;