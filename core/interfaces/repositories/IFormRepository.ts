import { FormDetails } from "@core/utils/Form/type";
import { ErrorDetails } from "@core/utils/utils";
import { Form } from "@infrastructure/models/formModel";

export interface IFormRepository{
    create(formDetails: FormDetails, errors: ErrorDetails[]): Promise<void | null>;
    deleteById(id: number, errors: ErrorDetails[]): Promise<void | null>;
    findForms(errors: ErrorDetails[]): Promise<Form[] | null>;
}