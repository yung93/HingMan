'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    description: DataTypes.TEXT,
    passcode: DataTypes.STRING,
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
    Event.belongsToMany(models.Resident, {
      through: models.ResidentEvent,
      as: 'residents',
      foreignKey: 'eventId',
    });
  };
  return Event;
};