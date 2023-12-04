function verifyWorker(worker) {
    if(!worker.name || worker.name < 3) {
        throw new Error('Worker name is required to be over 3 chars')
    }
    if(!worker.surname || worker.surname < 3) {
        throw new Error('Worker surname is required to be over 3 chars')
    }
    if(!worker.companyId) {
        throw new Error('Company id is required')
    }
}

module.exports = {
    verifyWorker
}