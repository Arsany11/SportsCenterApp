import { Product } from "./product";

export interface productData {
    content : Product[];
    pageable :{
        pageNumber: number;
        pageSize: number;

    };
    totalElements: number;
}
