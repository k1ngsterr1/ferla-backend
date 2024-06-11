import { ArticleAttributes } from "@core/utils/Article/types";
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

// Model for Articles
@Table({
    tableName: "articles",
})
export class Articles extends Model<ArticleAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @Column(DataType.STRING)
    content!: string;

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;
}  