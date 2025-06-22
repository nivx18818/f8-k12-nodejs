const { DataTypes } = require("sequelize");
const sequelize = require("@/config/db");

const Post = sequelize.define(
  "Post",
  {
    user_id: DataTypes.BIGINT({
      length: 9,
      unsigned: true,
      zerofill: true,
    }),
    slug: {
      type: DataTypes.STRING(45),
      unique: true,
    },
    title: {
      type: DataTypes.STRING(191),
      allowNull: false,
    },
    description: DataTypes.TEXT,
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "posts",
    underscored: true,
    timestamps: true,
  }
);

module.exports = Post;
