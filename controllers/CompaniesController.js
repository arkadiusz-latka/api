const { getCompaniesDB, deleteCompanyDB, updateCompanyDB, insertCompanyDB, getCompanyByIdDB } = require('../database/companies');
const { getWorkersByCompanyIdDB } = require('../database/workers');
const { verifyCompany } = require('../validators/comapny.validator');


async function getCompanies(req, res) {
    return res.send({
        message: 'Companies downloaded!',
        data: await getCompaniesDB(),
    });
};

async function getCompany(req, res) {
    const company = await getCompanyByIdDB(req.params.id);
    if(!company) {
        return res.status(404).send({message: 'Company not found'});
    }
    return res.send({
        message: 'Single company data downloaded!',
        data: await getCompanyByIdDB(req.params.id),
    });
};

async function saveCompany(req, res) {
    const CompanyToSave = req.body;
    try {
        const newCompanyId = await insertCompanyDB(CompanyToSave);
        res.status(201).send({
            message: 'company created!',
            data: newCompanyId,
        });
    } catch (e) {
        res.status(400).send({message: e.message})
    }
}

async function removeCompany(req, res) {
    try {
        await deleteCompanyDB(req.params.id);
    } catch(e) {
        return res.status(404).send({message: e.message});
    }
    res.status(204).send({
        message: 'Company removed.',
    });
}

async function updateCompany(req, res) {
    const updatedCompany = req.body;
    updatedCompany.id = req.params.id;
    try {
        verifyCompany(updatedCompany);
    } catch(e) {
        return res.status(400).send({message: e.message});
    }
    try {
        await updateCompanyDB(req.params.id, updatedCompany);
    } catch(e) {
        return res.status(404).send({message: e.message});
    }
    res.send({
        message: 'Company updated.',
        data: updatedCompany,
    });
}

async function getCompanyWorkers(req, res) {
    const companyId = req.params.id;
    try {
        await getCompanyByIdDB(companyId);
    } catch(e) {
        return res.status(404).send({message: e.error});
    }

    try {
        const result = await getWorkersByCompanyIdDB(companyId);
        res.status(200).send({
            message: 'Company workers downloaded',
            data: result,
        });
    } catch(e) {
        return res.status(404).send({message: e.message});
    }
}

module.exports = {
    getCompanies,
    getCompany,
    saveCompany,
    removeCompany,
    updateCompany,
    getCompanyWorkers,
};