import { IComponentRepository } from "@core/interfaces/repositories/IComponentRepository";
import { AddComponentRequest } from "@core/utils/Component/Request";
import { ComponentDetails } from "@core/utils/Component/types";
import { ErrorDetails } from "@core/utils/utils";
import { ComponentRepository } from "@infrastructure/repositories/componentRepository";
const Code: string = process.env.WEBSITE_CODE;

export class AddComponent {
    private componentRepository: IComponentRepository;
    constructor() {
        this.componentRepository = new ComponentRepository();
    }
    async execute(request: AddComponentRequest, errors: ErrorDetails[]): Promise<void>{
        if(request.code !== Code){
            errors.push(new ErrorDetails(403, "The website code is incorrect."));
            return;
        }

        const newComponent: ComponentDetails = {
            name: request.name,
            value: request.value,
        }

        await this.componentRepository.create(newComponent, errors);
    }
}