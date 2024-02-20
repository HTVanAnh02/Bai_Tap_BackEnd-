import { Category, CategorySchema } from '@/database/schemas/category.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from '../controller/category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { CloudinaryService } from '@/common/cloudinary/cloudinary.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Category.name, schema: CategorySchema },
        ]),
    ],
    controllers: [CategoryController],
    providers: [CategoryService, CategoryRepository, CloudinaryService],
    exports: [CategoryRepository],
})
export class CategoryModule {}
