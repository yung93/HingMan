import ResidentService from '../../services/residentService';
import Util from '../../utils/Util';
import AddressService from "../../services/addressService";
import ResidentEventService from "../../services/residentEventService";

const util = new Util();

class RegisterController {
    static async register(req, res) {
        const {
            eventId,
            address = {},
            residentId,
            ...residentDetails
        } = req.body;
        let registeredResident = residentDetails || {};
        try {
            if (!address.id) {
                const newAddress = await AddressService.addAddress(address);
                address.id = newAddress.id;
            }
            if (residentId) {
                registeredResident.id = residentId;
                await ResidentService.updateResident(residentDetails);
            } else {
                residentDetails.addressId = address.id;
                registeredResident = await ResidentService.addResident(residentDetails);
            }
            if (eventId) {
                await ResidentEventService.addResidentEvent({ eventId, residentId: registeredResident.id })
            }
            util.setSuccess(200, 'Residents registered', registeredResident);
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }
}

export default RegisterController;