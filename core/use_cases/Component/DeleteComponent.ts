import { IComponentRepository } from "@core/interfaces/repositories/IComponentRepository";
import { DeleteComponentRequest } from "@core/utils/Component/Request";
import { ErrorDetails } from "@core/utils/utils";
import { ComponentRepository } from "@infrastructure/repositories/componentRepository";
const Code: string = process.env.WEBSITE_CODE;

export default class DeleteComponent{
    private componentRepository: IComponentRepository;
    constructor() {
        this.componentRepository = new ComponentRepository();
    }
    async execute(request: DeleteComponentRequest, errors: ErrorDetails[]): Promise<void>{
        const { id, code } = request;

        if (isNaN(id)) {
            errors.push(new ErrorDetails(400, "Invalid id."));
            return;
        }

        if(code !== Code){
            errors.push(new ErrorDetails(403, "The website code is incorrect."));
            return;
        }

        await this.componentRepository.deleteById(id, errors);
    }
}