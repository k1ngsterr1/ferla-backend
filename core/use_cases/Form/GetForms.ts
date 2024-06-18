import { IFormRepository } from "@core/interfaces/repositories/IFormRepository";
import { ErrorDetails } from "@core/utils/utils";
import { Form } from "@infrastructure/models/formModel";
import { FormRepository } from "@infrastructure/repositories/formRepository";
const Code: string = process.env.WEBSITE_CODE;

export default class GetForms {
  private FormRepository: IFormRepository;
  constructor() {
    this.FormRepository = new FormRepository();
  }
  async execute(code: string, errors: ErrorDetails[]): Promise<Form[]> {
    console.log(code, Code);

    if (code !== Code) {
      errors.push(new ErrorDetails(403, "The website code is incorrect."));
      return;
    }

    const Forms = await this.FormRepository.findForms(errors);

    return Forms;
  }
}
