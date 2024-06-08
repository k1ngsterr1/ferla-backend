import AddCart from "@core/use_cases/Cart/AddCart";
import GetCarts from "@core/use_cases/Cart/GetCarts";
import { AddCartRequest } from "@core/utils/Cart/Request";
import { ErrorDetails } from "@core/utils/utils";
import { Request, Response } from "express";

class CartController {
    private addCartUseCase: AddCart;
    private getCartsUseCase: GetCarts;
    constructor(){
        this.addCartUseCase = new AddCart();
        this.getCartsUseCase = new GetCarts();
    }
    async addCart(req: Request, res: Response): Promise<void>{
        const errors: ErrorDetails[] = [];
        try{
            const request: AddCartRequest = {
                code: req.body.code,
                name: req.body.name,
                description: req.body.description,
                img_url: req.body.img_url,
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
            res.status(500).json({ message: "Error adding cart." });
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
}

export default new CartController();