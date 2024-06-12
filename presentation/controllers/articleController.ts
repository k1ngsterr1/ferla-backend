import AddArticle from "@core/use_cases/Article/AddArticle";
import DeleteArticle from "@core/use_cases/Article/DeleteArticle";
import GetArticles from "@core/use_cases/Article/GetArticles";
import UpdateArticle from "@core/use_cases/Article/UpdateArticle";
import { AddArticleRequest, DeleteArticleRequest, UpdateArticleRequest } from "@core/utils/Article/Request";
import { ErrorDetails } from "@core/utils/utils";
import { Request, Response } from "express";
class ArticleController{
    private addArticleUseCase: AddArticle;
    private getArticlesUseCase: GetArticles;
    private deleteArticleUseCase: DeleteArticle;
    private updateArticleUseCase: UpdateArticle;
    constructor(){
        this.addArticleUseCase = new AddArticle();
    }
    async addArticle(req: Request, res: Response): Promise<any>{
        const errors: ErrorDetails[] = [];
        try{
            const request: AddArticleRequest = {
                code: req.body.code,
                content: req.body.content
            }

            await this.addArticleUseCase.execute(request, errors);

            if(errors.length > 0){
                return res.status(errors[0].code).json({ message: errors[0].details });
            }

            res.status(201).json({ message: "Added article succesfully" });
        } catch(error){
            console.log(error);
            res.status(500).json({ message: "Error adding the article." });
        }
    }

    async getArticles(req: Request, res: Response): Promise<any>{
        const errors: ErrorDetails[] = [];
        try{
            const articles = await this.getArticlesUseCase.execute(errors);

            if(errors.length > 0){
                return res.status(errors[0].code).json({ message: errors[0].details });
            }

            res.status(200).json({ articles: articles });
        } catch(error){
            console.log(error);
            res.status(500).json({ message: "Error geting the article." });
        }
    }

    async deleteArticle(req: Request, res: Response): Promise<any>{
        const errors: ErrorDetails[] = [];
        try{
            const request: DeleteArticleRequest = {
                id: Number(req.params.id),
                code: req.body.code
            }

            await this.deleteArticleUseCase.execute(request, errors);

            if(errors.length > 0){
                return res.status(errors[0].code).json({ message: errors[0].details });
            }

            res.status(200).json({ message: "Deleted article succesfully" });
        } catch(error){
            console.log(error);
            res.status(500).json({ message: "Error deleting the article." });
        }
    }

    async updateArticle(req: Request, res: Response): Promise<any>{
        const errors: ErrorDetails[] = [];
        try{
            const request: UpdateArticleRequest = {
                id: Number(req.params.id),
                code: req.body.code,
                content: req.body.content
            }

            await this.updateArticleUseCase.execute(request, errors);

            if(errors.length > 0){
                return res.status(errors[0].code).json({ message: errors[0].details });
            }

            res.status(200).json({ message: "Updated article succesfully" });
        } catch(error){
            console.log(error);
            res.status(500).json({ message: "Error updateing the article." });
        }
    }
}