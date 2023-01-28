const db = require("../../models");
//const Op = db.Sequelize.Op;
const jsonMessage = require("../../json/jsonMessage");
const masterBankRepo = require("../../repositories/masterBank/masterBank.repository")(db);
const { getPagination, getPagingData } = require("../../utils/pagination");

exports.getMasterBank = async (req, res) => {
    const { page, size, field, value } = req.query;
    try {
        var condition = null;
        const { limit, offset } = getPagination(page - 1, size);

        if (field && value) {
            console.log("field", field);
            const params = field;

            console.log("condition");
            if (process.env.DIALECT === "oracle") {
                condition = { [field]: { $like: `%${value}%` } };
            } else {
                const Op = db.Sequelize.Op;
                condition = { [params]: { [Op.ilike]: `%${value}%` } };
            }
        }
        var data = await masterBankRepo.getMasterBank(condition, limit, offset);
        const response = getPagingData(data, page, limit);
        let message = {
            english: `Successfully Retrieved Data EMP`,
            //"indonesia" : `Berhasil Mengambil Data EMP`,
        };
        res.send(jsonMessage.jsonSuccess(message, response));
    } catch (err) {
        const errMessage = err.message || "Some error occurred while get Data EMP";
        if (err.original !== undefined) {
            res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
        } else {
            res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
        }
    }
};

exports.insertMasterBank = async (req, res) => {
    const tr = await db.sequelize.transaction();
    let hireDateParm = Date.parse(req.body.hireDate);
    //console.log("hireDate",hireDateParm)
    try {
        // const getmax = await masterBankRepo.getMax();
        var dataMasterBank = {
            // provinsiId: getmax.emp + 1,
            norek: req.body.norek,
            nama: req.body.nama,
            alamat: req.body.alamat,
            notelp: req.body.notelp,
            saldo: req.body.saldo,
            user_id: req.body.user_id,
        };

        const tempIEmp = await masterBankRepo.insertMasterBank(dataMasterBank, tr);
        //console.log("tempIEmp",tempIEmp)
        let message = {
            english: `Successfully Insert EMP`,
            indonesia: `Berhasil Input EMP`,
        };
        await tr.commit();
        res.send(jsonMessage.jsonSuccess(message, tempIEmp));
    } catch (err) {
        const errMessage = err.message || "Some error occurred while input EMP";
        if (err.original !== undefined) {
            console.log("err.original.code", err.original.code);
            console.log("err.message", err.message);
            res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
        } else {
            res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
        }
        await tr.rollback();
    }
};

exports.deleteMasterBank = async (req, res) => {
    const tr = await db.sequelize.transaction();
    try {
        console.log("req.body.norek", req.body.norek);
        const tempMasterBank = await masterBankRepo.deleteMasterBank(req.body.norek, tr);
        let message = {
            english: `Successfully Delete Bank`,
            indonesia: `Berhasil Delete Bank`,
        };
        await tr.commit();
        res.send(jsonMessage.jsonSuccess(message, tempMasterBank));
    } catch (err) {
        const errMessage = err.message || "Some error occurred while input EMP";
        if (err.original !== undefined) {
            console.log("err.original.code", err.original.code);
            console.log("err.message", err.message);
            res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
        } else {
            res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
        }
        await tr.rollback();
    }
};

exports.updateMasterBank = async (req, res) => {
    const tr = await db.sequelize.transaction();
    try {
        var dataMasterBank = {
            // norek: req.body.norek,
            nama: req.body.nama,
            alamat: req.body.alamat,
            notelp: req.body.notelp,
            saldo: req.body.saldo,
            user_id: req.body.user_id,
        };
        const tempBank = await masterBankRepo.updateMasterBank(req.body.norek, dataMasterBank, tr);
        let message = {
            english: `Successfully Update Bank`,
            indonesia: `Berhasil Update Bank`,
        };
        await tr.commit();
        res.send(jsonMessage.jsonSuccess(message, tempBank));
    } catch (err) {
        const errMessage = err.message || "Some error occurred while input EMP";
        if (err.original !== undefined) {
            console.log("err.original.code", err.original.code);
            console.log("err.message", err.message);
            res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
        } else {
            res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
        }
        await tr.rollback();
    }
};