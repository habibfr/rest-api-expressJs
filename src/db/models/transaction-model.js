import { DataTypes, Model } from "sequelize";
import { connection } from "../configs/connection.js";

export default class Transaction extends Model {}
Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },
    secureId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    product: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: false,
    },
    buyer: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: false,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    province: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    village: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  },
  {
    sequelize: connection,
    tableName: "transactions",
    // underscored: true,
    indexes: [
      {
        fields: ["buyer"],
        unique: false,
      },
    ],
  }
);
