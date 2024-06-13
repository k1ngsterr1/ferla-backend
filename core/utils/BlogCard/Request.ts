import { BlogCardAttributes, NewBlogCardInput } from "./types";

export interface AddBlogRequest extends NewBlogCardInput {
  code: string;
}
export interface UpdateBlogRequest extends BlogCardAttributes {
  id: string;
  code: string;
}

export interface DeleteBlogRequest {
  id: string;
  code: string;
}
