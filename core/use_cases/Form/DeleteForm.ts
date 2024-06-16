import { IFormRepository } from "@core/interfaces/repositories/IFormRepository";
import { DeleteFormRequest } from "@core/utils/Form/Request";
import { ErrorDetails } from "@core/utils/utils";
import { FormRepository } from "@infrastructure/repositories/formRepository";
const Code: string = process.env.WEBSITE_CODE;

export default class DeleteForm{
    private FormRepository: IFormRepository;
    constructor() {
        this.FormRepository = new FormRepository();
    }
    async execute(request: DeleteFormRequest, errors: ErrorDetails[]): Promise<void>{
        const { id, code } = request;

        if (isNaN(id)) {
            errors.push(new ErrorDetails(400, "Invalid id."));
            return;
        }

        if(code !== Code){
            errors.push(new ErrorDetails(403, "The website code is incorrect."));
            return;
        }

        await this.FormRepository.deleteById(id, errors);
    }
}