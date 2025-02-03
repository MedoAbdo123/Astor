import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Product {
    @Prop()
    title: string

    @Prop()
    body: string

    @Prop({required: true})
    image: string

    @Prop()
    stars: number

    @Prop({required: true})
    price: number
}

export const ProductSchema = SchemaFactory.createForClass(Product)    