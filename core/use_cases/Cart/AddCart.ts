import { ICartRepository } from "@core/interfaces/repositories/ICartRepository";
import { AddCartRequest } from "@core/utils/Cart/Request";
import { CartDetails } from "@core/utils/Cart/types";
import { ErrorDetails } from "@core/utils/utils";
import { CartRepository } from "@infrastructure/repositories/cartRepository";
const Code: string = process.env.WEBSITE_CODE;

export default class AddCart{
    private cartRepository: ICartRepository;
    constructor() {
        this.cartRepository = new CartRepository();
    }
    async execute(request: AddCartRequest, errors: ErrorDetails[]): Promise<void> {
        if(request.code !== Code){
            errors.push(new ErrorDetails(403, "The website code is incorrect."));
            return;
        }

        const newCart: CartDetails = {
            name: request.name,
            description: request.description,
            img_url: request.img_url,
            price: request.price,
        }

        await this.cartRepository.create(newCart, errors);
    }
}