import { ICartRepository } from "@core/interfaces/repositories/ICartRepository";
import { CartDetails } from "@core/utils/Cart/types";
import { ErrorDetails } from "@core/utils/utils";
import sequelize from "@infrastructure/config/sequelize";
import { Cart } from "@infrastructure/models/cartModel";

export class CartRepository implements ICartRepository{
    async create(cartDetails: CartDetails, errors: ErrorDetails[]): Promise<void | null>{
        try{
            await sequelize.getRepository(Cart).create(cartDetails);
        } catch(error){
            console.log(error);
            errors.push(new ErrorDetails(500, "Error adding cart to database"));
            return null;
        }
    }

    async findCarts(errors: ErrorDetails[]): Promise<Cart[] | null>{
        try{
            const carts = await sequelize.getRepository(Cart).findAll();

            if(!carts){
                errors.push(new ErrorDetails(404, "Carts not found."));
                return null;
            }

            return carts;
        } catch(error){
            console.log(error);
            errors.push(new ErrorDetails(500, "Error getting all carts from database"));
            return null;
        }
    }

    async findById(id: number, errors: ErrorDetails[]): Promise<Cart | null>{
        try{
            const cart = await sequelize.getRepository(Cart).findByPk(id);

            if(!cart){
                errors.push(new ErrorDetails(404, "Cart not found"));
                return null;
            }

            return cart;
        }catch(error){
            console.log(error);
            errors.push(new ErrorDetails(500, "Error getting cart from database"));
            return null;
        }
    }

    async deleteById(id: number, errors: ErrorDetails[]): Promise<void | null> {
        try{
            const cart = await sequelize.getRepository(Cart).findByPk(id);

            if(!cart){
                errors.push(new ErrorDetails(404, "Cart not found"));
                return null;
            }

            await cart.destroy();
        } catch(error){
            console.log(error);
            errors.push(new ErrorDetails(500, "Error deleting component from database"));
            return null;
        }
    }

}