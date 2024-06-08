import { ComponentDetails } from "./types";

export interface AddComponentRequest extends ComponentDetails {
    code: string;
}
export interface UpdateComponentRequest extends ComponentDetails {
    id: number;
    code: string;
}
export type DeleteComponentRequest = {
    id: number;
    code: string;
}