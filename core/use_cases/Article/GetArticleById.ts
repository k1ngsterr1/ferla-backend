import { IArticleRepository } from "@core/interfaces/repositories/IArticleRepository";
import { ErrorDetails } from "@core/utils/utils";
import { Article } from "@infrastructure/models/articleModel";
import { ArticleRepository } from "@infrastructure/repositories/articleRepository";

export default class GetArticleById {
  private articleRepository: IArticleRepository;
  constructor() {
    this.articleRepository = new ArticleRepository();
  }

  async execute(id: number | string, errors: ErrorDetails[]): Promise<Article> {
    const article = await this.articleRepository.findById(id, errors);

    return article;
  }
}
