import { CartDetails } from "@core/utils/Cart/types";
import { ErrorDetails } from "@core/utils/utils";
import { Cart } from "@infrastructure/models/cartModel";

export interface ICartRepository {
    create(cartDetails: CartDetails, errors: ErrorDetails[]): Promise<void | null>;
    findCarts(errors: ErrorDetails[]): Promise<Cart[] | null>;
    findCartById(id: number, errors: ErrorDetails[]): Promise<Cart | null>;
    deleteById(id: number, error: ErrorDetails[]): Promise<void | null>;
}