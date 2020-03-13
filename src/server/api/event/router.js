import controller from './controller';
import { Router } from 'express';
const router = Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Entered event middleware.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', controller.getAllEvents);
router.post('/', controller.addEvent);
router.get('/:id', controller.getEvent);
router.put('/:id', controller.updatedEvent);
router.delete('/:id', controller.deleteEvent);
router.post('/register/:id', controller.registerEvent);

export default router;
