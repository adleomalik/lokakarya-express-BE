module.exports = (app) => {
    const masterBank = require("../../controllers/masterBank/masterBank.controller.js");
    // const keycloak = require('../../config/keycloak.config').initKeycloak();

    var router = require("express").Router();

    // router.get("/", emp.getAll);
    // router.get("/OrMysql",  emp.getOrMysqlAll)
    router.get("/getMasterBank", masterBank.getMasterBank);
    router.post("/insertMasterBank", masterBank.insertMasterBank);
    router.put("/updateMasterBank", masterBank.updateMasterBank);
    router.delete("/deleteMasterBank", masterBank.deleteMasterBank)
    app.use("/api/masterBank/", router);
};
