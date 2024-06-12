import { AddComponent } from "@core/use_cases/Component/AddComponent";
import DeleteComponent from "@core/use_cases/Component/DeleteComponent";
import GetComponents from "@core/use_cases/Component/GetComponents";
import UpdateComponent from "@core/use_cases/Component/UpdateComponent";
import { UploadImage } from "@core/use_cases/Component/UploadImage";
import {
  AddComponentRequest,
  DeleteComponentRequest,
  UpdateComponentRequest,
  UploadImageRequest,
} from "@core/utils/Component/Request";
import { ErrorDetails } from "@core/utils/utils";
import { Request, Response } from "express";
import path from "path";

class ComponentController {
  private addComponentUseCase: AddComponent;
  private getComponentsUseCase: GetComponents;
  private deleteComponentUseCase: DeleteComponent;
  private updateComponentUseCase: UpdateComponent;
  private uploadImageUseCase: UploadImage;

  constructor() {
    this.addComponentUseCase = new AddComponent();
    this.getComponentsUseCase = new GetComponents();
    this.deleteComponentUseCase = new DeleteComponent();
    this.updateComponentUseCase = new UpdateComponent();
    this.uploadImageUseCase = new UploadImage();
  }
  async addComponent(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const request: AddComponentRequest = {
        code: req.body.code,
        name: req.body.name,
        value: req.body.value,
      };

      await this.addComponentUseCase.execute(request, errors);

      if (errors.length > 0) {
        res.status(errors[0].code).json({ message: errors[0].details });
        return;
      }

      res.status(201).json({ message: "Component added successfully." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error adding the component." });
    }
  }

  async getComponents(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const components = await this.getComponentsUseCase.execute(errors);

      res.status(200).json({ components: components });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error getting components." });
    }
  }

  async deleteComponent(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const request: DeleteComponentRequest = {
        id: Number(req.params.id),
        code: req.body.code,
      };

      await this.deleteComponentUseCase.execute(request, errors);

      if (errors.length > 0) {
        res.status(errors[0].code).json({ message: errors[0].details });
        return;
      }

      res.status(200).json({ message: "Component deleted successfully." });
    } catch (error) {
      res.status(500).json({ message: "Error deleting the component." });
    }
  }

  async updateComponent(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const request: UpdateComponentRequest = {
        id: Number(req.params.id),
        code: req.body.code,
        name: req.body.name,
        value: req.body.value,
      };

      await this.updateComponentUseCase.execute(request, errors);

      if (errors.length > 0) {
        res.status(errors[0].code).json({ message: errors[0].details });
        return;
      }

      res.status(200).json({ message: "Component updated successfully." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating the component." });
    }
  }

  async uploadImage(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const request: UploadImageRequest = {
        id: Number(req.params.id),
        code: req.body.code,
        value: req.body.image,
      };

      await this.uploadImageUseCase.execute(request, errors);

      if (errors.length > 0) {
        res.status(errors[0].code).json({ message: errors[0].details });
        return;
      }

      res.status(200).json({ message: "Сайт успешно обновлен" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Ошибка при обновлении сайта" });
    }
  }
}

export default new ComponentController();
