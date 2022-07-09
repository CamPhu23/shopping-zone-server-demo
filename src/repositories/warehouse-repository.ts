import _ from "lodash";
import { WarehouseModel } from "../models";
import { ReceiptProduct } from "../models/receipt-model";
import { BaseRepository } from "./base-repository";

export class WarehouseRepository extends BaseRepository {
  async updateQuantity(products: ReceiptProduct[]): Promise<any> {
    for await (var p of products) {
      WarehouseModel.findOneAndUpdate({
        "product": { _id: p.id },
        "color": p.color,
        "size": p.size,
        "quantity": { $gt: p.quantity }
      },
        { $inc: { "quantity": -p.quantity, "sold": p.quantity } },
        { new: true }, (err, product) => {
          console.log(err);
        });
    }
  }

  async checkEnoughQuantity(products: ReceiptProduct[]): Promise<any[]> {
    let notEnough: any[] = [];

    for await (var p of products) {
      const warehouseProduct = await WarehouseModel.findOne({
        "product": { _id: p.id },
        "color": p.color,
        "size": p.size,
      })

      if ((warehouseProduct?.quantity as number) < p.quantity) {
        notEnough.push({ id: p.id, name: p.name, quantityExist: warehouseProduct?.quantity, color: p.color, size: p.size });
      }
    }

    return notEnough;
  }

  async checkAreExists(products: ReceiptProduct[]): Promise<any[]> {
    let notExist: any[] = [];

    for await (var p of products) {
      const warehouseProduct = await WarehouseModel.find({
        "product": { _id: p.id },
        "color": p.color,
        "size": p.size,
      })

      if (_.isEmpty(warehouseProduct)) {
        notExist.push({ id: p.id, name: p.name, color: p.color, size: p.size });
      }
    }

    return notExist;
  }

  deleteWarehousesByProductID(productID: string): void {
    WarehouseModel.deleteMany({ product: productID });
  }

  async importProduct(product: any): Promise<any> {
    WarehouseModel.findOneAndUpdate({
      "product": { _id: product.id },
      "color": product.color,
      "size": product.size,
    },
      { $inc: { "quantity": product.quantity } },
      { upsert: true, new: true }, (err, product) => {
        console.log(err);
      });
  }
}
