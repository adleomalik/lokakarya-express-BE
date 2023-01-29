module.exports = (sequelize, Sequelize) => {
    const masterBankDB = sequelize.define("MASTER_BANK", {
        norek: {
            field: 'NOREK',
            // autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        nama: {
            field: 'NAMA',
            type: Sequelize.STRING
        },
        alamat: {
            field: 'ALAMAT',
            type: Sequelize.STRING
        },
        notelp: {
            field: 'NOTLP',
            type: Sequelize.INTEGER,
        },
        saldo: {
            field: 'SALDO',
            type: Sequelize.INTEGER,
        },
        user_id: {
            field: 'USER_ID',
            type: Sequelize.INTEGER
        }
    },
        {
            sequelize, // We need to pass the connection instance
            modelName: 'masterBankDB', // We need to choose the model name,
            tableName: 'MASTER_BANK',
            //freezeTableName: true
        });

    // masterBankDB.associate = function (models) {
    //     masterBankDB.belongsTo(models.provDB, { foreignKey: 'provinsi_id', sourceKey: '' })
    // };
    return masterBankDB;
};

