const sequelize = require("../utils/connection");
require('../models');

const testMigrate = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Post reset Db✅');
        process.exit();
    } catch (error) {
        console.error(error);
    }
}

testMigrate();