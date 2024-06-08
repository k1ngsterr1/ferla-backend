import { ComponentDetails } from "@core/utils/Component/types";
import { ErrorDetails } from "@core/utils/utils";
import { Component } from "@infrastructure/models/componentModels";

export interface IComponentRepository {
    create(componentDetails: ComponentDetails, errors: ErrorDetails[]): Promise<void | null>;
    findComponents(errors: ErrorDetails[]): Promise<Component[] | null>;
    findComponentById(id: number, errors: ErrorDetails[]): Promise<Component | null>
    deleteById(id: number, error: ErrorDetails[]): Promise<void>;
}