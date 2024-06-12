import { IBlogCardRepository } from "@core/interfaces/repositories/IBlogCartRepository";
import { ErrorDetails } from "@core/utils/utils";
import { BlogCard } from "@infrastructure/models/blogCardModel";
import { BlogCardRepository } from "@infrastructure/repositories/cardRepository";

export default class GetCardsBlog {
  private blogCardRepository: IBlogCardRepository;
  constructor() {
    this.blogCardRepository = new BlogCardRepository();
  }

  async execute(errors: ErrorDetails[]): Promise<BlogCard[]> {
    const blogCards = await this.blogCardRepository.findBlogCards(errors);

    return blogCards;
  }
}
