module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define("Team", {
    name: {
      type: DataTypes.STRING, // "Chiefs"
    },
    location: {
      type: DataTypes.STRING, // "Kansas City"
    },
    abbr: {
      type: DataTypes.STRING(3), // "KCC"
    },
    color1: {
      type: DataTypes.STRING(7), // "#e31837" aka red
    },
    color2: {
      type: DataTypes.STRING(7), // "#ffb81c" aka gold
    },
  });

  Team.associate = (models) => {
    Team.belongsTo(models.User);
  };
  return Team;
};
