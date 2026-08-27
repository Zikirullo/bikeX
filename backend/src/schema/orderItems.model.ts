import mongoose, { Schema } from "mongoose";

const OrderItemSchema = new Schema(
  {
    itemQuantity: {
      type: Number,
      required: true,
    },
    itemPrice: {
      type: Number,
      required: true,
    },
    orderId: { type: Schema.Types.ObjectId, ref: "Orders" },

    bikeId: {
      type: Schema.Types.ObjectId,
      ref: "Bikes",
    },
  },
  { timestamps: true, collection: "OrderItems" },
);

export default mongoose.model("orderItem", OrderItemSchema);
