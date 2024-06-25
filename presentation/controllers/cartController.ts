import AddCart from "@core/use_cases/Cart/AddCart";
import DeleteCart from "@core/use_cases/Cart/DeleteCart";
import GetCarts from "@core/use_cases/Cart/GetCarts";
import UpdateCart from "@core/use_cases/Cart/UpdateCart";
import { AddCartRequest, DeleteCartRequest, UpdateCartRequest } from "@core/utils/Cart/Request";
import { ErrorDetails } from "@core/utils/utils";
import { Request, Response } from "express";

class CartController {
    private addCartUseCase: AddCart;
    private getCartsUseCase: GetCarts;
    private deleteCartUseCase: DeleteCart;
    private updateCartUseCase: UpdateCart;
    constructor(){
        this.addCartUseCase = new AddCart();
        this.getCartsUseCase = new GetCarts();
        this.deleteCartUseCase = new DeleteCart();
        this.updateCartUseCase = new UpdateCart();
    }
    async addCart(req: Request, res: Response): Promise<void>{
        const errors: ErrorDetails[] = [];
        try{
            console.log(req.body);
            const request: AddCartRequest = {
                code: req.body.code,
                name: req.body.name,
                description: req.body.description,
                img_url: req.body.image,
                price: req.body.price
            }

            await this.addCartUseCase.execute(request, errors);

            if(errors.length > 0){
                res.status(errors[0].code).json({ message: errors[0].details });
                return;
            }

            res.status(201).json({ message: "Cart added succesfully." });
        }catch(error){
            console.log(error);
            res.status(500).json({ message: "Error adding the cart." });
        }
    }

    async getCarts(req: Request, res: Response): Promise<void>{
        const errors: ErrorDetails[] = [];
        try{
            const carts = await this.getCartsUseCase.execute(errors);

            if(errors.length > 0){
                res.status(errors[0].code).json({ message: errors[0].details });
                return;
            }

            res.status(200).json({ carts: carts });
        }catch(error){
            console.log(error);
            res.status(500).json({ message: "Error getting carts." });
        }
    }

    async deleteCart(req: Request, res: Response): Promise<void>{
        const errors: ErrorDetails[] = [];
        try{
            const request: DeleteCartRequest = {
                id: Number(req.params.id),
                code: req.params.code
            }

            await this.deleteCartUseCase.execute(request, errors);

            if(errors.length > 0){
                res.status(errors[0].code).json({ message: errors[0].details });
                return;
            }

            res.status(200).json({ message: "Deleted cart successfully." });
        }catch(error){
            console.log(error);
            res.status(500).json({ message: "Error deleting the cart." });
        }
    }

    async updateCart(req: Request, res: Response): Promise<void>{
        const errors: ErrorDetails[] = [];
        try{
            const request: UpdateCartRequest = {
                id: Number(req.params.id),
                code: req.body.code,
                name: req.body.name,
                description: req.body.description,
                img_url: req.body.img_url,
                price: req.body.price
            }

            await this.updateCartUseCase.execute(request, errors);

            if(errors.length > 0){
                res.status(errors[0].code).json({ message: errors[0].details });
                return;
            }

            res.status(200).json({ message: "Updated cart successfully." });
        }catch(error){
            console.log(error);
            res.status(500).json({ message: "Error updating the cart." });
        }
    }
}

export default new CartController();