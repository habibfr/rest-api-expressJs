import { DataTypes, Model } from "sequelize";
import { connection } from "../configs/connection.js";

export default class Product extends Model {}
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    secureId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: false,
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: false,
    },
  },
  {
    tableName: "products",
    sequelize: connection,
    underscored: true,
    indexes: [
      {
        fields: ["name"],
      },
    ],
  }
);
