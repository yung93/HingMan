import controller from './controller';
import { Router } from 'express';
const router = Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Entered address middleware.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', controller.getAllAddresses);
router.post('/', controller.addAddress);
router.get('/group', controller.getAddressesGroup);
router.get('/:id', controller.getAddress);
router.put('/:id', controller.updatedAddress);
router.delete('/:id', controller.deleteAddress);

export default router;
