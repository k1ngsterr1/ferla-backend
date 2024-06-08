import { IComponentRepository } from "@core/interfaces/repositories/IComponentRepository";
import { ComponentDetails } from "@core/utils/Component/types";
import { ErrorDetails } from "@core/utils/utils";
import sequelize from "@infrastructure/config/sequelize";
import { Component } from "@infrastructure/models/componentModels";

export class ComponentRepository implements IComponentRepository{
    async create(componentDetails: ComponentDetails, errors: ErrorDetails[]): Promise<void | null>{
        try{
            await sequelize.getRepository(Component).create(componentDetails);
        } catch(error){
            console.log(error);
            errors.push(new ErrorDetails(500, "Error adding component to database"));
            return null;
        }
    }

    async findComponents(errors: ErrorDetails[]): Promise<Component[] | null>{
        try{
            const components = await sequelize.getRepository(Component).findAll();

            if(!components){
                errors.push(new ErrorDetails(404, "Components not found"));
                return null;
            }

            return components;
        } catch(error){
            console.log(error);
            errors.push(new ErrorDetails(500, "Error getting all components from database"));
            return null;
        }
    }

    async findComponentById(id: number, errors: ErrorDetails[]): Promise<Component | null> {
        try{
            const component = await sequelize.getRepository(Component).findByPk(id);

            if(!component){
                errors.push(new ErrorDetails(404, "Component not found"));
                return null;
            }

            return component;
        }catch(error){
            console.log(error);
            errors.push(new ErrorDetails(500, "Error getting component from database"));
            return null;
        }
    }

    async deleteById(id: number, errors: ErrorDetails[]): Promise<void | null> {
        try{
            const component = await sequelize.getRepository(Component).findByPk(id);

            if(!component){
                errors.push(new ErrorDetails(404, "Component not found"));
                return null;
            }

            await component.destroy();
        } catch(error){
            console.log(error);
            errors.push(new ErrorDetails(500, "Error deleting component from database"));
            return null;
        }
    }

}