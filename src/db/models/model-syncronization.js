import Address from "./address-model.js";
import Users from "./user-model.js";
import Transaction from "./transaction-model.js";
import Product from "./product-model.js";
import { connection } from "../configs/connection.js";
Users.address = Users.hasOne(Address, {
    foreignKey: {
        allowNull: true,
        field: "user_id",
    },
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT"
})
Address.Users = Address.belongsTo(Users);
export { Address, Users, Transaction, Product, connection }