import { Product, ProductModel } from "../models";
import { BaseRepository } from "./base-repository";
import _ from "lodash";
import { userInfo } from "os";
import { ObjectId } from "mongoose";

export class ProductRepository extends BaseRepository {
  async getAllProduct(
    category: string[],
    color: string[],
    size: string[],
    feature: string[],
    search: string,
    p: number,
    s: number
  ): Promise<any> {
    let rawData;
    console.log(category);
    
    if (!_.isEmpty(search)) {
      
      rawData = await ProductModel.find({
        category: { $in: category },
        tags: { $in: feature },
        isDelete: false,
        name: {$regex : search}
      })
        .populate("images", "_id name url publicId")
        .populate({
          path: "warehouses",
          match: {
            size: { $in: size },
            color: { $in: color },
            $where: "this.quantity > this.sold",
          },
          select: "size color quantity sold",
        });
  
    } else {
      rawData = await ProductModel.find({
        category: { $in: category },
        tags: { $in: feature },
        isDelete: false,
      })
        .populate("images", "_id name url publicId")
        .populate({
          path: "warehouses",
          match: {
            size: { $in: size },
            color: { $in: color },
            $where: "this.quantity > this.sold",
          },
          select: "size color quantity sold",
        });
  
    }

    const data = rawData.filter((p: any): any => p.warehouses.length > 0);
    const productList = data.slice((p - 1) * s, p * s);

    return {
      products: super.parseData(productList, Product),
      total: data.length
    };
  }

  // Get 1 product from mongodb
  async getProduct(id: string): Promise<any>{
    let product = await ProductModel.findOne({ _id: id })
                                      .populate("images", "_id name url publicId")
                                      .populate("warehouses", "_id size color quantity sold")
                                      .populate({ path: "comments", 
                                                  select: "content name replyTo"})

                                      .populate({path:"ratings", select: "rate"});
    
    // // Merge customer questions and admin answers into one array
    // console.log(typeof product?.comments);
    // const cmt = JSON.stringify(product?.comments);
    // const ObjComment = JSON.parse(cmt);

    // console.log(ObjComment.length); //4

    // const e = [] //an array contains id of comment and replyTo of comment
    // let arrayOfIndex: Array<number[]> = []; 

    // for(let i = 0; i < ObjComment.length; i++){
    //   const element = Object.entries(ObjComment[i]);
    //   e.push([element[0][1], element[2][1]]); // [id of comment, replyTo of comment]
    // }

    // let i = 0;
    // while(i< e.length){
    //   for(let j = 1; j < e.length; j++){
    //     if(e[i][0] == e[j][1]){ // If id of this comment equals with replyTo of other comment
    //       // console.log(h, j)
    //       if(arrayOfIndex.includes([i, j]) == false){
    //         arrayOfIndex.push([i, j]);
    //       }
    //     }
    //   }
    //   i++
    // }
    // console.log(e);
    // console.log(arrayOfIndex);
    // let question: any;
    // let rep_question: any;

    // // let comm: Array<ObjectId> = []
    // let comm: Array<any> = [];

    // for(let i = 0; i < arrayOfIndex.length; i++){
    //   let index1= arrayOfIndex[i][0];
    //   let index2= arrayOfIndex[i][1];

    //   question = ObjComment[index1]; //Object.assign(question, ObjComment[index1]) //get question of client and assign it to question object
    //   rep_question = ObjComment[index2]; //Object.assign(rep_question, ObjComment[index2]) //get rep comment of admin and assign it to rep quession object
    //   comm.push({question, rep_question});
    // }

    // console.log(comm);

    return product? Product.fromData(product): null;
  }
}
