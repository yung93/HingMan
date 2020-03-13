import database from '../../database/models';

class AddressService {
    static async getAllAddresses(filter, sort, pagination) {
        filter = filter || {};
        sort = sort || { sortBy: 'createdAt', order: 'DESC' };
        pagination = pagination || {};
        const action = _.isEmpty(pagination) ? (e) => database.Address.findAll(e) : (e) => database.Address.findAndCountAll(e);
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

    static async getAddressesGroup(groupBy = [], filter, pagination) {
        filter = filter || {};
        pagination = pagination || {};
        const action = _.isEmpty(pagination) ? (e) => database.Address.findAll(e) : (e) => database.Address.findAndCountAll(e);
        try {
            return await action({
                where: filter,
                ...pagination,
                order: groupBy.map((group) => [group, 'ASC']),
                attributes: [...groupBy],
                group: [...groupBy],
            });
        } catch (error) {
            throw error;
        }
    }

    static async addAddress(newAddress) {
        try {
            return await database.Address.create(newAddress);
        } catch (error) {
            throw error;
        }
    }

    static async updateAddress(id, updateAddress) {
        try {
            const addressToUpdate = await database.Address.findOne({
                where: { id: Number(id) }
            });

            if (addressToUpdate) {
                await database.Address.update(updateAddress, { where: { id: Number(id) } });

                return updateAddress;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async getAddress(id) {
        try {
            const foundAddress = await database.Address.findOne({
                where: { id: Number(id) }
            });

            return foundAddress;
        } catch (error) {
            throw error;
        }
    }

    static async deleteAddress(id) {
        try {
            const addressToDelete = await database.Address.findOne({ where: { id: Number(id) } });

            if (addressToDelete) {
                const deletedAddress = await database.Address.destroy({
                    where: { id: Number(id) }
                });
                return deletedAddress;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async countAddresses() {
        try {
            const count = await database.Address.count();
            return count;
        } catch (error) {
            throw error;
        }
    }
}

export default AddressService;