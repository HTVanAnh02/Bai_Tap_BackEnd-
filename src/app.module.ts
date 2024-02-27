import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auht.module';
import { seedService } from './seed/seed.service';
import { ProductModule } from './modules/prouduct/product.module';
import { I18nModule } from './i18n/i18n.module';
import { ConfigModule } from '@nestjs/config';
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        ProductModule,
        UserModule,
        AuthModule,
        I18nModule,
        MongooseModule.forRoot(
            'mongodb+srv://vanh:trieu2972002@cluster0.aycyzga.mongodb.net/',
        ),
    ],
    controllers: [AppController],
    providers: [AppService, seedService],
})
export class AppModule implements OnModuleInit {
    constructor(private readonly seederService: seedService) {}

    async onModuleInit() {
        await this.seederService.seedData();
    }
}
