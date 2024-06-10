import { IComponentRepository } from "@core/interfaces/repositories/IComponentRepository";
import { UploadImageRequest } from "@core/utils/Component/Request";
import { ErrorDetails } from "@core/utils/utils";
import { ComponentRepository } from "@infrastructure/repositories/componentRepository";
import { base_url } from "server";
const Code: string = process.env.WEBSITE_CODE;

export class UploadImage{
    private componentRepository: IComponentRepository;
    constructor() {
        this.componentRepository = new ComponentRepository();
    }
    async execute(request: UploadImageRequest, errors: ErrorDetails[]): Promise<void>{
        console.log(request);
        if (isNaN(request.id)) {
            errors.push(new ErrorDetails(400, "Invalid id."));
            return;
        }

        if(request.code !== Code){
            errors.push(new ErrorDetails(403, "The website code is incorrect."));
            return;
        }

        const component = await this.componentRepository.findComponentById(request.id, errors);

        component.value = base_url+"/"+request.value;

        await component.save();
    } 
}