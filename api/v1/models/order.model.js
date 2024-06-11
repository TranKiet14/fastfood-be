const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account"
        },
        cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cart"
        },
        infomationOrder: {
            fullName: String,
            phone: String,
            address: String
        },
        listFoods: [
            {
                food: {
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: 'Food'
                },
                price: Number,
                discountPercentage: Number,
                quantity: Number
            }
        ],
        listCombos: [
            {
                originalCombo: {
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: 'Combo'
                },
                newListFoods: [
                    {
                        food: {
                            type: mongoose.Schema.Types.ObjectId, 
                            ref: 'Food'
                        },
                        quantity: Number
                    }
                ],
                price: Number,
                discountPercentage: Number,
                quantity: Number
            }
        ],
        totalPrice: Number,
        deleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: Date,
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema, "orders");

module.exports = Order;