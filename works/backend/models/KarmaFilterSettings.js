const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'KarmaFilterSetting',
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
            },
            timeFrame: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'always'
            },
            amount: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'any'

            },
            source: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'all'
            },
            filterType: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 1 // 1. transaction filter 2. karma filters

            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
        },
        { timestamps: true }
    );
};
