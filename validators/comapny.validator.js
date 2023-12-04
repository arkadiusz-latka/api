function verifyCompany(company) {
    if(!company.name || company.name < 3) {
        throw new Error('Company name is required to be over 3 chars')
    }
}

module.exports = {
    verifyCompany
}