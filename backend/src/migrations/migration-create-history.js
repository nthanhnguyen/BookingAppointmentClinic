'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // patientID: DataTypes.INTEGER,
        // doctorID: DataTypes.INTEGER,
        // description: DataTypes.TEXT
        await queryInterface.createTable('histories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            patientID: {
                type: Sequelize.INTEGER
            },
            doctorId: {
                type: Sequelize.INTEGER
            },
            date: {
                type: Sequelize.STRING
            },
            timeType: {
                type: Sequelize.STRING
            },
            descriptionHTML: {
                type: Sequelize.TEXT
            },

            descriptionMarkdown: {
                type: Sequelize.TEXT
            },
            files: {
                type: Sequelize.BLOB('long')
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('histories');
    }
};