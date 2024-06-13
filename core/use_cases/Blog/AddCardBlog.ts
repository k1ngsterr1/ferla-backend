import { IBlogCardRepository } from "@core/interfaces/repositories/IBlogCartRepository";
import { AddBlogRequest } from "@core/utils/BlogCard/Request";
import { NewBlogCardInput } from "@core/utils/BlogCard/types";
import { ErrorDetails } from "@core/utils/utils";
import { BlogCard } from "@infrastructure/models/blogCardModel";
import { BlogCardRepository } from "@infrastructure/repositories/cardRepository";
import { base_url } from "server";
const Code: string = process.env.WEBSITE_CODE;

export class AddCardBlog {
  private blogRepository: IBlogCardRepository;
  constructor() {
    this.blogRepository = new BlogCardRepository();
  }

  async execute(
    request: AddBlogRequest,
    errors: ErrorDetails[]
  ): Promise<BlogCard> {
    const { image, title, href, code } = request;

    if (code !== Code) {
      errors.push(new ErrorDetails(403, "The website code is incorrect"));
      return;
    }

    const newBlog: NewBlogCardInput = {
      image: base_url+"/"+image,
      title: title,
      href: href,
    };

    const blog = await this.blogRepository.create(newBlog, errors);

    return blog;
  }
}
