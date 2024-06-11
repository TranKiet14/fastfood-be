const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account"
        },
        listFoods: [
            {
                food: {
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: 'Food'
                },
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
                totalPrice: Number,
                quantity: Number
            }
        ]
    },
    {
        timestamps: true,
    }
);

const Cart = mongoose.model("Cart", cartSchema, "carts");

module.exports = Cart;