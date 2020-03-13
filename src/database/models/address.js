'use strict';
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    estate: DataTypes.STRING,
    block: DataTypes.STRING,
    floor: DataTypes.INTEGER,
    unit: DataTypes.STRING,
  }, {});
  Address.associate = function(models) {
    // associations can be defined here
    Address.hasMany(models.Resident, {
      as: 'residents',
      foreignKey: 'addressId',
    });
  };
  return Address;
};