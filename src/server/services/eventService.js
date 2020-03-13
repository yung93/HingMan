import database from '../../database/models';

class EventService {
    static async getAllEvents(filter, sort, pagination) {
        filter = filter || {};
        sort = sort || { sortBy: 'createdAt', order: 'DESC' };
        pagination = pagination || {};
        const action = _.isEmpty(pagination) ? (e) => database.Event.findAll(e) : (e) => database.Event.findAndCountAll(e);
        try {
            return await action({
                where: filter,
                ...pagination,
                order: [[sort.sortBy, sort.order]],
            });
        } catch (error) {
            throw error;
        }
    }

    static async addEvent(newEvent) {
        try {
            return await database.Event.create(newEvent);
        } catch (error) {
            throw error;
        }
    }

    static async updateEvent(id, updateEvent) {
        try {
            const eventToUpdate = await database.Event.findOne({
                where: { id: Number(id) }
            });

            if (eventToUpdate) {
                await database.Event.update(updateEvent, { where: { id: Number(id) } });
                return updateEvent;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async getEvent(id) {
        try {
            const foundEvent = await database.Event.findOne({
                where: { id: Number(id) }
            });

            return foundEvent;
        } catch (error) {
            throw error;
        }
    }

    static async deleteEvent(id) {
        try {
            const eventToDelete = await database.Event.findOne({ where: { id: Number(id) } });

            if (eventToDelete) {
                const deletedEvent = await database.Event.destroy({
                    where: { id: Number(id) }
                });
                return deletedEvent;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async countEvents() {
        try {
            const count = await database.Event.count();
            return count;
        } catch (error) {
            throw error;
        }
    }
}

export default EventService;