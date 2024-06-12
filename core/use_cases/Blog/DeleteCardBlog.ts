import { IBlogCardRepository } from "@core/interfaces/repositories/IBlogCartRepository";
import { DeleteBlogRequest } from "@core/utils/BlogCard/Request";
import { ErrorDetails } from "@core/utils/utils";
import { BlogCardRepository } from "@infrastructure/repositories/cardRepository";
const Code: string = process.env.WEBSITE_CODE;

export default class DeleteBlogCard {
  private blogCardRepository: IBlogCardRepository;
  constructor() {
    this.blogCardRepository = new BlogCardRepository();
  }

  async execute(request: DeleteBlogRequest, errors: ErrorDetails[]) {
    const { id, code } = request;

    if (isNaN(id)) {
      errors.push(new ErrorDetails(400, "Invalid id."));
    }

    if (code !== Code) {
      errors.push(new ErrorDetails(403, "The website code is incorrect"));
    }

    await this.blogCardRepository.deleteById(id, errors);
  }
}
