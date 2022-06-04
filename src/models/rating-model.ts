import {Schema, Types, model} from 'mongoose'
import { Client } from './client-model';
import { Product } from './product-model';

interface Irating{
    rate: number;
    product: Types.ObjectId;
    client: Types.ObjectId;
}

export class Rating{
    id: string;
    rate: number;
    product: Product | null;
    client: Client | null;
    static fromData(data: any): Rating{
        const rating = new Rating();
        rating.id = data.id as string;
        rating.rate = data.rate;
        rating.product = data.product ? Product.fromData(data.product) : null;
        rating.client = data.client? Client.fromData(data.client) : null;
        return rating;
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

    client: {
        type: Schema.Types.ObjectId,
        ref: "clients",
        required: true
    }
})
export const RatingModel = model<Irating>("ratings", schema);