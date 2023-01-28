function masterBankRepositry(db) {
    const getMasterBank = (condition, limit, offset) => {

        return db.masterBankDB.findAndCountAll({
            attributes:
                [
                    'norek',
                    'nama',
                    'notelp',
                    'saldo',
                    'user_id'
                ],
            limit,
            offset,
            raw: true,
            nest: true,
            plain: false,
            //mapToModel: false,
            //distinct :true
        });
    }

    
    const insertMasterBank = (masterBankData, tr) => {

        const insertMasterBank = db.masterBankDB.create(masterBankData,
            {
                transaction: tr
            }
        );
        return insertMasterBank
    }

    const updateMasterBank = (norekPrm, masterBankData, tr) => {
        const updateMasterBank = db.masterBankDB.update(masterBankData,
            {
                where: {
                    norek: norekPrm,
                },

                transaction: tr
            }
        );
        return updateMasterBank

    }

    const deleteMasterBank = (norekPrm, tr) => {

        const deleteMasterBank = db.masterBankDB.destroy(
            {
                where: {
                    norek: norekPrm,
                },

                transaction: tr
            }
        );
        return deleteMasterBank

    }


    return {
        getMasterBank,
        insertMasterBank,
        updateMasterBank,
        deleteMasterBank
    }
}

module.exports = masterBankRepositry