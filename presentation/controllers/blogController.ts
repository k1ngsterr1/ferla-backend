import { AddCardBlog } from "@core/use_cases/Blog/AddCardBlog";
import DeleteBlogCard from "@core/use_cases/Blog/DeleteCardBlog";
import GetCardsBlog from "@core/use_cases/Blog/GetCardsBlog";
import UpdateCardBlog from "@core/use_cases/Blog/UpdateCardBlog";
import {
  AddBlogRequest,
  DeleteBlogRequest,
  UpdateBlogRequest,
} from "@core/utils/BlogCard/Request";
import { NewBlogCardInput } from "@core/utils/BlogCard/types";
import { ErrorDetails } from "@core/utils/utils";
import { Request, Response } from "express";

class BlogCardController {
  private addBlogCard: AddCardBlog;
  private getBlogCard: GetCardsBlog;
  private deleteBlogCard: DeleteBlogCard;
  private updateBlogCard: UpdateCardBlog;
  constructor() {
    this.addBlogCard = new AddCardBlog();
    this.getBlogCard = new GetCardsBlog();
    this.deleteBlogCard = new DeleteBlogCard();
    this.updateBlogCard = new UpdateCardBlog();
  }

  async addCardBlog(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const request: AddBlogRequest = {
        image: req.body.image,
        title: req.body.title,
        href: req.body.href,
        code: req.body.code,
      };

      const blogCard = await this.addBlogCard.execute(request, errors);

      if (errors.length > 0) {
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return;
      }

      res.status(201).json({ message: "Успешно добавлено!", item: blogCard });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Произошла ошибка при добавлении карточки блога" });
    }
  }

  async getBlogCards(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const cards = await this.getBlogCard.execute(errors);

      if (errors.length > 0) {
        res.status(errors[0].code).json({ mesasge: errors[0].details });
        return;
      }

      res.status(200).json({ cards: cards });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error getting cards." });
    }
  }

  async updateBlogCards(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const request: UpdateBlogRequest = {
        id: req.params.id,
        image: req.body.image,
        code: req.body.code,
        title: req.body.title,
        href: req.body.href,
      };

      await this.updateBlogCard.execute(request, errors);

      if (errors.length > 0) {
        res.status(errors[0].code).json({ message: errors[0].details });
        return;
      }

      res.status(200).json({ message: "Updated blog card successfully." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating blog card" });
    }
  }

  async deleteCardBlog(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const request: DeleteBlogRequest = {
        id: req.params.id,
        code: req.body.code,
      };

      await this.deleteBlogCard.execute(request, errors);

      if (errors.length > 0) {
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return;
      }

      res.status(200).json({ message: "Deleted card successfully." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error deleting the blog card." });
    }
  }
}

export default new BlogCardController();
