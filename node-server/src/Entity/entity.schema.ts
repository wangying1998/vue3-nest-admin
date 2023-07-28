/**
 * @author wangying
 * 实体模式:
 */
import { EntitySchema } from "typeorm"

export const CategoryEntity = new EntitySchema({
    name: "category",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        name: {
            type: String,
        },
    },
})