import { ICartRepository } from "@core/interfaces/repositories/ICartRepository";
import { ErrorDetails } from "@core/utils/utils";
import { Cart } from "@infrastructure/models/cartModel";
import { CartRepository } from "@infrastructure/repositories/cartRepository";

export default class GetCarts{
    private cartRepository: ICartRepository;
    constructor(){
        this.cartRepository =  new CartRepository();
    }
    async execute(errors: ErrorDetails[]): Promise<Cart[]>{
        const carts = await this.cartRepository.findCarts(errors);

        return carts;
    }
}