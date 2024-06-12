import { BlogCardAttributes } from "./types";

export interface AddBlogRequest extends BlogCardAttributes {
  code: string;
}
export interface UpdateBlogRequest extends BlogCardAttributes {
  id: number;
  code: string;
}

export interface DeleteBlogRequest {
  id: number;
  code: string;
}
