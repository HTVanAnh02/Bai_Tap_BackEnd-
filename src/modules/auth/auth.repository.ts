import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../common/base/base.repository';
import { User, UserDocument } from '../../database/schemas/user.schema';

@Injectable()
export class AuthRepository extends BaseRepository<User> {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,
    ) {
        super(userModel);
    }
    async createUser(email: string, password: string): Promise<User> {
        const user = new User();
        user.email = email;
        user.password = password;

        // Log để kiểm tra
        // console.log('Creating user:', user);

        return await this.userModel.create(user);
    }
}
