const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('inventario', 'inventario_user', 'your_password', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false 
});

module.exports = sequelize;