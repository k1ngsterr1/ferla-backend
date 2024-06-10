import { CartDetails } from "./types";

export interface AddCartRequest extends CartDetails{
    code: string;
}
export interface UpdateCartRequest extends CartDetails{
    id: number;
    code: string;
}

export interface DeleteCartRequest{
    id: number;
    code: string;
}