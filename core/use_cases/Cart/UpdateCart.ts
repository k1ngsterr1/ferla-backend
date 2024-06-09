import { ICartRepository } from "@core/interfaces/repositories/ICartRepository";
import { UpdateCartRequest } from "@core/utils/Cart/Request";
import { ErrorDetails } from "@core/utils/utils";
import { CartRepository } from "@infrastructure/repositories/cartRepository";
const Code: string = process.env.WEBSITE_CODE;

export default class DeleteCart{
    private cartRepository: ICartRepository;
    constructor(){
        this.cartRepository = new CartRepository();
    }
    async execute(request: UpdateCartRequest, errors: ErrorDetails[]): Promise<void>{
        if(isNaN(request.id)) {
            errors.push(new ErrorDetails(400, "Invalid id."));
            return;
        }

        if(request.code !== Code){
            errors.push(new ErrorDetails(403, "The website code is incorrect."));
            return;
        }

        const cart = await this.cartRepository.findById(request.id, errors);

        
    }
}