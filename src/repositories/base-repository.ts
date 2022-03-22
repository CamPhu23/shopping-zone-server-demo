import { BaseModel } from "../models";

export class BaseRepository {
  protected parseData<T>(data: any, type: BaseModel): T[] {
    const result: T[] = [];
    if (data.length > 0) {
      data.forEach((row: any) => {
        if (type) {
          result.push(type.fromData(row));
        }
      });
    }

    return result;
  }
}