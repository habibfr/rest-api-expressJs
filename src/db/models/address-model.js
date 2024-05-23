import { DataTypes, Model, Sequelize } from "sequelize";
import { connection } from "../configs/connection.js";

export default class Address extends Model {}
Address.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    secureId: {
      type: DataTypes.UUID,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: false,
    },
    province: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: false,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: false,
    },
    vilage: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: false,
    },
  },
  {
    sequelize: connection,
    tableName: "addresses",
    underscored: true,
  }
);
