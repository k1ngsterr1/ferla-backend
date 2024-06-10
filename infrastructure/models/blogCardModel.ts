import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  Unique,
  Default,
} from "sequelize-typescript";

import { v4 as uuidv4 } from "uuid";
import { BlogCardAttributes } from "@core/utils/Cart/BlogCard";

// Модель карточки блога со всеми аттрибутами
@Table({
  tableName: "blogCard",
})
export class BlogCard extends Model<BlogCardAttributes> {
  @PrimaryKey
  @Default(uuidv4)
  @Unique
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id?: string;

  @Column(DataType.STRING)
  image!: string;

  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.STRING)
  href!: string;

  @CreatedAt
  createdAt?: Date;

  @UpdatedAt
  updatedAt?: Date;
}
