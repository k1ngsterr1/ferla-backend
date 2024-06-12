import { IArticleRepository } from "@core/interfaces/repositories/IArticleRepository";
import { UpdateArticleRequest } from "@core/utils/Article/Request";
import { ErrorDetails } from "@core/utils/utils";
import { ArticleRepository } from "@infrastructure/repositories/articleRepository";
const Code: string = process.env.WEBSITE_CODE;

export default class UpdateArticle{
    private articleRepository: IArticleRepository;
    constructor() {
        this.articleRepository = new ArticleRepository();
    }
    async execute(request: UpdateArticleRequest, errors: ErrorDetails[]): Promise<void>{
        if(isNaN(request.id)) {
            errors.push(new ErrorDetails(400, "Invalid id."));
            return;
        }

        if(request.code!== Code){
            errors.push(new ErrorDetails(403, "The website code is incorrect."));
            return;
        }

        const article = await this.articleRepository.findById(request.id, errors);
        
        article.content = request.content;
    }
}