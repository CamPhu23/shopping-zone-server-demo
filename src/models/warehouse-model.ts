import { Schema, model, Types } from "mongoose";
import { Product } from ".";

interface IWarehouse {
  size: string;
  color: string;
  quantity: number;
  sold: number;
  product: Types.ObjectId;
}

export class Warehouse {
  id: string;
  size: string;
  color: string;
  quantity: number;
  sold: number;
  product: Product | null;

  static fromData(data: any): Warehouse {
    const warehouse = new Warehouse();

    warehouse.id = data.id as string;
    warehouse.size = data.size;
    warehouse.color = data.color;
    warehouse.quantity = data.quantity;
    warehouse.sold = data.sold;
    warehouse.product = data.product ? Product.fromData(data.product) : null;

    return warehouse;
  }
}

const schema = new Schema<IWarehouse>({
  size: {
    type: String,
    required: true,
  },

  color: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    default: 0,
  },

  sold: {
    type: Number,
    default: 0,
  },

  product: [
    {
      type: Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
  ],
});

export const WarehouseModel = model<IWarehouse>("warehouses", schema);
