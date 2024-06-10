import { IComponentRepository } from "@core/interfaces/repositories/IComponentRepository";
import { ErrorDetails } from "@core/utils/utils";
import { Component } from "@infrastructure/models/componentModels";
import { ComponentRepository } from "@infrastructure/repositories/componentRepository";

export default class GetComponents {
    private componentRepository: IComponentRepository;
    constructor() {
        this.componentRepository = new ComponentRepository();
    }
    async execute(errors: ErrorDetails[]): Promise<Component[]> {
        const components = await this.componentRepository.findComponents(errors);
        return components;
    }
}