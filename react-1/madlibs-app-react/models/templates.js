module.exports = (sequelize, DataTypes) => {
  const Templates = sequelize.define("Templates", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    templateBody: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    teaser: {
      type: DataTypes.STRING, // Optional teaser field for the template
    },
  });

  return Templates;
};
