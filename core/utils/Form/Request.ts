import { FormDetails } from "./type";

export interface AddFormRequest extends FormDetails{
    code: string;
}

export interface DeleteFormRequest{
    id: number;
    code: string;
}