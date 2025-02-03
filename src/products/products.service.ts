import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/product.schema';
import { Model, Types } from 'mongoose';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private ProductModel: Model<Product>){}

    async addProduct(createProductDto: CreateProductDto) {
        return this.ProductModel.create(createProductDto)
    }

    async updateProduct(updateProductDto: UpdateProductDto, productId: string) {
        if (!Types.ObjectId.isValid(productId)) {
            throw new BadRequestException("Invalid ID");
        }
        
        const updateProduct = await this.ProductModel.findOneAndUpdate(
            { _id: productId },
            updateProductDto,
            { new: true }
        );
        return updateProduct;
    }

    async deleteProduct(productId: string) {
        if (!Types.ObjectId.isValid(productId)) {
            throw new BadRequestException("Invalid ID");
        }
        
        const updateProduct = await this.ProductModel.findOneAndDelete(
            { _id: productId }
        );
        return updateProduct;
    }
    async getAllProducts() {
        return this.ProductModel.find()
    }  
}