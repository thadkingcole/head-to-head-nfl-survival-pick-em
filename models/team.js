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
    picked: {
      // will change to true when picked & win
      // picked and lose keeps the team in play for future weeks
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return Team;
};
