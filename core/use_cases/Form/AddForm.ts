import { IFormRepository } from "@core/interfaces/repositories/IFormRepository";
import { AddFormRequest } from "@core/utils/Form/Request";
import { FormDetails } from "@core/utils/Form/type";
import { ErrorDetails } from "@core/utils/utils";
import { validEmail } from "@core/utils/validator";
import { FormRepository } from "@infrastructure/repositories/formRepository";
const Code: string = process.env.WEBSITE_CODE;

export default class AddForm {
    private FormRepository: IFormRepository;
    constructor() {
        this.FormRepository = new FormRepository();
    }
    async execute(request: AddFormRequest, errors: ErrorDetails[]): Promise<void>{
        if(request.code !== Code){
            errors.push(new ErrorDetails(403, "The website code is incorrect."));
            return;
        }

        const isValidEmail = await validEmail(request.email);
        if(!isValidEmail){
            errors.push(new ErrorDetails(403, "The email is invalid."));
            return;
        }

        const newForm: FormDetails = {
            name: request.name,
            phoneNumber: request.phoneNumber,
            email: request.email,
            date: request.date
        }

        await this.FormRepository.create(newForm, errors);
    }
}