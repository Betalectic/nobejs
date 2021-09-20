"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Author extends Model {}
  Author.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Author",
      tableName: "authors",
    }
  );

  return Author;
};
