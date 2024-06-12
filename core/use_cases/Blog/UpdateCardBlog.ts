import { IBlogCardRepository } from "@core/interfaces/repositories/IBlogCartRepository";
import { UpdateBlogRequest } from "@core/utils/BlogCard/Request";
import { ErrorDetails } from "@core/utils/utils";
import { BlogCardRepository } from "@infrastructure/repositories/cardRepository";
const Code: string = process.env.WEBSITE_CODE;

export default class UpdateCardBlog {
  private blogCardRepository: IBlogCardRepository;
  constructor() {
    this.blogCardRepository = new BlogCardRepository();
  }

  async execute(
    request: UpdateBlogRequest,
    errors: ErrorDetails[]
  ): Promise<void> {

    if (request.code !== Code) {
      errors.push(new ErrorDetails(403, "The website code is incorrect."));
      return;
    }

    const cardBlog = await this.blogCardRepository.findByPk(request.id, errors);
  }
}
