import { Schema, model, Types } from "mongoose";
import { Product } from ".";

interface IWarehouse {
  size: string;
  color: string;
  quantity: number;
  sold: number;
  products: Types.ObjectId;
}

interface WarehouseInProductDetail {
  info: any[],
  sold: 0
};

export class Warehouse {
  id: string;
  size: string;
  color: string;
  quantity: number;
  sold: number;
  products: Product | null;

  static fromData(data: any): Warehouse {
    const warehouse = new Warehouse();

    warehouse.id = data.id as string;
    warehouse.size = data.size;
    warehouse.color = data.color;
    warehouse.quantity = data.quantity;
    warehouse.sold = data.sold;
    warehouse.products = data.product ? Product.fromData(data.product) : null;

    return warehouse;
  }

  static formatInProductDetail(data: any): WarehouseInProductDetail {
    let result = {} as WarehouseInProductDetail;

    const info = [
      { color: 'trang', sizes: [] },
      { color: 'den', sizes: [] },
      { color: 'xanh', sizes: [] },
      { color: 'xam', sizes: [] },
    ]

    info.forEach(item => {
      item.sizes = data
        .filter((warehouse: Warehouse) => warehouse.color == item.color)
        .map((warehouse: Warehouse) => warehouse.size);
    })
    result.sold = data
      .map((warehouse: Warehouse) => warehouse.sold)
      .reduce((sum: number, sold: number) => sum + sold, 0);
    result.info = info.filter((w: any) => w.sizes.length > 0);

    return result;
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

  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
  ],
});

export const WarehouseModel = model<IWarehouse>("warehouses", schema);
