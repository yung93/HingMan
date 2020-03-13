import ResidentService from '../../services/residentService';
import Util from '../../utils/Util';

const util = new Util();

class ResidentController {
    static async getAllResidents(req, res) {
        const {
            sortBy,
            order,
            limit,
            offset,
            ...filter
        } = req.query;
        const sort = sortBy ? { sortBy, order: order || 'ASC' } : null;
        const pagination = limit ? { limit, offset: offset || 0 } : null;
        const addressFields = ['estate', 'block', 'floor', 'unit'];
        filter.address = _.pick(filter, addressFields);
        try {
            const allResidents = await ResidentService.getAllResidents(_.omit(filter, addressFields), sort, pagination);
            if (pagination && allResidents.rows.length > 0 || !pagination && allResidents.length > 0) {
                util.setSuccess(200, 'Residents retrieved', allResidents);
            } else {
                util.setSuccess(200, 'No residents found');
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async getAllResidentsByEvent(req, res) {
        const {
            sortBy,
            order,
            limit,
            offset,
            ...filter
        } = req.query;
        const { eventId } = req.params;

        const sort = sortBy ? { sortBy, order: order || 'ASC' } : null;
        const pagination = limit ? { limit, offset: offset || 0 } : null;
        try {
            const allResidents = await ResidentService.getAllResidentsByEvent(eventId, filter, sort, pagination);
            if (pagination && allResidents.rows.length > 0 || !pagination && allResidents.length > 0) {
                util.setSuccess(200, 'Residents retrieved', allResidents);
            } else {
                util.setSuccess(200, 'No residents found');
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async addResident(req, res) {
        const newResident = req.body;
        console.log(req.body);
        try {
            const createdResident = await ResidentService.addResident(newResident);
            util.setSuccess(201, 'Resident Added!', createdResident);
            return util.send(res);
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async updatedResident(req, res) {
        const alteredResident = req.body;
        const { id } = req.params;
        if (!Number(id)) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            const updateResident = await ResidentService.updateResident(id, alteredResident);
            if (!updateResident) {
                util.setError(404, `Cannot find resident with the id: ${id}`);
            } else {
                util.setSuccess(200, 'Resident updated', updateResident);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async getResident(req, res) {
        const { id } = req.params;

        if (!Number(id)) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }

        try {
            const foundResident = await ResidentService.getResident(id);

            if (!foundResident) {
                util.setError(404, `Cannot find resident with the id ${id}`);
            } else {
                util.setSuccess(200, 'Found Resident', foundResident);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async deleteResident(req, res) {
        const { id } = req.params;

        if (!Number(id)) {
            util.setError(400, 'Please provide a numeric value');
            return util.send(res);
        }

        try {
            const residentToDelete = await ResidentService.deleteResident(id);

            if (residentToDelete) {
                util.setSuccess(200, 'Resident deleted');
            } else {
                util.setError(404, `Resident with the id ${id} cannot be found`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }
}

export default ResidentController;