import AddressService from '../../services/addressService';
import Util from '../../utils/Util';

const util = new Util();

class AddressController {
    static async getAllAddresses(req, res) {
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
            const allAddresses = await AddressService.getAllAddresses(filter, sort, pagination);
            if (pagination && allAddresses.rows.length > 0 || !pagination && allAddresses.length > 0) {
                util.setSuccess(200, 'Addresses retrieved', allAddresses);
            } else {
                util.setSuccess(200, 'No addresses found');
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async getAddressesGroup(req, res) {
        const {
            sortBy,
            order,
            limit,
            offset,
            groupBy,
            ...filter
        } = req.query;
        const pagination = limit ? { limit, offset: offset || 0 } : null;
        const groups = groupBy.split(",");
        try {
            const allAddresses = await AddressService.getAddressesGroup(groups, filter, pagination);
            if (pagination && allAddresses.rows.length > 0 || !pagination && allAddresses.length > 0) {
                util.setSuccess(200, 'Addresses retrieved', allAddresses);
            } else {
                util.setSuccess(200, 'No addresses found');
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async addAddress(req, res) {
        if (!req.body.name) {
            util.setError(400, 'Please provide complete details');
            return util.send(res);
        }
        const newAddress = req.body;
        try {
            const createdAddress = await AddressService.addAddress(newAddress);
            util.setSuccess(201, 'Address Added!', createdAddress);
            return util.send(res);
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async updatedAddress(req, res) {
        const alteredAddress = req.body;
        const { id } = req.params;
        if (!Number(id)) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            const updateAddress = await AddressService.updateAddress(id, alteredAddress);
            if (!updateAddress) {
                util.setError(404, `Cannot find address with the id: ${id}`);
            } else {
                util.setSuccess(200, 'Address updated', updateAddress);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async getAddress(req, res) {
        const { id } = req.params;

        if (!Number(id)) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }

        try {
            const foundAddress = await AddressService.getAddress(id);

            if (!foundAddress) {
                util.setError(404, `Cannot find address with the id ${id}`);
            } else {
                util.setSuccess(200, 'Found Address', foundAddress);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async deleteAddress(req, res) {
        const { id } = req.params;

        if (!Number(id)) {
            util.setError(400, 'Please provide a numeric value');
            return util.send(res);
        }

        try {
            const addressToDelete = await AddressService.deleteAddress(id);

            if (addressToDelete) {
                util.setSuccess(200, 'Address deleted');
            } else {
                util.setError(404, `Address with the id ${id} cannot be found`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }
}

export default AddressController;