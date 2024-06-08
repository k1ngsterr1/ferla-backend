import { IComponentRepository } from "@core/interfaces/repositories/IComponentRepository";
import { UpdateComponentRequest } from "@core/utils/Component/Request";
import { ErrorDetails } from "@core/utils/utils";
import { ComponentRepository } from "@infrastructure/repositories/componentRepository";
const Code: string = process.env.WEBSITE_CODE;

export default class UpdateComponent{
    private componentRepository: IComponentRepository;
    constructor() {
        this.componentRepository = new ComponentRepository();
    }
    async execute(request: UpdateComponentRequest, errors: ErrorDetails[]): Promise<void>{
        if (isNaN(request.id)) {
            errors.push(new ErrorDetails(400, "Invalid id."));
            return;
        }

        if(request.code !== Code){
            errors.push(new ErrorDetails(403, "The website code is incorrect."));
            return;
        }

        const component = await this.componentRepository.findComponentById(request.id, errors);

        if(request.name !== undefined){
            component.name = request.name;
        }
        if(request.value !== undefined){
            component.value = request.value;
        }

        await component.save();
    }
}