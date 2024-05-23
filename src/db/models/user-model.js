import { DataTypes, Model } from "sequelize";
import { connection } from "../configs/connection.js";

export default class Users extends Model {}
Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    secureId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: false,
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    token: {
      type: DataTypes.UUID,
      allowNull: true,
      unique: true,
      defaultValue: null,
    },
  },
  {
    sequelize: connection,
    tableName: "users",
    underscored: true,
    indexes: [
      {
        fields: ["email"],
        unique: true,
      },
    ],
  }
);
