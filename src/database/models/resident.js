'use strict';
import moment from 'moment';

module.exports = (sequelize, DataTypes) => {
  const Resident = sequelize.define('Resident', {
    name: DataTypes.STRING,
    mobileNo: DataTypes.STRING,
    homeNo: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.ENUM('F', 'M'),
    em: DataTypes.BOOLEAN,
    birthday: DataTypes.DATE,
    age: {
      type: new DataTypes.VIRTUAL(DataTypes.INTEGER, ['birthday']),
      get: function() {
        return moment(Date.now()).diff(moment(this.get('birthday')), 'years')
      }
    },
    log: DataTypes.TEXT,
  }, {});
  Resident.associate = function(models) {
    // associations can be defined here
    Resident.belongsTo(models.Address, {
      foreignKey: 'addressId',
      as: 'address',
    });
    Resident.belongsToMany(models.Event, {
      through: models.ResidentEvent,
      as: 'events',
      foreignKey: 'residentId',
    });
  };
  return Resident;
};