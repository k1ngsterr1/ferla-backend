import { IBlogCardRepository } from "@core/interfaces/repositories/IBlogCartRepository";
import { DeleteBlogRequest } from "@core/utils/BlogCard/Request";
import { ErrorDetails } from "@core/utils/utils";
import { BlogCardRepository } from "@infrastructure/repositories/cardRepository";
import fs from "fs";
import path from "path";
import { main } from "server";
const Code: string = process.env.WEBSITE_CODE;

export default class DeleteBlogCard {
  private blogCardRepository: IBlogCardRepository;
  constructor() {
    this.blogCardRepository = new BlogCardRepository();
  }

  async execute(request: DeleteBlogRequest, errors: ErrorDetails[]): Promise<void> {
    const { id, code } = request;

    if (code !== Code) {
      errors.push(new ErrorDetails(403, "The website code is incorrect"));
      return;
    }

    const blog = await this.blogCardRepository.deleteById(id, errors);

    const img_url = blog.image.split("/").pop();

    await fs.promises.unlink(path.join(main, "uploads", img_url))
      .catch((error) => {
        console.log(error);
        errors.push(new ErrorDetails(500, "Couldn't delete image"))
        return;
      });
  }
}
