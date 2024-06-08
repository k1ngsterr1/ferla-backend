import { CartAttributes } from "@core/utils/Cart/types";
import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    AutoIncrement,
    PrimaryKey,
} from "sequelize-typescript";

// Model for carts
@Table({
    tableName: "carts",
})
export class Cart extends Model<CartAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @Column(DataType.STRING)
    name!: string;

    @Column(DataType.STRING)
    description!: string;

    @Column(DataType.STRING)
    img_url!: string;

    @Column(DataType.INTEGER)
    price!: number;

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;
}  