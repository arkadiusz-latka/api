const { getWorkersDB, deleteWorkerDB, updateWorkerDB, insertWorkerDB, getWorkerByIdDB } = require('../database/workers');
const { verifyWorker } = require('../validators/worker.validator');

async function getWorkers(req, res) {
    return res.send({
        message: 'Workers downloaded!',
        data: await getWorkersDB(),
    });
};

async function getWorker(req, res) {
    const worker = await getWorkerByIdDB(req.params.id);
    if(!worker) {
        return res.status(404).send({message: 'Worker not found'});
    }
    return res.send({
        message: 'Single worker downloaded!',
        data: worker,
    });
};

async function saveWorker(req, res) {
    const workerToSave = req.body;
    try {
        verifyWorker(workerToSave);
    } catch(e) {
        return res.status(400).send({message: e.message});
    }
    const newWorkerId = await insertWorkerDB(workerToSave);
    res.status(201).send({
        message: 'Worker created!',
        data: newWorkerId,
    });
}

async function removeWorker(req, res) {
    try {
        await deleteWorkerDB(req.params.id);
    } catch(e) {
        return res.status(404).send({message: e.message});
    }
    res.status(204).send({
        message: 'Worker removed.',
    });
}

async function updateWorker(req, res) {
    const updatedWorker = req.body;
    updatedWorker.id = req.params.id;
    try {
        verifyWorker(updatedWorker);
    } catch(e) {
        return res.status(400).send({message: e.message});
    }
    try {
        await updateWorkerDB(req.params.id, updatedWorker);
    } catch(e) {
        return res.status(404).send({message: e.message});
    }
    res.send({
        message: 'Worker updated.',
        data: updatedWorker,
    });
}

async function notifyWorker(req, res) {
    const worker = await getWorkerByIdDB(req.params.id);
    if(!worker) {
        return res.status(404).send({message: 'Worker not found'});
    }
    if(!worker.university) {
        return res.status(400).send({message: 'Worker needs univeristy information'});
    }
    return res.send({
        message: 'Single worker notified!',
        data: worker,
    });
}

module.exports = {
    getWorkers,
    getWorker,
    saveWorker,
    removeWorker,
    updateWorker,
    notifyWorker,
};