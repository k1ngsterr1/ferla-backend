import { CartDetails } from "./types";

export interface AddCartRequest extends CartDetails{
    code: string;
}