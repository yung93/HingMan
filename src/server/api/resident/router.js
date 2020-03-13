import controller from './controller';
import { Router } from 'express';
const router = Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Entered resident middleware.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', controller.getAllResidents);
router.get('/event/:eventId', controller.getAllResidentsByEvent);
router.post('/', controller.addResident);
router.get('/:id', controller.getResident);
router.put('/:id', controller.updatedResident);
router.delete('/:id', controller.deleteResident);

export default router;
