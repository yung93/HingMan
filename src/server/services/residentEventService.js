import database from '../../database/models';

class ResidentEventService {
    static async addResidentEvent(newResidentEvent) {
        try {
            return await database.ResidentEvent.create(newResidentEvent);
        } catch (error) {
            throw error;
        }
    }
}

export default ResidentEventService;