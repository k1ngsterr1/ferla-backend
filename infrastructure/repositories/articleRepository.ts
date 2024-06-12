import { IArticleRepository } from "@core/interfaces/repositories/IArticleRepository";
import { ArticleDetails } from "@core/utils/Article/types";
import { ErrorDetails } from "@core/utils/utils";
import sequelize from "@infrastructure/config/sequelize";
import { Article } from "@infrastructure/models/articleModel";

export class ArticleRepository implements IArticleRepository{
    async create(articleDetails: ArticleDetails, errors: ErrorDetails[]): Promise<void | null>{
        try{
            await sequelize.getRepository(Article).create(articleDetails);
        } catch(error){
            console.log(error);
            errors.push(new ErrorDetails(500, "Error adding article to database"));
            return null;
        }
    }
    async findById(id: number, errors: ErrorDetails[]): Promise<Article>{
        try{
            const article = await sequelize.getRepository(Article).findByPk(id);

            if(!article){
                errors.push(new ErrorDetails(404, "Article not found"));
                return null;
            }

            return article;
        } catch(error){
            console.log(error);
            errors.push(new ErrorDetails(500, "Error getting article from database"));
            return null;
        }
    }

    async findArticles(errors: ErrorDetails[]): Promise<Article[]>{
        try{
            const articles = await sequelize.getRepository(Article).findAll();
            
            if(!articles){
                errors.push(new ErrorDetails(404, "Articles not found"));
                return null;
            }

            return articles;
        } catch(error){
            console.log(error);
            errors.push(new ErrorDetails(500, "Error getting articles from database"));
            return null;
        }
    }

    async deleteById(id: number, errors: ErrorDetails[]): Promise<void | null>{
        try{
            const article = await sequelize.getRepository(Article).findByPk(id);

            if(!article){
                errors.push(new ErrorDetails(404, "Article not found"));
                return null;
            }

            await article.destroy();
        }catch(error){
            console.log(error);
            errors.push(new ErrorDetails(500, "Error deleting article from database"));
            return null;
        }
    }
}