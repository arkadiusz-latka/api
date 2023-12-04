const express = require('express');
const router = express.Router();
const WorkerController = require('../controllers/WorkersController');
const authGuard = require('../middleware/auth.middleware');

router.get('/', authGuard, WorkerController.getWorkers);
router.post('/', authGuard, WorkerController.saveWorker);
router.get('/:id', authGuard, WorkerController.getWorker);
router.delete('/:id', authGuard, WorkerController.removeWorker);
router.put('/:id', authGuard, WorkerController.updateWorker);
router.get('/:id/notify', authGuard, WorkerController.notifyWorker);

module.exports = router;