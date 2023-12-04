const express = require('express');
const router = express.Router();
const CompaniesController = require('../controllers/CompaniesController');
const authGuard = require('../middleware/auth.middleware');

router.get('/', authGuard, CompaniesController.getCompanies);
router.post('/', authGuard, CompaniesController.saveCompany);
router.get('/:id', authGuard, CompaniesController.getCompany);
router.delete('/:id', authGuard, CompaniesController.removeCompany);
router.put('/:id', authGuard, CompaniesController.updateCompany);
router.get('/:id/workers', authGuard, CompaniesController.getCompanyWorkers);

module.exports = router;