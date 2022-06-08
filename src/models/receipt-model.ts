import { model, Schema, Types } from "mongoose";

interface IReceipt {
  fullname: string;
  phone: string;
  email: string;
  address: string;
  paymentMethod: string;
  cardNumber: string | null;
  cardEnddate: Date | null;
  cardCVV: string | null;
  products: Types.ObjectId[];
  totalPay: number;
  shippingCost: number;
  totalDiscount: number;
  totalBill: number;
  account: Types.ObjectId;
}

export class ReceiptProduct {
  id: string;
  name: string;
  price: number;
  discountPrice: number;
  color: string;
  size: string;
  quantity: number;

  static fromData(data: any): ReceiptProduct {
    const product = new ReceiptProduct();

    product.id = data.id as string;
    product.id = data.name;
    product.price = data.price;
    product.discountPrice = data.discountPrice;
    product.color = data.color;
    product.size = data.size;
    product.quantity = data.quantity;

    return product;
  }
}

export class Receipt {
  id: string;
  fullname: string;
  phone: string;
  email: string;
  address: string;
  paymentMethod: string;
  cardNumber: string;
  cardEnddate: string;
  cardCVV: string;
  products: Types.ObjectId[];
  totalPay: number;
  shippingCost: number;
  totalDiscount: number;
  totalBill: number;
  account: Types.ObjectId;

  static fromData(data: any): Receipt {
    const receipt = new Receipt();

    receipt.id = data.id as string;
    receipt.fullname = data.fullname;
    receipt.phone = data.phone;
    receipt.email = data.email;
    receipt.address = data.address;
    receipt.paymentMethod = data.paymentMethod;
    receipt.cardNumber = data.cardNumber;
    receipt.cardEnddate = data.cardEnddate;
    receipt.cardCVV = data.cardCVV;
    receipt.totalPay = data.totalPay;
    receipt.shippingCost = data.shippingCost;
    receipt.totalDiscount = data.totalDiscount;
    receipt.totalBill = data.totalBill;

    receipt.products = data.products.map((image: any): ReceiptProduct => {
      return ReceiptProduct.fromData(image);
    });

    return receipt;
  }
}

const schema = new Schema<IReceipt>({
  fullname: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  paymentMethod: {
    type: String,
    required: true,
  },

  cardNumber: {
    type: String,
    required: false,
  },

  cardEnddate: {
    type: Date,
    required: false,
  },

  cardCVV: {
    type: String,
    required: false,
  },

  products: [
    {
      type: Object,
      required: false,
    },
  ],

  totalPay: {
    type: Number,
    required: true,
  },

  shippingCost: {
    type: Number,
    required: true,
  },

  totalDiscount: {
    type: Number,
    required: true,
  },

  totalBill: {
    type: Number,
    required: true,
  },

  account: {
    type: Schema.Types.ObjectId,
    ref: "client",
    required: true
  }
});

export const ReceiptModel = model<IReceipt>("receipts", schema);