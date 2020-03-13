'use strict';
module.exports = (sequelize, DataTypes) => {
  const ResidentEvent = sequelize.define('ResidentEvent', {
    residentId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER
  }, {});
  ResidentEvent.associate = function(models) {
    // associations can be defined here

    ResidentEvent.belongsTo(models.Resident, {foreignKey: 'residentId'});
    ResidentEvent.belongsTo(models.Event, {foreignKey: 'eventId'});
  };
  return ResidentEvent;
};