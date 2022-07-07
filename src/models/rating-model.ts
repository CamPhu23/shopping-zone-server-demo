import { Schema, Types, model } from 'mongoose'
import { Client } from './client-model';
import { Product } from './product-model';
import _ from 'lodash'
import { Receipt } from './receipt-model';

interface Irating {
    rate: number;
    product: Types.ObjectId;
    receipt: Types.ObjectId;
}

interface RatingResponse {
    stars: number,
    totalRatings: number
}

export class Rating {
    id: string;
    rate: number;
    product: Product | null;
    receipt: Receipt | null;
    static fromData(data: any): Rating {
        const rating = new Rating();
        rating.id = data.id as string;
        rating.rate = data.rate;
        rating.product = data.product ? Product.fromData(data.product) : null;
        rating.receipt = data.receipt ? Receipt.fromData(data.receipt) : null;
        return rating;
    }

    static formatProductDetailRes(data: any): RatingResponse {
        let sum = data?.map((r: Rating) => r.rate)
            .reduce((a: number, b: number) => a + b, 0);
        const avg = (sum / data.length) || 0;

        return {
            stars: avg,
            totalRatings: data.length
        }
    }
}

const schema = new Schema<Irating>({
    rate: {
        type: Number,
        required: true
    },

    product: {
        type: Schema.Types.ObjectId,
        ref: "products",
        required: true
    },

    receipt: {
        type: Schema.Types.ObjectId,
        ref: "receipts",
        required: true
    }
})
export const RatingModel = model<Irating>("ratings", schema);