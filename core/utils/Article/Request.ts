import { ArticleDetails } from "./types";

export interface AddArticleRequest extends ArticleDetails{
    code: string;
}

export interface DeleteArticleRequest{
    id: number;
    code: string;
}

export interface UpdateArticleRequest extends ArticleDetails{
    id: number;
    code: string;
}