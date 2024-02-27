import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../../database/schemas/product.schema';
import { CloudinaryService } from '../../common/cloudinary/cloudinary.service';
import { JwtService } from '@nestjs/jwt';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { ProductRepository } from './product.repository';
import { I18nModule } from '../../i18n/i18n.module';
import { UserService } from '../user/services/user.service';
import { UserRepository } from '../user/user.repository';
import { User, UserSchema } from '../../database/schemas/user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema },
            { name: User.name, schema: UserSchema },
        ]),

        I18nModule,
    ],
    controllers: [ProductController],
    providers: [
        UserService,
        ProductService,
        ProductRepository,
        CloudinaryService,
        JwtService,
        UserRepository,
    ],
})
export class ProductModule {}
