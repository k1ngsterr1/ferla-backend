import AddForm from "@core/use_cases/Form/AddForm";
import DeleteForm from "@core/use_cases/Form/DeleteForm";
import GetForms from "@core/use_cases/Form/GetForms";
import { AddFormRequest, DeleteFormRequest } from "@core/utils/Form/Request";
import { ErrorDetails } from "@core/utils/utils";
import { Request, Response } from "express";

class FormController {
  private addFormUseCase: AddForm;
  private getFormsUseCase: GetForms;
  private deleteFormUseCase: DeleteForm;
  constructor() {
    this.addFormUseCase = new AddForm();
    this.getFormsUseCase = new GetForms();
    this.deleteFormUseCase = new DeleteForm();
  }
  async addForm(req: Request, res: Response): Promise<any> {
    const errors: ErrorDetails[] = [];
    try {
      const request: AddFormRequest = {
        code: req.body.code,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        date: req.body.date,
      };

      await this.addFormUseCase.execute(request, errors);

      if (errors.length > 0) {
        return res.status(errors[0].code).json({ message: errors[0].details });
      }

      res.status(201).json({ message: "Added form succesfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error adding the form." });
    }
  }

  async getForms(req: Request, res: Response): Promise<any> {
    const errors: ErrorDetails[] = [];
    try {
      const code: string = req.params.code;

      const forms = await this.getFormsUseCase.execute(code, errors);

      if (errors.length > 0) {
        return res.status(errors[0].code).json({ message: errors[0].details });
      }

      res.status(200).json({ forms: forms });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error geting the Form." });
    }
  }

  async deleteForm(req: Request, res: Response): Promise<any> {
    const errors: ErrorDetails[] = [];
    try {
      const request: DeleteFormRequest = {
        id: Number(req.params.id),
        code: req.params.code,
      };

      await this.deleteFormUseCase.execute(request, errors);

      if (errors.length > 0) {
        return res.status(errors[0].code).json({ message: errors[0].details });
      }

      res.status(200).json({ message: "Deleted form succesfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error deleting the form." });
    }
  }
}

export default new FormController();
