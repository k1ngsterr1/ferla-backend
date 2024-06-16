import { IFormRepository } from "@core/interfaces/repositories/IFormRepository";
import { FormDetails } from "@core/utils/Form/type";
import { ErrorDetails } from "@core/utils/utils";
import sequelize from "@infrastructure/config/sequelize";
import { Form } from "@infrastructure/models/formModel";

export class FormRepository implements IFormRepository{
    async create(formDetails: FormDetails, errors: ErrorDetails[]): Promise<void | null>{
        try{
            await sequelize.getRepository(Form).create(formDetails);
        } catch(error){
            console.log(error);
            errors.push(new ErrorDetails(500, "Error adding form to database"));
            return null;
        }
    }

    async findForms(errors: ErrorDetails[]): Promise<Form[] | null>{
        try{
            const forms = await sequelize.getRepository(Form).findAll();

            if(!forms){
                errors.push(new ErrorDetails(404, "Forms not found"));
                return null;
            }

            return forms;
        } catch(error){
            console.log(error);
            errors.push(new ErrorDetails(500, "Error finding forms"));
            return null;
        }
    }

    async deleteById(id: number, errors: ErrorDetails[]): Promise<void> {
        try{
            const form = await sequelize.getRepository(Form).findByPk(id);

            if (!form) {
                errors.push(new ErrorDetails(404, "form not found"));
                return null;
            }

            await form.destroy();
        } catch(error){
            console.log(error);
            errors.push(new ErrorDetails(500, "Error deleting form from database"));
            return null;
        }
    }
}