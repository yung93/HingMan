import database from '../../database/models';

class ResidentService {
    static async getAllResidents({ address, ...filter }, sort, pagination) {
        filter = filter || {};
        sort = sort || { sortBy: 'createdAt', order: 'DESC' };
        pagination = pagination || {};
        const action = _.isEmpty(pagination) ? (e) => database.Resident.findAll(e) : (e) => database.Resident.findAndCountAll(e);
        try {
            return await action({
                where: filter,
                ...pagination,
                order: [[sort.sortBy, sort.order]],
                attributes: ['name', 'gender', 'age'],
                include: [{
                    model: database.Address,
                    as: 'address',
                    attributes: ['estate', 'block', 'floor', 'unit'],
                    required: !!address,
                    where: address,
                }]
            });
        } catch (error) {
            throw error;
        }
    }

    static async getAllResidentsByEvent(eventId, filter, sort, pagination) {
        filter = filter || {};
        sort = sort || { sortBy: 'createdAt', order: 'DESC' };
        pagination = pagination || {};
        const action = _.isEmpty(pagination) ? (e) => database.Resident.findAll(e) : (e) => database.Resident.findAndCountAll(e);
        try {
            return await action({
                where: { ...filter },
                ...pagination,
                order: [[sort.sortBy, sort.order]],
                attributes: ['name', 'gender', 'age'],
                include: [
                    {
                        model: database.Address,
                        as: 'address',
                        required: false,
                        attributes: ['estate', 'block', 'floor', 'unit']
                    },
                    {
                        model: database.Event,
                        as: 'events',
                        required: true,
                        attributes: [],
                        where: { id: Number(eventId) }
                    },
                ]
            });
        } catch (error) {
            throw error;
        }
    }

    static async addResident(newResident) {
        try {
            return await database.Resident.create(newResident);
        } catch (error) {
            throw error;
        }
    }

    static async updateResident(id, updateResident) {
        try {
            const residentToUpdate = await database.Resident.findOne({
                where: { id: Number(id) }
            });

            if (residentToUpdate) {
                await database.Resident.update(updateResident, { where: { id: Number(id) } });

                return updateResident;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async getResident(id) {
        try {
            const foundResident = await database.Resident.findOne({
                where: { id: Number(id) },
                include: [
                    {
                        model: database.Event,
                        as: 'events',
                        required: false,
                        attributes: ['name', 'startDate', 'description'],
                    },
                    {
                        model: database.Address,
                        as: 'address',
                        required: false,
                        attributes: ['estate', 'block', 'floor', 'unit']
                    }
                ]
            });

            return foundResident;
        } catch (error) {
            throw error;
        }
    }

    static async deleteResident(id) {
        try {
            const residentToDelete = await database.Resident.findOne({ where: { id: Number(id) } });

            if (residentToDelete) {
                const deletedResident = await database.Resident.destroy({
                    where: { id: Number(id) }
                });
                return deletedResident;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async countResidents() {
        try {
            const count = await database.Resident.count();
            return count;
        } catch (error) {
            throw error;
        }
    }
}

export default ResidentService;