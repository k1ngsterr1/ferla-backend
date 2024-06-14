import { FormAttributes } from "@core/utils/Form/type";
import {
    Table,
    Column,
    Model,
    DataType,
    AutoIncrement,
    PrimaryKey,
} from "sequelize-typescript";

// Model for form
@Table({
    tableName: "form",
    timestamps: false
})
export class Form extends Model<FormAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @Column(DataType.STRING)
    name!: string;

    @Column(DataType.STRING)
    phoneNumber!: string;
    
    @Column(DataType.STRING)
    email!: string;

    @Column(DataType.STRING)
    date!: string;
}  